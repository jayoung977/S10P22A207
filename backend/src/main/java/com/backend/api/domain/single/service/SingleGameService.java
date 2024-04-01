package com.backend.api.domain.single.service;

import com.backend.api.domain.member.entity.Member;
import com.backend.api.domain.member.repository.MemberRepository;
import com.backend.api.domain.single.dto.request.NextDayRequestDto;
import com.backend.api.domain.single.dto.request.SingleTradeRequestDto;
import com.backend.api.domain.single.dto.response.AssetListDto;
import com.backend.api.domain.single.dto.response.ChangedStockResponseDto;
import com.backend.api.domain.single.dto.response.ExistingSingleGameResponseDto;
import com.backend.api.domain.single.dto.response.NextDayInfoResponseDto;
import com.backend.api.domain.single.dto.response.NextDayResponseDto;
import com.backend.api.domain.single.dto.response.SingleGameCreateResponseDto;
import com.backend.api.domain.single.dto.response.SingleGameLogResponseDto;
import com.backend.api.domain.single.dto.response.SingleGameResultDto;
import com.backend.api.domain.single.dto.response.SingleLogRankMemberDto;
import com.backend.api.domain.single.dto.response.SingleLogRankMemberListDto;
import com.backend.api.domain.single.dto.response.SingleLogRankMemberLogDto;
import com.backend.api.domain.single.dto.response.SingleLogTradeDto;
import com.backend.api.domain.single.dto.response.SingleLogTradeListDto;
import com.backend.api.domain.single.dto.response.SingleTradeListDto;
import com.backend.api.domain.single.dto.response.SingleTradeResponseDto;
import com.backend.api.domain.single.dto.response.StockChartDataDto;
import com.backend.api.domain.single.dto.response.StockChartDto;
import com.backend.api.domain.single.dto.response.StockInfoDto;
import com.backend.api.domain.single.dto.response.TotalAssetDto;
import com.backend.api.domain.single.entity.SingleGame;
import com.backend.api.domain.single.entity.SingleGameLog;
import com.backend.api.domain.single.entity.SingleGameStock;
import com.backend.api.domain.single.entity.SingleTrade;
import com.backend.api.domain.single.repository.SingleGameLogRepository;
import com.backend.api.domain.single.repository.SingleGameStockRepository;
import com.backend.api.domain.single.repository.SingleTradeRepository;
import com.backend.api.domain.stock.entity.StockChart;
import com.backend.api.domain.stock.repository.StockChartRepository;
import com.backend.api.global.common.code.ErrorCode;
import com.backend.api.global.common.type.TradeType;
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
import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.ScheduledFuture;
import java.util.concurrent.ThreadLocalRandom;
import java.util.concurrent.TimeUnit;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
@Slf4j
@RequiredArgsConstructor
public class SingleGameService {

    private final SingleGameLogRepository singleGameLogRepository;
    private final SingleGameStockRepository singleGameStockRepository;
    private final SingleTradeRepository singleTradeRepository;
    private final StockChartRepository stockChartRepository;
    private final MemberRepository memberRepository;
    private final RedisTemplate<String, Object> redisTemplate;
    private final ObjectMapper objectMapper;

    private HashMap<Long, Integer> stocks;
    private List<Long> list;
    private static final int MAX_CHANCES = 5;
    private static final long RECHARGE_TIME = 10 * 60 * 1000L; // 10분
    private final Map<Long, ScheduledFuture<?>> timers = new HashMap<>();

    public ExistingSingleGameResponseDto existSingleGame(Long memberId) {
        Member member = memberRepository.findById(memberId)
            .orElseThrow(() -> new BaseExceptionHandler(ErrorCode.NOT_FOUND_USER));

        String pattern = "singleGame:" + memberId + ":*";
        Set<String> keys = redisTemplate.keys(pattern);

        if(keys != null && !keys.isEmpty()){
            return new ExistingSingleGameResponseDto(true, member.getSingleGameChance());
        } else {
            return new ExistingSingleGameResponseDto(false, member.getSingleGameChance());
        }

    }

