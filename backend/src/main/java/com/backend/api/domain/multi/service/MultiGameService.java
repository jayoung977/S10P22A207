package com.backend.api.domain.multi.service;

import com.backend.api.domain.member.entity.Member;
import com.backend.api.domain.member.repository.MemberRepository;
import com.backend.api.domain.member.repository.MultiGamePlayerRepository;
import com.backend.api.domain.multi.dto.MultiGameRoomCreateResponseDto;
import com.backend.api.domain.multi.dto.MultiGameRoomsResponseDto;
import com.backend.api.domain.multi.dto.MultiGameStartRequestDto;
import com.backend.api.domain.multi.dto.MultiGameStartResponseDto;
import com.backend.api.domain.multi.dto.MultiNextDayRequestDto;
import com.backend.api.domain.multi.dto.MultiNextDayResponseDto;
import com.backend.api.domain.multi.dto.MultiTradeRequestDto;
import com.backend.api.domain.multi.dto.MultiTradeResponseDto;
import com.backend.api.domain.multi.entity.MultiGame;
import com.backend.api.domain.multi.entity.MultiGameLog;
import com.backend.api.domain.multi.entity.MultiGamePlayer;
import com.backend.api.domain.multi.repository.MultiGameLogRepository;
import com.backend.api.domain.stock.entity.StockChart;
import com.backend.api.domain.stock.repository.StockChartRepository;
import com.backend.api.global.common.code.ErrorCode;
import com.backend.api.global.exception.BaseExceptionHandler;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.Set;
import java.util.TreeSet;
import java.util.concurrent.ThreadLocalRandom;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Slf4j
@Transactional
@RequiredArgsConstructor
public class MultiGameService {

    private final MultiGamePlayerRepository multiGamePlayerRepository;

    private final MultiGameLogRepository multiGameLogRepository;

    private final RedisTemplate<String, Object> redisTemplate;
    private final StockChartRepository stockChartRepository;
    private final MemberRepository memberRepository;
    private final ObjectMapper objectMapper;

    /*
     * 멀티게임 key : multiGame:방번호(소켓):참가자Id:라운드번호
     */
    public List<MultiGameRoomsResponseDto> getMultiGameRooms(int pageNumber, int pageSize) {
        Set<String> multiGameRooms = redisTemplate.keys("multiGame:*");
        if (multiGameRooms == null) {
            return List.of();
        }

        // 방 번호를 기준으로 정렬
        TreeSet<String> sortedRooms = new TreeSet<>(multiGameRooms);

        // 방번호와 게임번호를 기준으로 그룹화
        Map<String, List<Long>> roomGroups = new HashMap<>();
        for (String key : sortedRooms) {
            String[] parts = key.split(":");
            if (parts.length == 4) {
                String roomNumber = parts[1];
                String participantId = parts[2];
                String roundNumber = parts[3];
                String groupKey = roomNumber + ":" + roundNumber;
                roomGroups.computeIfAbsent(groupKey, k -> new ArrayList<>()).add(Long.valueOf(participantId));
            }
        }

        // MultiGameRoomsResponseDto 객체로 변환하여 리스트에 추가
        List<MultiGameRoomsResponseDto> resultList = new ArrayList<>();
        for (Map.Entry<String, List<Long>> entry : roomGroups.entrySet()) {
            String[] parts = entry.getKey().split(":");
            if (parts.length == 2) {
                Long roomNumber = Long.valueOf(parts[0]);
                Integer roundNumber = Integer.valueOf(parts[1]);
                List<Long> participantsIds = entry.getValue();
                resultList.add(new MultiGameRoomsResponseDto(roomNumber, roundNumber, participantsIds));
            }
        }
        // 페이징
        int fromIndex = (pageNumber - 1) * pageSize;
        int toIndex = Math.min(fromIndex + pageSize, resultList.size());
        return resultList.subList(fromIndex, toIndex);
    }

