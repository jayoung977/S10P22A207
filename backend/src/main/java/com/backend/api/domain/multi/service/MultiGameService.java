package com.backend.api.domain.multi.service;

import com.backend.api.domain.member.entity.Member;
import com.backend.api.domain.member.repository.MemberRepository;
import com.backend.api.domain.member.repository.MultiGamePlayerRepository;
import com.backend.api.domain.multi.dto.MultiGameResultRequestDto;
import com.backend.api.domain.multi.dto.request.MultiGameRoomCreateRequestDto;
import com.backend.api.domain.multi.dto.request.MultiGameStartRequestDto;
import com.backend.api.domain.multi.dto.request.MultiNextDayRequestDto;
import com.backend.api.domain.multi.dto.request.MultiTradeRequestDto;
import com.backend.api.domain.multi.dto.response.MultiGameFinalResultDto;
import com.backend.api.domain.multi.dto.response.MultiGameResultDto;
import com.backend.api.domain.multi.dto.response.MultiGameRoomCreateResponseDto;
import com.backend.api.domain.multi.dto.response.MultiGameRoomInfo;
import com.backend.api.domain.multi.dto.response.MultiGameRoomsResponseDto;
import com.backend.api.domain.multi.dto.response.MultiGameStartResponseDto;
import com.backend.api.domain.multi.dto.response.MultiGameTotalResultDto;
import com.backend.api.domain.multi.dto.response.MultiNextDayInfoResponseDto;
import com.backend.api.domain.multi.dto.response.MultiNextDayResponseDto;
import com.backend.api.domain.multi.dto.response.MultiTradeListDto;
import com.backend.api.domain.multi.dto.response.MultiTradeResponseDto;
import com.backend.api.domain.multi.entity.MultiGame;
import com.backend.api.domain.multi.entity.MultiGameLog;
import com.backend.api.domain.multi.entity.MultiGamePlayer;
import com.backend.api.domain.multi.entity.MultiTrade;
import com.backend.api.domain.multi.entity.MultiWaitingRoom;
import com.backend.api.domain.multi.repository.MultiGameLogRepository;
import com.backend.api.domain.multi.repository.MultiTradeRepository;
import com.backend.api.domain.stock.entity.StockChart;
import com.backend.api.domain.stock.repository.StockChartRepository;
import com.backend.api.domain.stock.repository.StockRepository;
import com.backend.api.global.common.code.ErrorCode;
import com.backend.api.global.common.type.TradeType;
import com.backend.api.global.exception.BaseExceptionHandler;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.Set;
import java.util.concurrent.ThreadLocalRandom;
import java.util.concurrent.atomic.AtomicInteger;
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

    private final StockRepository stockRepository;

    private final MultiTradeRepository multiTradeRepository;

    private final MultiGamePlayerRepository multiGamePlayerRepository;

    private final MultiGameLogRepository multiGameLogRepository;

    private final RedisTemplate<String, Object> redisTemplate;
    private final StockChartRepository stockChartRepository;
    private final MemberRepository memberRepository;
    private final ObjectMapper objectMapper;

    /*
     * 멀티게임 key :  multiGame:gameId:memberId:roundNumber
     */
    public MultiGameRoomsResponseDto getMultiGameRooms(int pageNumber) {
        Set<String> multiGameRooms = redisTemplate.keys("multiGame:*");
        if (multiGameRooms == null) {
            return null;
        }

        MultiGame currentGame = null;
        // 방번호와 게임번호를 기준으로 그룹화
        Map<String, List<Long>> roomGroups = new HashMap<>();
        for (String key : multiGameRooms) {
            String[] parts = key.split(":");
            if (parts.length == 4) {
                String roomId = parts[1];
                String participantId = parts[2];
                String roundNumber = parts[3];
                currentGame = getGame(Long.parseLong(participantId), Long.parseLong(roomId));
                String groupKey = roomId + ":" + roundNumber;
                roomGroups.computeIfAbsent(groupKey, k -> new ArrayList<>()).add(Long.valueOf(participantId));
            }
        }


        // MultiGameRoomsResponseDto 객체로 변환하여 리스트에 추가
        List<MultiGameRoomInfo> resultList = new ArrayList<>();
        for (Map.Entry<String, List<Long>> entry : roomGroups.entrySet()) {
            String[] parts = entry.getKey().split(":");
            if (parts.length == 2) {
                Long roomId = Long.valueOf(parts[0]);
                Integer roundNumber = Integer.valueOf(parts[1]);
                List<Long> participantsIds = entry.getValue();
                resultList.add(
                    new MultiGameRoomInfo(roomId,
                        currentGame.getRoomTitle() ,
                        roundNumber,
                        participantsIds,
                        currentGame.getIsOpen(),
                        currentGame.getPassword()
                    )
                );
            }
        }
        // 방 번호를 기준으로 정렬
        resultList.sort(Comparator.comparing(MultiGameRoomInfo::roomId));

        // 페이징 - 6으로 하드코딩 한 부분이 pageSize
        int fromIndex = (pageNumber - 1) * 6;
        int toIndex = Math.min(fromIndex + 6, resultList.size());
        return new MultiGameRoomsResponseDto(resultList.size(), resultList.subList(fromIndex, toIndex));
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

    public MultiGameRoomCreateResponseDto createMultiGameRoom(Long memberId, MultiGameRoomCreateRequestDto dto) {

        Long roomId = redisTemplate.opsForValue().increment("roomId", 1); // Redis에서 Atomic한 증가
        if (roomId == null || roomId == 1) {
            roomId = 1L; // 초기값 설정
            redisTemplate.opsForValue().set("roomId", roomId);
        }
        String key = "multiGame:" + roomId; // Redis에 저장할 키
        List<Long> participantIds = new ArrayList<>();
        participantIds.add(memberId);
        MultiWaitingRoom multiWaitingRoom =
            MultiWaitingRoom.builder()
                .roomTitle(dto.roomTitle())
                .participantIds(participantIds)
                .password(dto.password())
                .isOpen(dto.isOpen())
                .round(0)
                .build();
        redisTemplate.opsForValue().set(key, multiWaitingRoom); // TODO : 이렇게 해도 되나?
        return new MultiGameRoomCreateResponseDto(roomId);
    }

    public MultiGameStartResponseDto startMultiGame(Long memberId, MultiGameStartRequestDto dto) {

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

        // TODO : 0 -> 1라운드만 이렇게 하고 나머지 라운드에서는 gameId 그대로 쓸것!
        Long gameId = null;
        if(dto.roundNumber() == 0) {
            // multiGame 저장 키: multiGame:gameId:memberId:roundNumber
            gameId = redisTemplate.opsForValue().increment("gameId", 1); // Redis에서 Atomic한 증가
            if (gameId == null || gameId == 1) {
                gameId = 1L; // 초기값 설정
                redisTemplate.opsForValue().set("gameId", gameId);
            }
        } else{
            // Redis에서 memberId가 주어진 값을 가진 키 중에서 gameId가 가장 큰 값을 찾기 위한 패턴
            String pattern = "multiGame:*:" + memberId + ":*";

            // 패턴과 일치하는 키를 모두 가져옴
            Set<String> keys = redisTemplate.keys(pattern);

            Long maxGameId = null;

            // 각 키에 대해 gameId를 추출하여 최대 gameId를 찾음
            for (String key : keys) {
                String[] parts = key.split(":");
                long temp = Long.parseLong(parts[1]);
                if (maxGameId == null || temp > maxGameId) {
                    maxGameId = temp;
                }
            }
            gameId = maxGameId;
        }

        Long gameLogId = null;
        MultiGameLog multiGameLog
            = MultiGameLog.builder()
            .gameId(gameId)
            .startDate(randomDateTime)
            .round(dto.roundNumber())
            .build();

        gameLogId = multiGameLogRepository.save(multiGameLog).getId();

        log.info("dto.playerIds.size() - {}", dto.playerIds().size());
        for (Long playerId : dto.playerIds()) {
            Member member = memberRepository.findById(playerId).orElseThrow(() -> new BaseExceptionHandler(ErrorCode.NOT_FOUND_USER));
            MultiGamePlayer multiGamePlayer = MultiGamePlayer.builder()
                .multiGameLog(multiGameLog)
                .member(member)
                .finalProfit(0)
                .finalRoi(0.0)
                .ranking(1)
                .build();
            multiGamePlayerRepository.save(multiGamePlayer);
        }

        MultiWaitingRoom multiWaitingRoom = getWaitingRoom(gameId);

        // 각 플레이어의 게임 정보를 Redis에 저장.
        for (Long playerId : dto.playerIds()) {
            MultiGame multiGame = MultiGame.builder()
                .multiGameLogId(gameLogId)
                .memberId(playerId)
                .firstDayStockChartId(firstDayStockChartId)
                .roomTitle(multiWaitingRoom.getRoomTitle())
                .password(multiWaitingRoom.getPassword())
                .isOpen(multiWaitingRoom.getIsOpen())
                .cash(1_000_000_0L)
                .initial(1_000_000_0L)
                .day(1)
                .round(1)
                .build();

            String key = "multiGame:" + gameId + ":" + memberId + dto.roundNumber(); // Redis에 저장할 키
            redisTemplate.opsForValue().set(key, multiGame);
        }
        return new MultiGameStartResponseDto(gameLogId);
    }


    // 공매도 청산
    public MultiTradeResponseDto closeShortPosition(MultiTradeRequestDto dto, Long memberId) {
        MultiGame currentGame = this.getGame(memberId, dto.gameId());

        // 차트에서 오늘의 종가를 가져온다.
        StockChart todayChart = stockChartRepository.findById(currentGame.getFirstDayStockChartId()+ 300 + dto.day()).orElseThrow(
            () -> new BaseExceptionHandler(ErrorCode.NO_SINGLE_GAME_STOCK)
        );

        Long stockId = todayChart.getStock().getId();

        // 현재 수량보다 많으면 에러.
        if (dto.amount() > currentGame.getShortStockAmount()) {
            throw new BaseExceptionHandler(ErrorCode.NOT_ENOUGH_STOCK_AMOUNT);
        }
        // 현재 총 자산 -> 현금 + 현재가 * (주식 + 공매도) //수수료제외
        long totalAsset = currentGame.getCash()
            + (long)((currentGame.getStockAmount() + currentGame.getShortStockAmount()) * todayChart.getEndPrice() * 0.975);

        // 공매도 처분 - currentGame 바꿔주기
        currentGame.decreaseShortStockAmount(dto.amount());
        currentGame.updateCash(currentGame.getCash() + (long) (dto.amount() * todayChart.getEndPrice() * 0.975));
        currentGame.addProfit(dto.amount() * (currentGame.getShortAveragePrice() - todayChart.getEndPrice() * 1.025)); // 수수료 고려
        currentGame.updateTotalAsset(totalAsset);

        double resultRoi = 100.0 * currentGame.getProfit() / currentGame.getTotalPurchaseAmount();

        MultiTrade multiTrade = MultiTrade.builder()
            .tradeType(TradeType.SELL)
            .amount(dto.amount())
            .date(todayChart.getDate())
            .price(todayChart.getEndPrice())
            .amount(currentGame.getStockAmount())
            .roi(resultRoi)
            .round(dto.roundNumber())
            .build();

        multiTradeRepository.save(multiTrade);
        currentGame.getTradeList().add(
            new MultiTradeListDto(
                stockId,
                multiTrade.getRound(),
                multiTrade.getDate(),
                multiTrade.getTradeType(),
                multiTrade.getAmount(),
                multiTrade.getPrice(),
                (long) currentGame.getProfit()
            )
        );
        redisTemplate.opsForValue().set("multiGame:" + dto.gameId() + ":" + memberId + dto.roundNumber(), currentGame);
        return new MultiTradeResponseDto(
            currentGame.getCash(),
            TradeType.SELL,
            multiTrade.getPrice(),
            multiTrade.getAmount(),
            (int) (todayChart.getEndPrice() * dto.amount() * 0.025),
            (long) (0.975 * todayChart.getEndPrice() - currentGame.getAveragePrice()) * dto.amount(),
            currentGame.getTotalAsset(),
            currentGame.getTradeList()
        );
    }

    public MultiTradeResponseDto buy(MultiTradeRequestDto dto, Long memberId) {
        MultiGame currentGame = this.getGame(memberId, dto.gameId());

        // 차트에서 오늘의 종가를 가져온다.
        StockChart todayChart = stockChartRepository.findById(currentGame.getFirstDayStockChartId()+ 300 + dto.day()).orElseThrow(
            () -> new BaseExceptionHandler(ErrorCode.NO_SINGLE_GAME_STOCK)
        );

        Long stockId = todayChart.getStock().getId();

        // 현재 가진 돈보다 더 많이 요구한다면
        if ((long) dto.amount() * todayChart.getEndPrice() > currentGame.getCash()) {
            throw new BaseExceptionHandler(ErrorCode.NOT_ENOUGH_MONEY);
        }

        // 샀으니 currentGame 바꿔주기
        currentGame.increaseStockAmount(dto.amount());
        currentGame.updateCash(currentGame.getCash() - (long) (dto.amount() * todayChart.getEndPrice() * 1.0015));
        currentGame.addProfit((-1) * dto.amount() * todayChart.getEndPrice() * 0.0015);
        long totalAsset = currentGame.getCash() + ((long) currentGame.getStockAmount() * todayChart.getEndPrice());
        currentGame.updateTotalAsset(totalAsset);
        currentGame.addPurchaseAmount((long) dto.amount() * todayChart.getEndPrice());

        double resultRoi = 100.0 * currentGame.getProfit() / currentGame.getTotalPurchaseAmount();

        MultiTrade multiTrade = MultiTrade.builder()
            .tradeType(TradeType.BUY)
            .amount(dto.amount())
            .date(todayChart.getDate())
            .price(todayChart.getEndPrice())
            .amount(currentGame.getStockAmount())
            .roi(resultRoi)
            .round(dto.roundNumber())
            .build();

        multiTradeRepository.save(multiTrade);
        currentGame.getTradeList().add(
            new MultiTradeListDto(
                stockId,
                multiTrade.getRound(),
                multiTrade.getDate(),
                multiTrade.getTradeType(),
                multiTrade.getAmount(),
                multiTrade.getPrice(),
                (long) currentGame.getProfit()
            )
        );
        redisTemplate.opsForValue().set("multiGame:" + dto.gameId() + ":" + memberId + dto.roundNumber(), currentGame);
        return new MultiTradeResponseDto(
            currentGame.getCash(),
            TradeType.BUY,
            multiTrade.getPrice(),
            multiTrade.getAmount(),
            (int) (todayChart.getEndPrice() * dto.amount() * 0.0015),
            (int) (-todayChart.getEndPrice() * dto.amount() * 0.0015),
            currentGame.getTotalAsset(),
            currentGame.getTradeList()
        );
    }

    public MultiTradeResponseDto shortSelling(MultiTradeRequestDto dto, Long memberId) {

        MultiGame currentGame = this.getGame(memberId, dto.gameId());

        // 차트에서 오늘의 종가를 가져온다.
        StockChart todayChart = stockChartRepository.findById(currentGame.getFirstDayStockChartId()+ 300 + dto.day()).orElseThrow(
            () -> new BaseExceptionHandler(ErrorCode.NO_SINGLE_GAME_STOCK)
        );

        Long stockId = todayChart.getStock().getId();

        if(currentGame.getCash() < (long) todayChart.getEndPrice() * dto.amount()){
            throw new BaseExceptionHandler(ErrorCode.NOT_ENOUGH_MONEY);
        }

        // 공매도 -> currentGame 바꿔주기
        currentGame.increaseShortStockAmount(dto.amount());
        currentGame.updateCash(currentGame.getCash() - (long) (dto.amount() * todayChart.getEndPrice() * 1.025));
        currentGame.addProfit((-1) * dto.amount() * todayChart.getEndPrice() * 0.025);
        long totalAsset = currentGame.getCash() + ((long) currentGame.getStockAmount() * todayChart.getEndPrice());
        currentGame.updateTotalAsset(totalAsset);
        currentGame.addPurchaseAmount((long) currentGame.getStockAmount() * todayChart.getEndPrice());

        double resultRoi = 100.0 * currentGame.getProfit() / currentGame.getTotalPurchaseAmount();

        MultiTrade multiTrade = MultiTrade.builder()
            .tradeType(TradeType.SHORT)
            .amount(dto.amount())
            .date(todayChart.getDate())
            .price(todayChart.getEndPrice())
            .amount(currentGame.getStockAmount())
            .roi(resultRoi)
            .round(dto.roundNumber())
            .build();

        multiTradeRepository.save(multiTrade);
        currentGame.getTradeList().add(
            new MultiTradeListDto(
                stockId,
                multiTrade.getRound(),
                multiTrade.getDate(),
                multiTrade.getTradeType(),
                multiTrade.getAmount(),
                multiTrade.getPrice(),
                (long) currentGame.getProfit()
            )
        );
        redisTemplate.opsForValue().set("multiGame:" + dto.gameId() + ":" + memberId + dto.roundNumber(), currentGame);
        return new MultiTradeResponseDto(
            currentGame.getCash(),
            TradeType.SHORT,
            multiTrade.getPrice(),
            multiTrade.getAmount(),
            (int) (todayChart.getEndPrice() * dto.amount() * 0.025),
            (int) (-todayChart.getEndPrice() * dto.amount() * 0.025),
            currentGame.getTotalAsset(),
            currentGame.getTradeList()
        );
    }

    public MultiTradeResponseDto sell(MultiTradeRequestDto dto, Long memberId) {
        MultiGame currentGame = this.getGame(memberId, dto.gameId());

        // 차트에서 오늘의 종가를 가져온다.
        StockChart todayChart = stockChartRepository.findById(currentGame.getFirstDayStockChartId()+ 300 + dto.day()).orElseThrow(
            () -> new BaseExceptionHandler(ErrorCode.NO_SINGLE_GAME_STOCK)
        );

        Long stockId = todayChart.getStock().getId();

        // 현재 수량보다 많으면 에러.
        if (dto.amount() > currentGame.getStockAmount()) {
            throw new BaseExceptionHandler(ErrorCode.NOT_ENOUGH_STOCK_AMOUNT);
        }

        long totalAsset = currentGame.getCash() + ((long) currentGame.getStockAmount() * todayChart.getEndPrice());

        // 팔았으니 currentGame 바꿔주기
        currentGame.decreaseStockAmount(dto.amount());
        currentGame.updateCash(currentGame.getCash() + (long) (dto.amount() * todayChart.getEndPrice() * 0.975));
        currentGame.addProfit(dto.amount() * (0.975 * todayChart.getEndPrice() - currentGame.getAveragePrice())); // 수수료 고려
        currentGame.updateTotalAsset(totalAsset);

        double resultRoi = 100.0 * currentGame.getProfit() / currentGame.getTotalPurchaseAmount();

        MultiTrade multiTrade = MultiTrade.builder()
            .tradeType(TradeType.SELL)
            .amount(dto.amount())
            .date(todayChart.getDate())
            .price(todayChart.getEndPrice())
            .amount(currentGame.getStockAmount())
            .roi(resultRoi)
            .round(dto.roundNumber())
            .build();

        multiTradeRepository.save(multiTrade);
        currentGame.getTradeList().add(
            new MultiTradeListDto(
                stockId,
                multiTrade.getRound(),
                multiTrade.getDate(),
                multiTrade.getTradeType(),
                multiTrade.getAmount(),
                multiTrade.getPrice(),
                (long) currentGame.getProfit()
            )
        );
        redisTemplate.opsForValue().set("multiGame:" + dto.gameId() + ":" + memberId + dto.roundNumber(), currentGame);
        return new MultiTradeResponseDto(
            currentGame.getCash(),
            TradeType.SELL,
            multiTrade.getPrice(),
            multiTrade.getAmount(),
            (int) (todayChart.getEndPrice() * dto.amount() * 0.025),
            (long) (0.975 * todayChart.getEndPrice() - currentGame.getAveragePrice()) * dto.amount(),
            currentGame.getTotalAsset(),
            currentGame.getTradeList()
        );
    }

    public MultiNextDayResponseDto getTomorrow(MultiNextDayRequestDto dto, Long memberId) {
        MultiGame currentGame = this.getGame(memberId, dto.gameId());

        currentGame.updateDay(dto.day());

        StockChart todayChart = stockChartRepository.findById(currentGame.getFirstDayStockChartId() + 300 + dto.day()).orElseThrow();
        StockChart yesterdayChart = stockChartRepository.findById(currentGame.getFirstDayStockChartId() + 300 + dto.day() - 1).orElseThrow();

        // 어제에 비해서 얼마나 바뀌었는지. 매수 수량은 더해주고
        // 공매도는 반대.
        currentGame.addProfit((currentGame.getStockAmount() - currentGame.getShortStockAmount()) * (todayChart.getEndPrice() - yesterdayChart.getEndPrice()));

        MultiNextDayInfoResponseDto multiNextDayInfoResponseDto =
            new MultiNextDayInfoResponseDto(
                todayChart.getEndPrice(),
                todayChart.getEndPrice() - yesterdayChart.getEndPrice(),
                currentGame.getStockAmount(),
                currentGame.getShortStockAmount(),
                currentGame.getProfit(),
                100.0 * currentGame.getProfit() / currentGame.getTotalPurchaseAmount()
            );
        long totalAssets = currentGame.getCash();
        if (dto.day() == 51) {

            // 아직 매도하지 않은 물량은 팔아준다.
            totalAssets += (long) ((currentGame.getStockAmount() - currentGame.getShortStockAmount()) * todayChart.getEndPrice() * 0.975);
            // 강제로 판다. (주식 수량 - 공매도 수량) * (오늘 가격 - 평단가) * 0.975 // 생각해보니 주식수량과 공매도 수량은 공존할 수 없음.
            currentGame.addProfit((currentGame.getStockAmount()- currentGame.getShortStockAmount()) * (todayChart.getEndPrice() - currentGame.getAveragePrice()) * 0.975);

            String key = "multiGame:" + dto.gameId() + ":" + memberId + ":" + dto.roundNumber(); // Redis에 저장할 키
            redisTemplate.opsForValue().set(key, currentGame);

            // roi : (총수익) / (총 투자한 돈) * 100
            double roi = currentGame.getTotalPurchaseAmount() == 0L ? 0 :
                (100.0 * (currentGame.getProfit()+
                    (currentGame.getStockAmount()-currentGame.getShortStockAmount()) * (todayChart.getEndPrice() - currentGame.getAveragePrice()))
                    / currentGame.getTotalPurchaseAmount());
            MultiGameResultDto multiGameResult = new MultiGameResultDto(
                memberId,
                memberRepository.findById(memberId).orElseThrow(() -> new BaseExceptionHandler(ErrorCode.NOT_FOUND_USER)).getNickname(),

                stockRepository.findById(todayChart.getStock().getId()).orElseThrow(
                    () -> new BaseExceptionHandler(ErrorCode.NO_SINGLE_GAME_STOCK)
                ).getStockName(),
                stockChartRepository.findById(currentGame.getFirstDayStockChartId()).orElseThrow(
                    () -> new BaseExceptionHandler(ErrorCode.NO_SINGLE_GAME_STOCK)
                ).getDate(),
                stockChartRepository.findById(currentGame.getFirstDayStockChartId() + 349).orElseThrow(
                    () -> new BaseExceptionHandler(ErrorCode.NO_SINGLE_GAME_STOCK)
                ).getDate(),
                (long) currentGame.getProfit(), roi, dto.roundNumber()
            );

            //TODO : MultiGamePlayer, MultiGameLog 둘중하나(매핑되어있으니) 갱신
            return new MultiNextDayResponseDto(multiNextDayInfoResponseDto, multiGameResult);
        }

        return new MultiNextDayResponseDto(multiNextDayInfoResponseDto, null);
    }

    public static LocalDateTime generateRandomDateTime(LocalDateTime start, LocalDateTime end) {
        long startEpochDay = start.toLocalDate().toEpochDay();
        long endEpochDay = end.toLocalDate().toEpochDay();
        long randomDay = ThreadLocalRandom.current().nextLong(startEpochDay, endEpochDay + 1);

        LocalDate randomLocalDate = LocalDate.ofEpochDay(randomDay);
        LocalTime randomLocalTime = LocalTime.ofSecondOfDay(ThreadLocalRandom.current().nextLong(0, 24 * 60 * 60));
        return LocalDateTime.of(randomLocalDate, randomLocalTime);
    }

    public MultiWaitingRoom getWaitingRoom(long roomId) {
        String pattern = "multiGame:" + roomId;
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
                String jsonStr = objectMapper.writeValueAsString(redisTemplate.opsForValue().get("multiGame:" + roomId));
                objectMapper.readValue(jsonStr, MultiWaitingRoom.class);
            } catch (Exception e) {
                e.printStackTrace();
            }


        }
        return null;
    }

    public MultiGame getGame(long memberId, long gameId) {
        String pattern = "multiGame:" + gameId + ":" + memberId + ":*";
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
                String jsonStr = objectMapper.writeValueAsString(redisTemplate.opsForValue().get("multiGame:" + gameId + ":" + memberId + ":" + maxNumber));
                return objectMapper.readValue(jsonStr, MultiGame.class);
            } catch (Exception e) {
                e.printStackTrace();
            }


        }
        return null;
    }

    public MultiGameFinalResultDto getFinalResult(MultiGameResultRequestDto dto) {

        List<MultiGameLog> multiGameLogs = multiGameLogRepository.findByGameId(dto.gameId());
        //라운드 순으로 정렬
        List<MultiGameLog> collect = multiGameLogs.stream()
            .sorted(Comparator.comparingInt(MultiGameLog::getRound))
            .toList(); 
      
        // 각 라운드 별 정보
        List<MultiGameResultDto> multiGameResult = new ArrayList<>();

        // 각 플레이어마다 profit 더한다.=> 랭킹을 위해서!
        Map<Member, Integer> memberProfitMap = new HashMap<>();

        for(MultiGameLog multiGameLog : collect) {
            int round = multiGameLog.getRound();

            // 특정 게임, 라운드의 플레이어들 마다!
            List<MultiGamePlayer> multiGamePlayers = multiGameLog.getMultiGamePlayers();
            String stockName = stockRepository.findById(multiGameLog.getStockId()).orElseThrow(
                () -> new BaseExceptionHandler(ErrorCode.NO_SINGLE_GAME_STOCK)
            ).getStockName();
            StockChart firstDayStockChart = stockChartRepository.findByStock_IdAndDate(multiGameLog.getStockId(), multiGameLog.getStartDate())
                .orElseThrow(() -> new BaseExceptionHandler(ErrorCode.NO_SINGLE_LOG_STOCK_CHART));
            StockChart lastDayStockChart = stockChartRepository.findById(firstDayStockChart.getId() + 349)
                .orElseThrow(() -> new BaseExceptionHandler(ErrorCode.NO_SINGLE_LOG_STOCK_CHART));

            for (MultiGamePlayer multiGamePlayer : multiGamePlayers) {
                MultiGameResultDto multiGameResultDto = new MultiGameResultDto(
                    multiGamePlayer.getMember().getId(),
                    multiGamePlayer.getMember().getNickname(),
                    stockName,
                    multiGameLog.getStartDate(),
                    lastDayStockChart.getDate(),
                    (long) multiGamePlayer.getFinalProfit(),
                    multiGamePlayer.getFinalRoi(),
                    round
                );
                Member member = multiGamePlayer.getMember();
                int profit = multiGamePlayer.getFinalProfit();

                memberProfitMap.merge(member, profit, Integer::sum);
                multiGameResult.add(multiGameResultDto);
            }
        }

        AtomicInteger i = new AtomicInteger(1);
        List<MultiGameTotalResultDto> totalResult = memberProfitMap.entrySet().stream()
            .sorted(Map.Entry.comparingByValue(Comparator.reverseOrder())) // finalProfit을 기준으로 내림차순 정렬
            .map(entry -> {
                Member member = entry.getKey();
                int totalProfit = entry.getValue();

                // MultiGameTotalResultDto 생성
                return new MultiGameTotalResultDto(
                    member.getId(),
                    member.getNickname(),
                    i.getAndIncrement(),
                    calculateRankPoint(memberProfitMap.size(), i.get()),
                    (long) totalProfit + 10_000_000,
                    100.0 * totalProfit / 10_000_000
                );
            })
            .toList();
        return new MultiGameFinalResultDto(multiGameResult, totalResult);
    }


    private int calculateRankPoint(int totalPlayers, int rank) {
        int[] points;
        if (totalPlayers == 6) {
            points = new int[]{0, 15, 10, 5, 0, -5, -10};
        } else if (totalPlayers == 5) {
            points = new int[]{0,11, 5, 2, -1, -5};
        } else if (totalPlayers == 4) {
            points = new int[]{0,6, 3, -1, -5};
        } else if (totalPlayers == 3) {
            points = new int[]{0,4, 1, -3};
        } else if (totalPlayers == 2) {
            points = new int[]{0,3, -1};
        } else {
            throw new IllegalArgumentException("Unsupported number of players: " + totalPlayers);
        }

        // 등수에 따른 인덱스 계산
        int index = rank - 1;

        // 배열 범위를 벗어나면 예외 발생
        if (index < 0 || index >= points.length) {
            throw new IllegalArgumentException("Invalid rank: " + rank);
        }

        return points[index];
    }
}