    public SingleGameCreateResponseDto createGame(Long memberId) {

        // 도전 기회가 있는지 확인한다.
        Member me = memberRepository.findById(memberId)
            .orElseThrow(() -> new BaseExceptionHandler(ErrorCode.NOT_FOUND_USER));

        // 진행중인 게임이 있으면 불러오기
        String pattern = "singleGame:" + memberId + ":*";
        Set<String> keys = redisTemplate.keys(pattern);
        log.info("memberId - {} 에게 저장된 게임수 : {} ", memberId, keys.size());
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
            SingleGame currentGame = null;
            try {
                String jsonStr = objectMapper.writeValueAsString(redisTemplate.opsForValue().get("singleGame:" + memberId + ":" + maxNumber));
                currentGame = objectMapper.readValue(jsonStr, SingleGame.class);
            } catch (Exception e) {
                e.printStackTrace();
            }
            List<StockChartDataDto> stockChartDataList = new ArrayList<>();
            // 350치 차트는 새로 그려서 보내주기
            stocks = currentGame.getStocks();
            int cnt = 0;
            for (long stockId : stocks.keySet()) {
                StockChart stockChart = stockChartRepository.findById(currentGame.getFirstDayChartList().get(cnt++)).orElseThrow(
                    () -> new BaseExceptionHandler(ErrorCode.BAD_REQUEST_ERROR)
                );

                // 350일치 차트
                List<StockChart> stockChartList = stockChartRepository.findByIdBetween(stockChart.getId(), stockChart.getId() + 349);

                // 각 날짜에 대해 StockChartDto 생성 후 넣어주기
                List<StockChartDto> stockChartDtoList = new ArrayList<>();
                // 4. 350번 가져온다.
                stockChartList.forEach((stockChart1) -> {
                    StockChartDto stockChartDto = new StockChartDto(

                        stockChart1.getMarketPrice(),
                        stockChart1.getHighPrice(),
                        stockChart1.getLowPrice(),
                        stockChart1.getEndPrice(),
                        stockChart1.getTradingVolume(),
                        stockChart1.getDate()
                    );
                    stockChartDtoList.add(stockChartDto);
                });
                StockChartDataDto stockChartDataDto = new StockChartDataDto(stockChart.getStock().getId(), stockChartDtoList);
                stockChartDataList.add(stockChartDataDto);
            }

            long totalProfit = 0;
            for (int i = 0; i < currentGame.getProfits().length; i++) {
                totalProfit += currentGame.getProfits()[i];
            }
            double totalRoi = 100.0 * totalProfit / currentGame.getInitial();
            TotalAssetDto totalAssetDto = new TotalAssetDto(currentGame.getCash(), totalProfit, totalRoi, currentGame.getTotalPurchaseAmount(), currentGame.getTotalAsset());

            // 보유자산
            List<AssetListDto> assetList = new ArrayList<>();

            // 해당 일의
            List<NextDayInfoResponseDto> stockSummaries = new ArrayList<>();

            for (int i = 0; i < currentGame.getFirstDayChartList().size(); i++) {
                AssetListDto dto = new AssetListDto(
                    stockChartRepository.findById(currentGame.getFirstDayChartList().get(i)+ 299 + currentGame.getDay()).orElseThrow(
                        () -> new BaseExceptionHandler(ErrorCode.BAD_REQUEST_ERROR)
                    ).getStock().getId(),
                    currentGame.getStockAmount()[i],
                    currentGame.getProfits()[i],
                    currentGame.getAveragePrice()[i],
                    100.0 * currentGame.getProfits()[i] / currentGame.getStockPurchaseAmount()[i]
                );
                assetList.add(dto);

                StockChart todayChart = stockChartRepository.findById(currentGame.getFirstDayChartList().get(i) + 299 +  currentGame.getDay()).orElseThrow();
                StockChart yesterdayChart = stockChartRepository.findById(currentGame.getFirstDayChartList().get(i)+ 299 + currentGame.getDay() - 1).orElseThrow();

                Long startDateChartStockId = todayChart.getStock().getId();
                // 종목별 정보 담아주기
                Integer stockIdx = currentGame.getStocks().get(startDateChartStockId);

                stockSummaries.add(
                    new NextDayInfoResponseDto(
                        todayChart.getStock().getId(), // 종목 Id
                        todayChart.getEndPrice(), // 오늘의 종가
                        todayChart.getEndPrice() - yesterdayChart.getEndPrice(), // 등락정도
                        currentGame.getStockAmount()[stockIdx], // 보유수량
                        (long) currentGame.getStockAmount()[stockIdx] * (todayChart.getEndPrice()
                            - currentGame.getAveragePrice()[stockIdx]), // 평가손익
                        currentGame.getAveragePrice()[stockIdx] == 0 ? 0 :
                            1.0 * ((todayChart.getEndPrice() - currentGame.getAveragePrice()[stockIdx]) * 100)
                                / currentGame.getAveragePrice()[stockIdx]// 손익률
                    )
                );
            }
            return new SingleGameCreateResponseDto(maxNumber, currentGame.getDay(), me.getSingleGameChance(), stockChartDataList, totalAssetDto, assetList, currentGame.getTradeList(), stockSummaries);
        }

        if (me.getSingleGameChance() <= 0) {
            throw new BaseExceptionHandler(ErrorCode.NOT_ENOUGH_CHANCE);
        }
        me.decreaseChance();

        // 정해진 시간마다 기회 충전된다.
        if (!timers.containsKey(me.getId())) {

            log.info("timer 추가");
            startRechargeTimer(me);
        }

        LocalDateTime lastDate = LocalDateTime.of(2024, 3, 10, 0, 0); // 위험할수도
        LocalDateTime startDate = LocalDateTime.of(1996, 5, 10, 0, 0);

        LocalDateTime randomDateTime = generateRandomDateTime(startDate, lastDate); // 이 날짜로 조회

        // 10개의 Stock을 정한다. <StockId, idx>
        stocks = new HashMap<>(); // key : stockId, value : idx
        list = new ArrayList<>();