    public void enterMultiGameRoom(Long memberId, String roomId) {
        // TODO: 구독 하게 해야함.
        // TODO: game round 수가 0이 아니라면 못들어가게 해야함
        // 웹소켓에 연결시키는 과정
//        redisTemplate.opsForValue().set("multiGame:" + memberId + ":" + roomId + ":0", );

        // 플레이어를 게임 방의 구독자로 추가
        String channel = "multiGameRoom:" + roomId;
        redisTemplate.opsForSet().add(channel, memberId.toString());
    }

    public MultiGameRoomCreateResponseDto createMultiGameRoom(Long memberId) {

        Long multiGameId = redisTemplate.opsForValue().increment("multiGameId", 1); // Redis에서 Atomic한 증가
        if (multiGameId == null || multiGameId == 1) {
            multiGameId = 1L; // 초기값 설정
            redisTemplate.opsForValue().set("multiGameId", multiGameId);
        }
        String key = "multiGame:" + multiGameId + ":" + memberId + ":0"; // Redis에 저장할 키
        redisTemplate.opsForValue().set(key, null); // TODO : 이렇게 해도 되나?
        return new MultiGameRoomCreateResponseDto(multiGameId);
    }

    public MultiGameStartResponseDto startMultiGame(
        Long memberId, MultiGameStartRequestDto dto) {

        LocalDateTime lastDate = LocalDateTime.of(2024, 3, 10, 0, 0); // 위험할수도
        LocalDateTime startDate = LocalDateTime.of(1996, 5, 10, 0, 0);

        LocalDateTime randomDateTime = generateRandomDateTime(startDate, lastDate); // 이 날짜로 조회

        Long firstDayStockChartId = null;
        Long stockId = null;
        while (stockId == null) {
            List<String> stockIds = stockChartRepository.findDistinctStockCodeByDateBetween(randomDateTime, randomDateTime.plusDays(1));
            if (stockIds.isEmpty()) {
                log.info("해당하는 날짜의 데이터가 없음.{}", randomDateTime);
                randomDateTime = randomDateTime.plusDays(1);
                continue;
            }
            Collections.shuffle(stockIds); // 리스트를 섞음

            // randomStocks 리스트에서 처음 50개의 요소 검토
            List<String> selectedStocks = stockIds.subList(0, Math.min(stockIds.size(), 50));   // 이거 넘기자
            List<StockChart> randomStockCharts = stockChartRepository.findRandomStocksInRange(randomDateTime, randomDateTime.plusDays(1), selectedStocks);

            for (StockChart stockChart : randomStockCharts) {
                // 350일 뒤의 stockChart와 다른 주식이면 pass
                StockChart stockChart350 = stockChartRepository.findById(stockChart.getId() + 349)
                    .orElseThrow(() -> new BaseExceptionHandler(ErrorCode.NO_SINGLE_GAME_STOCK));

                if (!Objects.equals(stockChart.getStock().getId(), stockChart350.getStock().getId())) {
                    randomDateTime = randomDateTime.minusDays(50);
                    break;
                }

                // 350일간의 차트가 있으면 추가.
                stockId = stockChart.getStock().getId();
                firstDayStockChartId = stockChart.getId();
                break;
            }
        }

        Long gameLogId = null;
        MultiGameLog multiGameLog
            = MultiGameLog.builder()
            .stockId(stockId)
            .startDate(randomDateTime)
            .build();

        gameLogId = multiGameLogRepository.save(multiGameLog).getId();

        for (Long playerId : dto.playerIds()) {
            Member member = memberRepository.findById(playerId).orElseThrow(() -> new BaseExceptionHandler(ErrorCode.NOT_FOUND_USER));
            MultiGamePlayer multiGamePlayer = MultiGamePlayer.builder()
                .multiGameLog(multiGameLog)
                .member(member)
                .build();
            multiGamePlayerRepository.save(multiGamePlayer);
        }

        // 각 플레이어의 게임 정보를 Redis에 저장.
        for (Long playerId : dto.playerIds()) {
            MultiGame multiGame = MultiGame.builder()
                .multiGameLogId(gameLogId)
                .memberId(playerId)
                .firstDayStockChartId(firstDayStockChartId)
                .cash(1_000_000_0L)
                .initial(1_000_000_0L)
                .day(1)
                .round(1)
                .build();

            Long multiGameId = null;
            multiGameId = redisTemplate.opsForValue().increment("multiGameId", 1); // Redis에서 Atomic한 증가
            if (multiGameId == null || multiGameId == 1) {
                multiGameId = 1L; // 초기값 설정
                redisTemplate.opsForValue().set("multiGameId", multiGameId); // Redis에 첫 번째 id 설정
            }
            String key = "multiGame:" + playerId + ":" + multiGameId; // Redis에 저장할 키
            redisTemplate.opsForValue().set(key, multiGame);
        }
        return new MultiGameStartResponseDto();
    }