        // 10개 안채워지면 반복해야함.
        while (stocks.size() < 10) {
            log.info("stocks.size() - {}", stocks.size());
            List<String> stockIds = stockChartRepository.findDistinctStockCodeByDateBetween(randomDateTime, randomDateTime.plusDays(1));
            System.out.println("stockIds.size()" + stockIds.size());
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
                log.info("350개의 데이터가 없는지 확인 {}개까지 넣었음", stocks.size());
                // 350일 뒤의 stockChart와 다른 주식이면 pass
                StockChart stockChart350 = stockChartRepository.findById(stockChart.getId() + 349)
                    .orElseThrow(() -> new BaseExceptionHandler(ErrorCode.NO_SINGLE_GAME_STOCK));

                if (!Objects.equals(stockChart.getStock().getId(), stockChart350.getStock().getId())) {
                    randomDateTime = randomDateTime.minusDays(50);
                    break;
                }

                // 350일간의 차트가 있으면 추가.
                stocks.put(stockChart.getStock().getId(), stocks.size());
                list.add(stockChart.getId());
            }
        }

        Long gameLogId = null;
        SingleGameLog singleGameLog
            = SingleGameLog.builder()
            .member(memberRepository.findById(memberId).orElseThrow(() -> new BaseExceptionHandler(ErrorCode.NOT_FOUND_USER)))
            .startDate(randomDateTime)
            .initialAsset(me.getAsset())
            .finalProfit(0L)
            .finalRoi(0D)
            .build();
        gameLogId = singleGameLogRepository.save(singleGameLog).getId();

        SingleGame singleGame = SingleGame.builder()
            .singleGameLogId(gameLogId)
            .stocks(stocks)
            .firstDayChartList(list)
            .tradeList(new ArrayList<>())
            .stockAmount(new int[10])
            .averagePrice(new int[10])
            .cash(me.getAsset())
            .initial(me.getAsset())
            .totalPurchaseAmount(0L)
            .profits(new int[10])
            .stockPurchaseAmount(new long[10]).build();

        Long nextId = null;

        nextId = redisTemplate.opsForValue().increment("nextId", 1); // Redis에서 Atomic한 증가
        if (nextId == null || nextId == 1) {
            nextId = 1L; // 초기값 설정
            redisTemplate.opsForValue().set("nextId", nextId); // Redis에 첫 번째 id 설정
        }
        String key = "singleGame:" + memberId + ":" + nextId; // Redis에 저장할 키
        redisTemplate.opsForValue().set(key, singleGame);

        List<StockChartDataDto> stockChartDataList = new ArrayList<>();

        int cnt = 0;
        for (long stockId : stocks.keySet()) {

            log.info("차트 그리기");
            StockChart stockChart = stockChartRepository.findById(list.get(cnt++)).orElseThrow(
                () -> new BaseExceptionHandler(ErrorCode.BAD_REQUEST_ERROR)
            );

            // SingleGameStock 만들어서 저장.
            SingleGameStock singleGameStock = SingleGameStock.builder()
                .singleGameLog(singleGameLog)
                .stock(stockChart.getStock())
                .roi(0D)
                .profit(0)
                .averagePurchasePrice(0)
                .build();
            singleGameStockRepository.save(singleGameStock);

            // 350일치 차트
            List<StockChart> stockChartList = stockChartRepository.findByIdBetween(stockChart.getId(), stockChart.getId() + 349);
            // 각 날짜에 대해 StockChartDto 생성 후 넣어주기
            List<StockChartDto> stockChartDtoList = new ArrayList<>();
            // 4. 350번 가져온다.
            stockChartList.forEach((stockChart1) -> {
                StockChartDto stockChartDto = new StockChartDto(

                    stockChart1.getMarketPrice(),
                    stockChart1.getHighPrice(),
                    stockChart1.getLowPrice(),
                    stockChart1.getEndPrice(),
                    stockChart1.getTradingVolume(),
                    stockChart1.getDate()
                );
                stockChartDtoList.add(stockChartDto);
            });
            StockChartDataDto stockChartDataDto = new StockChartDataDto(singleGameStock.getStock().getId(), stockChartDtoList);
            stockChartDataList.add(stockChartDataDto);
        }
        List<NextDayInfoResponseDto> stockSummaries = new ArrayList<>();
        for (Long firstDayStockChartId : singleGame.getFirstDayChartList()) {
            StockChart todayChart = stockChartRepository.findById(firstDayStockChartId + 300).orElseThrow();
            StockChart yesterdayChart = stockChartRepository.findById(firstDayStockChartId + 299).orElseThrow();

            stockSummaries.add(
                new NextDayInfoResponseDto(
                    todayChart.getStock().getId(), // 종목 Id
                    todayChart.getEndPrice(), // 오늘의 종가
                    todayChart.getEndPrice() - yesterdayChart.getEndPrice(), // 등락정도
                    0,0,0
                )
            );
        }
        TotalAssetDto totalAssetDto = new TotalAssetDto(me.getAsset(), 0, 0, 0, me.getAsset());
        return new SingleGameCreateResponseDto(nextId, 1, me.getSingleGameChance(), stockChartDataList, totalAssetDto, null, null, stockSummaries);
    }

    public SingleTradeResponseDto sell(SingleTradeRequestDto dto, Long memberId) {

        SingleGame currentGame = this.getGame(memberId, dto.gameIdx());
        SingleGameStock singleGameStock = singleGameStockRepository.findBySingleGameLog_IdAndStock_Id(currentGame.getSingleGameLogId(), dto.stockId())
            .orElseThrow(() -> new BaseExceptionHandler(ErrorCode.NO_SINGLE_GAME_STOCK));

        // 세션에 저장된 게임을 가져온다.
        Integer stockIdx = currentGame.getStocks().get(dto.stockId()); // Map으로 저장한 stockId에 대한 index값을 가져온다.

        // 차트에서 오늘 날짜의 종가를 가져온다.
        StockChart firstDayChart = stockChartRepository.findById(currentGame.getFirstDayChartList().get(stockIdx))
            .orElseThrow(() -> new BaseExceptionHandler(ErrorCode.BAD_REQUEST_ERROR));
        StockChart todayChart = stockChartRepository.findById(firstDayChart.getId() + 299 + dto.day()).orElseThrow(
            () -> new BaseExceptionHandler(ErrorCode.NO_SINGLE_GAME_STOCK)
        );

        // 현재 수량보다 많으면 에러.
        if (dto.amount() > currentGame.getStockAmount()[stockIdx]) {
            throw new BaseExceptionHandler(ErrorCode.NOT_ENOUGH_STOCK_AMOUNT);
        }

        // roi 계산
        long totalAsset = currentGame.getCash();
        for (int i = 0; i < currentGame.getFirstDayChartList().size(); i++) {
            long firstDayChartId = currentGame.getFirstDayChartList().get(i);
            StockChart todayStockChart = stockChartRepository.findById(firstDayChartId + 299 + dto.day()).orElseThrow(
                () -> new BaseExceptionHandler(ErrorCode.NO_SINGLE_GAME_STOCK)
            );
            int amount = currentGame.getStockAmount()[i]; // 해당 Stock의 보유량 가져오기

            totalAsset += (long) (amount * todayStockChart.getEndPrice() * 0.9975); // 총 자산 계산
        }

        // 팔았으니 currentGame 바꿔주기
        System.out.println("currentGame.getStockAmount()[stockIdx] = " + currentGame.getStockAmount()[stockIdx]);
        currentGame.getStockAmount()[stockIdx] -= dto.amount();
        System.out.println("currentGame.getStockAmount()[stockIdx] = " + currentGame.getStockAmount()[stockIdx]);

        currentGame.updateCash(currentGame.getCash() + (long) (dto.amount() * todayChart.getEndPrice() * 0.9975));
        currentGame.addProfit(stockIdx, (int) (dto.amount() * (currentGame.getAveragePrice()[stockIdx] - todayChart.getEndPrice()) -
            dto.amount() * todayChart.getEndPrice() * 0.0025));
        currentGame.updateTotalAsset(totalAsset);

        double resultRoi = 100.0 * currentGame.getProfits()[stockIdx] / currentGame.getStockPurchaseAmount()[stockIdx];

        SingleTrade singleTrade = SingleTrade.builder()
            .singleGameStock(singleGameStock)
            .date(todayChart.getDate())
            .tradeType(TradeType.SELL)
            .amount(dto.amount())
            .price(todayChart.getEndPrice()) // 현재가격.
            .stockQuantity(currentGame.getStockAmount()[stockIdx] - dto.amount())
            .roi(Double.parseDouble(String.format("%.2f", resultRoi)))
            .profit((long) currentGame.getProfits()[stockIdx])
            .build();
        singleTradeRepository.save(singleTrade);
        currentGame.getTradeList().add(
            new SingleTradeListDto(
                dto.stockId(),
                dto.day(),
                singleTrade.getTradeType(),
                singleTrade.getAmount(),
                singleTrade.getPrice(),
                singleTrade.getProfit())
        );

        // 변동있는 주식
        // 보유 자산 변동 -> stockId, 보유수량, 평가손익, 수익률, 평균 단가
        ChangedStockResponseDto changedStockResponseDto =
            new ChangedStockResponseDto(
                dto.stockId(),
                currentGame.getStockAmount()[currentGame.getStocks().get(dto.stockId())],
                currentGame.getProfits()[stockIdx],
                currentGame.getAveragePrice()[stockIdx], //평균단가
                100.0 * currentGame.getProfits()[stockIdx] / currentGame.getStockPurchaseAmount()[stockIdx] // 수익률
            );
        redisTemplate.opsForValue().set("singleGame:" + memberId + ":" + dto.gameIdx(), currentGame);

        long totalProfit = 0;
        for (int i = 0; i < currentGame.getProfits().length; i++) {
            totalProfit += currentGame.getProfits()[i];
        }
        double totalRoi = 100.0 * totalProfit / currentGame.getInitial();
        TotalAssetDto totalAssetDto = new TotalAssetDto(currentGame.getCash(), totalProfit, totalRoi, currentGame.getTotalPurchaseAmount(), currentGame.getTotalAsset());

        // 보유자산
        List<AssetListDto> assetList = new ArrayList<>();
        for (int i = 0; i < currentGame.getFirstDayChartList().size(); i++) {
            AssetListDto assetListDto = new AssetListDto(
                stockChartRepository.findById(currentGame.getFirstDayChartList().get(i)).orElseThrow(
                    () -> new BaseExceptionHandler(ErrorCode.BAD_REQUEST_ERROR)
                ).getStock().getId(),
                currentGame.getStockAmount()[i],
                currentGame.getProfits()[i],
                currentGame.getAveragePrice()[i],
                100.0 * currentGame.getProfits()[i] / currentGame.getStockPurchaseAmount()[i]
            );

            assetList.add(assetListDto);
        }

        // 보유현금, 보유자산 변동, 매매내역
        return new SingleTradeResponseDto(
            currentGame.getCash(),
            changedStockResponseDto,
            TradeType.SELL,
            todayChart.getEndPrice(),
            dto.amount(),
            (int) (todayChart.getEndPrice() * dto.amount() * 0.0025),
            (long) (0.9975 * todayChart.getEndPrice() - currentGame.getAveragePrice()[stockIdx]) * dto.amount(),
            totalAssetDto,
            assetList,
            currentGame.getTradeList()
        );
    }

    public SingleTradeResponseDto buy(SingleTradeRequestDto dto, Long memberId) {

        SingleGame currentGame = this.getGame(memberId, dto.gameIdx());
        SingleGameStock singleGameStock = singleGameStockRepository.findBySingleGameLog_IdAndStock_Id(currentGame.getSingleGameLogId(),
                dto.stockId())
            .orElseThrow(() -> new BaseExceptionHandler(ErrorCode.NO_SINGLE_GAME_STOCK));

        Integer stockIdx = currentGame.getStocks().get(dto.stockId());
        // 차트에서 첫 날짜, 오늘 날짜의 종가를 가져온다.
        StockChart firstDayChart = stockChartRepository.findById(currentGame.getFirstDayChartList().get(stockIdx))
            .orElseThrow(() -> new BaseExceptionHandler(ErrorCode.BAD_REQUEST_ERROR));
        StockChart todayChart = stockChartRepository.findById(firstDayChart.getId() + 299 + dto.day()).orElseThrow(
            () -> new BaseExceptionHandler(ErrorCode.NO_SINGLE_GAME_STOCK)
        );

        // 현재 가진 돈보다 더 많이 요구한다면
        if ((long) dto.amount() * todayChart.getEndPrice() > currentGame.getCash()) {
            throw new BaseExceptionHandler(ErrorCode.NOT_ENOUGH_MONEY);
        }

        // 평균단가 계산 => (평균단가 * 수량 + 이번에 사는데 쓴 돈) / (원래수량 + 이번에 사는 수량)
        int averagePrice = (currentGame.getAveragePrice()[stockIdx] * currentGame.getStockAmount()[stockIdx]
            + dto.amount() * todayChart.getEndPrice()) / (currentGame.getStockAmount()[stockIdx] + dto.amount());
        //  샀으니 game 바꿔주기
        currentGame.getStockAmount()[stockIdx] += dto.amount();
        currentGame.updateCash(currentGame.getCash() - (long) (dto.amount() * todayChart.getEndPrice() * 1.0015));
        currentGame.getAveragePrice()[stockIdx] = averagePrice;
        currentGame.getStockPurchaseAmount()[stockIdx] += (long) dto.amount() * todayChart.getEndPrice();
        currentGame.getProfits()[stockIdx] -= (int) (dto.amount() * todayChart.getEndPrice() * 0.0015);

        // 총 roi 계산
        long totalAsset = currentGame.getCash();
        for (Long stockId : currentGame.getStocks().keySet()) {
            StockChart todayStockCharts = stockChartRepository.findById(stockId + 299 + dto.day()).orElseThrow(
                () -> new BaseExceptionHandler(ErrorCode.NO_SINGLE_GAME_STOCK)
            );

            int amount = currentGame.getStockAmount()[currentGame.getStocks().get(stockId)]; // 해당 Stock의 보유량 가져오기

            totalAsset += (long) (amount * todayStockCharts.getEndPrice() * 0.9975); // 총 자산 계산
        }
        // 총 구입 금액 계산
        currentGame.addTotalPurchaseAmount((long) dto.amount() * todayChart.getEndPrice());

        double resultRoi = 100.0 * currentGame.getProfits()[stockIdx] / currentGame.getStockPurchaseAmount()[stockIdx];
        // 총 profit 계산

        SingleTrade singleTrade = SingleTrade.builder()
            .singleGameStock(singleGameStock)
            .date(todayChart.getDate())
            .tradeType(TradeType.BUY)
            .amount(dto.amount())
            .price(todayChart.getEndPrice()) // 현재가격.
            .stockQuantity(currentGame.getStockAmount()[stockIdx] + dto.amount())
            .roi(Double.parseDouble(String.format("%.2f", resultRoi)))
            .profit((long) currentGame.getProfits()[stockIdx])
            .build();
        singleTradeRepository.save(singleTrade);
        currentGame.getTradeList().add(
            new SingleTradeListDto(
                dto.stockId(),
                dto.day(),
                singleTrade.getTradeType(),
                singleTrade.getAmount(),
                singleTrade.getPrice(),
                singleTrade.getProfit())
        );

        // 보유 자산 변동 -> stockId, 보유수량, 평가손익, 수익률, 평균 단가
        ChangedStockResponseDto changedStockResponseDto =
            new ChangedStockResponseDto(
                dto.stockId(),
                currentGame.getStockAmount()[currentGame.getStocks().get(dto.stockId())],
                currentGame.getProfits()[stockIdx],
                averagePrice, //평균단가
                100.0 * currentGame.getProfits()[stockIdx] / currentGame.getStockPurchaseAmount()[stockIdx] // 수익률
            );
        redisTemplate.opsForValue().set("singleGame:" + memberId + ":" + dto.gameIdx(), currentGame);

        long totalProfit = 0;
        for (int i = 0; i < currentGame.getProfits().length; i++) {
            totalProfit += currentGame.getProfits()[i];
        }
        double totalRoi = 100.0 * totalProfit / currentGame.getInitial();
        TotalAssetDto totalAssetDto = new TotalAssetDto(currentGame.getCash(), totalProfit, totalRoi, currentGame.getTotalPurchaseAmount(), currentGame.getTotalAsset());

        // 보유자산
        List<AssetListDto> assetList = new ArrayList<>();
        for (int i = 0; i < currentGame.getFirstDayChartList().size(); i++) {
            AssetListDto assetListDto = new AssetListDto(
                stockChartRepository.findById(currentGame.getFirstDayChartList().get(i)).orElseThrow(
                    () -> new BaseExceptionHandler(ErrorCode.BAD_REQUEST_ERROR)
                ).getStock().getId(),
                currentGame.getStockAmount()[i],
                currentGame.getProfits()[i],
                currentGame.getAveragePrice()[i],
                100.0 * currentGame.getProfits()[i] / currentGame.getStockPurchaseAmount()[i]
            );
            assetList.add(assetListDto);
        }
        // 보유현금, 보유자산 변동, 매매내역
        return new SingleTradeResponseDto(
            currentGame.getCash(),
            changedStockResponseDto,
            TradeType.BUY,
            todayChart.getEndPrice(),
            dto.amount(),
            (int) (todayChart.getEndPrice() * dto.amount() * 0.0015),
            (long) (todayChart.getEndPrice() - averagePrice) * dto.amount()
                - (int) (todayChart.getEndPrice() * dto.amount() * 0.0015),
            totalAssetDto,
            assetList,
            currentGame.getTradeList()
        );
    }

    public NextDayResponseDto getTomorrow(NextDayRequestDto dto, Long memberId) {
        SingleGame currentGame = this.getGame(memberId, dto.gameIdx());

        currentGame.updateDay(dto.day());
        // 종목별 "오늘의 종가, 등락정도, 보유수량, 평가손익, 손익률"를 담아서 리턴. responseDto에 넣어야겠다.
        List<NextDayInfoResponseDto> stockSummaries = new ArrayList<>();

        long totalAsset = currentGame.getCash();
        List<AssetListDto> assetList = new ArrayList<>();

        for (Long firstDayStockChartId : currentGame.getFirstDayChartList()) {
            StockChart todayChart = stockChartRepository.findById(firstDayStockChartId + 299 + dto.day()).orElseThrow();
            StockChart yesterdayChart = stockChartRepository.findById(firstDayStockChartId + 299 + dto.day() - 1).orElseThrow();

            Long startDateChartStockId = todayChart.getStock().getId();
            // 종목별 정보 담아주기
            Integer stockIdx = currentGame.getStocks().get(startDateChartStockId);
            int amount = currentGame.getStockAmount()[stockIdx];
            // 총 자산 가치
            totalAsset += (long) (amount * todayChart.getEndPrice() * 0.9975);

            stockSummaries.add(
                new NextDayInfoResponseDto(
                    todayChart.getStock().getId(), // 종목 Id
                    todayChart.getEndPrice(), // 오늘의 종가
                    todayChart.getEndPrice() - yesterdayChart.getEndPrice(), // 등락정도
                    currentGame.getStockAmount()[stockIdx], // 보유수량
                    (long) currentGame.getStockAmount()[stockIdx] * (todayChart.getEndPrice()
                        - currentGame.getAveragePrice()[stockIdx]), // 평가손익
                    currentGame.getAveragePrice()[stockIdx] == 0 ? 0 :
                        1.0 * ((todayChart.getEndPrice() - currentGame.getAveragePrice()[stockIdx]) * 100)
                            / currentGame.getAveragePrice()[stockIdx]// 손익률
                )
            );
            // 보유 재산의 각
            currentGame.addProfit(stockIdx, currentGame.getStockAmount()[stockIdx] * (todayChart.getEndPrice() - yesterdayChart.getEndPrice()));
            // 보유 자산변동 보여주기
            AssetListDto assetListDto = new AssetListDto(
                stockChartRepository.findById(firstDayStockChartId + 299 + currentGame.getDay()).orElseThrow(
                    () -> new BaseExceptionHandler(ErrorCode.BAD_REQUEST_ERROR)
                ).getStock().getId(),
                currentGame.getStockAmount()[stockIdx],
                currentGame.getProfits()[stockIdx],
                currentGame.getAveragePrice()[stockIdx],
                100.0 * currentGame.getProfits()[stockIdx] / currentGame.getStockPurchaseAmount()[stockIdx]
            );
            assetList.add(assetListDto);

            if (dto.day() == 51) {
                // SingleGameStock 에 저장 - 종목별
                SingleGameStock singleGameStock = singleGameStockRepository.findBySingleGameLog_IdAndStock_Id(currentGame.getSingleGameLogId(), todayChart.getStock().getId())
                    .orElseThrow(() -> new BaseExceptionHandler(ErrorCode.NO_SINGLE_GAME_STOCK));

                Long stockId = todayChart.getStock().getId();
                Integer index = currentGame.getStocks().get(stockId);

                // 현재 저장된것 + 아직 매도 안한거
                singleGameStock.updateAveragePurchasePrice(currentGame.getAveragePrice()[index]);
                singleGameStock.updateProfit(currentGame.getProfits()[index] + currentGame.getStockAmount()[index] * (todayChart.getEndPrice() - currentGame.getAveragePrice()[index]));

                // roi : (총수익) / (총 투자한 돈) * 100
                double roi = currentGame.getStockPurchaseAmount()[index] == 0L ? 0 :
                    (100.0 * (currentGame.getProfits()[index] +
                        currentGame.getStockAmount()[index] * (todayChart.getEndPrice() - currentGame.getAveragePrice()[index]))
                        / currentGame.getStockPurchaseAmount()[index]);
                singleGameStock.updateRoi(roi);


            }
        }
        // 총 profit 계산
        long resultProfit = totalAsset - currentGame.getInitial();
        double resultRoi = 100.0 * (totalAsset - currentGame.getInitial()) / currentGame.getInitial();

        currentGame.updateTotalAsset(totalAsset);
        redisTemplate.opsForValue().set("singleGame:" + memberId + ":" + dto.gameIdx(), currentGame);

        if (dto.day() == 51) {
            // 결과 저장.
            singleGameResultSave(memberId, 1.0 * resultProfit / currentGame.getInitial() * 100, totalAsset);

            LocalDateTime startDate = null, endDate = null;
            List<StockInfoDto> stockInfoDtoList = new ArrayList<>();
            for (int i = 0; i < currentGame.getFirstDayChartList().size(); i++) {
                StockChart startStockChart = stockChartRepository.findById(currentGame.getFirstDayChartList().get(i)).orElseThrow(
                    () -> new BaseExceptionHandler(ErrorCode.BAD_REQUEST_ERROR)
                );
                if (i == 0) {
                    // 한번만 실행 -> 날짜 받아오기
                    startDate = startStockChart.getDate();
                    endDate = stockChartRepository.findById(startStockChart.getId() + 349).orElseThrow(
                        () -> new BaseExceptionHandler(ErrorCode.NO_SINGLE_GAME_STOCK)
                    ).getDate();
                }
                stockInfoDtoList.add(new StockInfoDto(startStockChart.getStock().getId(), startStockChart.getStock().getStockName()));
            }
            Member member = memberRepository.findById(memberId)
                .orElseThrow(() -> new BaseExceptionHandler(ErrorCode.NOT_FOUND_USER));
            // 게임 로그 저장하기
            SingleGameResultDto singleGameResultDto = new SingleGameResultDto(
                stockInfoDtoList,
                startDate,
                endDate,
                currentGame.getInitial(),
                currentGame.getTotalAsset(),
                currentGame.getTotalAsset() - currentGame.getInitial(),
                100.0 * (currentGame.getTotalAsset() - currentGame.getInitial()) / currentGame.getInitial(),
                member.getSingleGameChance()
            );

            SingleGameLog singleGameLog = singleGameLogRepository.findById(currentGame.getSingleGameLogId()).orElseThrow(
                () -> new BaseExceptionHandler(ErrorCode.NO_SINGLE_GAME_LOG)
            );
            singleGameLog.updateFinalProfit(resultProfit);
            singleGameLog.updateFinalRoi(1.0 * resultProfit / currentGame.getInitial() * 100);

            // 레디스에서 삭제해주기
            redisTemplate.delete("singleGame:" + memberId + ":" + dto.gameIdx());

            return new NextDayResponseDto(stockSummaries, currentGame.getCash(), resultProfit, resultRoi, currentGame.getTotalPurchaseAmount(),
                totalAsset, assetList, singleGameResultDto);
        }
        return new NextDayResponseDto(stockSummaries, currentGame.getCash(), resultProfit, resultRoi, currentGame.getTotalPurchaseAmount(),
            totalAsset, assetList,  null);
    }

    private void singleGameResultSave(Long memberId, double avgRoi, long totalAsset) {
        Member me = memberRepository.findById(memberId)
            .orElseThrow(() -> new BaseExceptionHandler(ErrorCode.NOT_FOUND_USER));

        // 평균 수익률 바꾸기
        me.updateSingleAvgRoi((me.getSingleAvgRoi() + avgRoi) / (me.getWin() + me.getLose() + 1));

        // 승수 쌓기
        if (avgRoi > 0) {
            me.increaseWin();
        } else if (avgRoi < 0) {
            me.increaseLose();
        }
        me.updateAsset(totalAsset);
    }

    // 시작날짜, 끝 날짜 사이의 랜덤한 날을 가져온다.
    public static LocalDateTime generateRandomDateTime(LocalDateTime start, LocalDateTime end) {
        long startEpochDay = start.toLocalDate().toEpochDay();
        long endEpochDay = end.toLocalDate().toEpochDay();
        long randomDay = ThreadLocalRandom.current().nextLong(startEpochDay, endEpochDay + 1);

        LocalDate randomLocalDate = LocalDate.ofEpochDay(randomDay);
        LocalTime randomLocalTime = LocalTime.ofSecondOfDay(ThreadLocalRandom.current().nextLong(0, 24 * 60 * 60));
        return LocalDateTime.of(randomLocalDate, randomLocalTime);
    }

    public SingleGame getGame(long memberId, long gameIdx) {
        try {
            String jsonStr = objectMapper.writeValueAsString(redisTemplate.opsForValue().get("singleGame:" + memberId + ":" + gameIdx));
            return objectMapper.readValue(jsonStr, SingleGame.class);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }


    public void startRechargeTimer(Member member) {
        if (!timers.containsKey(member.getId())) {
            ScheduledExecutorService scheduler = Executors.newScheduledThreadPool(1);
            ScheduledFuture<?> future = scheduler.scheduleAtFixedRate(() -> {
                log.info("timer 작동 - 남은 횟수: {} ", member.getSingleGameChance());
                member.increaseChance();
                memberRepository.save(member);
                if (member.getSingleGameChance() >= MAX_CHANCES) {
                    scheduler.shutdown();
                    timers.remove(member.getId());
                }
            }, RECHARGE_TIME, RECHARGE_TIME, TimeUnit.MILLISECONDS);

            timers.put(member.getId(), future);
        }
    }

    public SingleGameLogResponseDto getSingleGameLog(Long singleGameLogId) {
        List<SingleGameStock> singleGameStocks = singleGameStockRepository.findAllBySingleGameLog_Id(singleGameLogId).orElseThrow(
                () -> new BaseExceptionHandler(ErrorCode.NO_SINGLE_GAME_STOCK));

        List<StockInfoDto> stockInfoDtoList = new ArrayList<>();
        List<StockChartDataDto> stockChartDataList = new ArrayList<>();
        List<SingleLogRankMemberListDto> rankMemberList = new ArrayList<>();
        List<SingleLogTradeListDto> tradeList = new ArrayList<>();
        for(SingleGameStock singleGameStock: singleGameStocks){
            //1. 종목 정보 넣기(10개)
            log.info("singleGameStock.getId():"+singleGameStock.getId());
            log.info("singleGameStock.getId():"+singleGameStock.getSingleGameLog().getId());
            log.info("singleGameStock.getStock().getId():"+singleGameStock.getStock().getId());
            log.info("singleGameStock.getStock().getStockName():"+singleGameStock.getStock().getStockName());
            StockInfoDto stockInfoDto = new StockInfoDto(
                    singleGameStock.getStock().getId(),
                    singleGameStock.getStock().getStockName()
            );
            stockInfoDtoList.add(stockInfoDto);

            //2. 종목 별 차트 350개 넣기
            //어떤 종목의 시작일 하나에 대한 StockChart 값 얻기
            log.info("singleGameStock.getStock().getStockCode()"+singleGameStock.getStock().getStockCode());
            log.info("getStockCode(),singleGameStock.getSingleGameLog().getStartDate()"+ singleGameStock.getSingleGameLog().getStartDate().withHour(0).withMinute(0).withSecond(0));

            LocalDateTime startDateTime = singleGameStock.getSingleGameLog().getStartDate().withHour(0).withMinute(0).withSecond(0);
            StockChart stockChart = stockChartRepository.findByStock_StockCodeAndDateBetween(singleGameStock.getStock().getStockCode(),startDateTime,startDateTime.plusDays(1)).orElseThrow(
                    () -> new BaseExceptionHandler(ErrorCode.NO_SINGLE_LOG_STOCK_CHART)
            );
            log.info("-----stockChart.getId()"+stockChart.getId());
            // 350일치 차트
            List<StockChart> stockChartList = stockChartRepository.findByIdBetween(stockChart.getId(), stockChart.getId() + 349);
            // 각 날짜에 대해 StockChartDto 생성 후 넣어주기
            List<StockChartDto> stockChartDtoList = new ArrayList<>();
            // 350번 가져온다.
            stockChartList.forEach((stockChart1) -> {
                StockChartDto stockChartDto = new StockChartDto(
                        stockChart1.getMarketPrice(),
                        stockChart1.getHighPrice(),
                        stockChart1.getLowPrice(),
                        stockChart1.getEndPrice(),
                        stockChart1.getTradingVolume(),
                        stockChart1.getDate()
                );

                stockChartDtoList.add(stockChartDto);
            });
            StockChartDataDto stockChartDataDto = new StockChartDataDto(stockChart.getStock().getId(), stockChartDtoList);
            stockChartDataList.add(stockChartDataDto);

            //3.종목별 상위 3위 유저
            List<SingleGameStock> singleGameStocks1 = singleGameStockRepository.findTop3ByStock_IdOrderByRoiDesc(singleGameStock.getStock().getId()).orElseThrow(
                    () -> new BaseExceptionHandler(ErrorCode.NO_SINGLE_GAME_STOCK));
            List<SingleLogRankMemberDto> rankMemberDtoList = singleGameStocks1.stream().filter(
                    singleGameStock1 -> singleGameStock1.getRoi() > 0
            ).map(
                    singleGameStock1 -> {
                        Member member = singleGameStock1.getSingleGameLog().getMember();
                        return new SingleLogRankMemberDto(
                                member.getId(),
                                member.getNickname(),
                                singleGameStock1.getId(),
                                singleGameStock1.getRoi()
                        );
                    }
            ).toList();
            rankMemberList.add( new SingleLogRankMemberListDto(
                    stockChart.getStock().getId(),
                    rankMemberDtoList

            ));

            //4.매매 내역
            List<SingleTrade> singleTradeList = singleTradeRepository.findAllBySingleGameStock_Id(singleGameStock.getId());
            List<SingleLogTradeDto> singleLogTradeDtoList = singleTradeList.stream().map(
                    singleTrade -> new SingleLogTradeDto(
                            singleTrade.getDate(),
                            singleTrade.getTradeType(),
                            singleTrade.getAmount(),
                            singleTrade.getPrice(),
                            singleTrade.getProfit()
                    )
            ).toList();

            tradeList.add(new SingleLogTradeListDto(
                    stockChart.getStock().getId(),
                    singleLogTradeDtoList
                    ));

        }

        return new SingleGameLogResponseDto(
                stockInfoDtoList,
                stockChartDataList,
                tradeList,
                rankMemberList

        );


    }


    public SingleLogRankMemberLogDto getSingleGameRankMemberLog(Long singelGameStockId, Long memberId) {
        SingleGameStock singleGameStock = singleGameStockRepository.findById(singelGameStockId).orElseThrow(
                () -> new BaseExceptionHandler(ErrorCode.NO_SINGLE_GAME_STOCK));


        //1. 종목 별 차트 350개 넣기
        //어떤 종목의 시작일 하나에 대한 StockChart 값 얻기
        log.info("[getSingleGameRankMemberLog] singleGameStock.getStock().getStockCode()"+singleGameStock.getStock().getStockCode());
        log.info("[getSingleGameRankMemberLog] getStockCode(),singleGameStock.getSingleGameLog().getStartDate()"+ singleGameStock.getSingleGameLog().getStartDate().withHour(0).withMinute(0).withSecond(0));

        LocalDateTime startDateTime = singleGameStock.getSingleGameLog().getStartDate().withHour(0).withMinute(0).withSecond(0);
        StockChart stockChart = stockChartRepository.findByStock_StockCodeAndDateBetween(singleGameStock.getStock().getStockCode(),startDateTime,startDateTime.plusDays(1)).orElseThrow(
                () -> new BaseExceptionHandler(ErrorCode.NO_SINGLE_LOG_STOCK_CHART)
        );
        log.info("[getSingleGameRankMemberLog] -----stockChart.getId()"+stockChart.getId());
        // 350일치 차트
        List<StockChart> stockChartList = stockChartRepository.findByIdBetween(stockChart.getId(), stockChart.getId() + 349);
        // 각 날짜에 대해 StockChartDto 생성 후 넣어주기
        List<StockChartDto> stockChartDtoList = new ArrayList<>();
        // 350번 가져온다.
        stockChartList.forEach((stockChart1) -> {
            StockChartDto stockChartDto = new StockChartDto(
                    stockChart1.getMarketPrice(),
                    stockChart1.getHighPrice(),
                    stockChart1.getLowPrice(),
                    stockChart1.getEndPrice(),
                    stockChart1.getTradingVolume(),
                    stockChart1.getDate()
            );

            stockChartDtoList.add(stockChartDto);
        });

        //2. 매매 내역 넣기
        List<SingleTrade> singleTradeList = singleTradeRepository.findAllBySingleGameStock_Id(singleGameStock.getId());
        List<SingleLogTradeDto> tradeList = singleTradeList.stream().map(
                singleTrade -> new SingleLogTradeDto(
                        singleTrade.getDate(),
                        singleTrade.getTradeType(),
                        singleTrade.getAmount(),
                        singleTrade.getPrice(),
                        singleTrade.getProfit()
                )
        ).toList();

        return new SingleLogRankMemberLogDto(
                stockChartDtoList,
                tradeList
        );
    }
}