    public static LocalDateTime generateRandomDateTime(LocalDateTime start, LocalDateTime end) {
        long startEpochDay = start.toLocalDate().toEpochDay();
        long endEpochDay = end.toLocalDate().toEpochDay();
        long randomDay = ThreadLocalRandom.current().nextLong(startEpochDay, endEpochDay + 1);

        LocalDate randomLocalDate = LocalDate.ofEpochDay(randomDay);
        LocalTime randomLocalTime = LocalTime.ofSecondOfDay(ThreadLocalRandom.current().nextLong(0, 24 * 60 * 60));
        return LocalDateTime.of(randomLocalDate, randomLocalTime);
    }

    public MultiTradeResponseDto sell(MultiTradeRequestDto dto, Long memberId) {
        MultiGame currentGame = this.getGame(memberId, dto.gameIdx());

        // 차트에서 오늘의 종가를 가져온다.
        StockChart todayChart = stockChartRepository.findById(currentGame.getFirstDayStockChartId()+ 299 + dto.day()).orElseThrow(
            () -> new BaseExceptionHandler(ErrorCode.NO_SINGLE_GAME_STOCK)
        );

        // 현재 수량보다 많으면 에러.
        if (dto.amount() > currentGame.getStockAmount()) {
            throw new BaseExceptionHandler(ErrorCode.NOT_ENOUGH_STOCK_AMOUNT);
        }

        long totalAsset = currentGame.getCash() + ((long) currentGame.getStockAmount() * todayChart.getEndPrice());

        // 팔았으니 currentGame 바꿔주기
        currentGame.decreaseStockAmount(dto.amount());
        currentGame.updateCash(currentGame.getCash() + (long) (dto.amount() * todayChart.getEndPrice() * 0.975));
        currentGame.addProfit(dto.amount() * (currentGame.getAveragePrice() - todayChart.getEndPrice()) -
            dto.amount() * todayChart.getEndPrice() * 0.025);
//        currentGame.updateTotalAsset(totalAsset);

        return new MultiTradeResponseDto();
    }

    public MultiTradeResponseDto buy(MultiTradeRequestDto dto, Long id) {
        return new MultiTradeResponseDto();
    }

    public MultiTradeResponseDto shortSelling(MultiTradeRequestDto dto, Long id) {
        return new MultiTradeResponseDto();
    }

    public MultiNextDayResponseDto getTomorrow(MultiNextDayRequestDto dto, Long id) {
        return new MultiNextDayResponseDto();
    }


    public MultiGame getGame(long memberId, long gameIdx) {
        String pattern = "multiGame:" + memberId + ":" + gameIdx + ":*";
        Set<String> keys = redisTemplate.keys(pattern);
        if (keys != null && !keys.isEmpty()) {
            long maxNumber = -1L;

            // 모든 키에 대해 반복하여 가장 큰 숫자를 찾음 -> 오류가 나서 게임이 하나 이상 불러지더라도 최근 게임을 불러오도록
            for (String key : keys) {
                String[] parts = key.split(":");
                if (parts.length > 0) {
                    String lastPart = parts[parts.length - 1];
                    try {
                        long number = Long.parseLong(lastPart);
                        if (number > maxNumber) {
                            maxNumber = number;
                        }
                    } catch (NumberFormatException e) {

                    }
                }
            }
            try {
                String jsonStr = objectMapper.writeValueAsString(redisTemplate.opsForValue().get("multiGame:" + memberId + ":" + maxNumber));
                return objectMapper.readValue(jsonStr, MultiGame.class);
            } catch (Exception e) {
                e.printStackTrace();
            }


        }
        return null;
    }
}
