package com.backend.api.domain.single.service;

import com.backend.api.domain.member.entity.Member;
import com.backend.api.domain.member.repository.MemberRepository;
import com.backend.api.domain.single.dto.request.NextDayRequestDto;
import com.backend.api.domain.single.dto.request.SingleTradeRequestDto;
import com.backend.api.domain.single.dto.response.ChangedStockResponseDto;
import com.backend.api.domain.single.dto.response.NextDayInfoResponseDto;
import com.backend.api.domain.single.dto.response.NextDayResponseDto;
import com.backend.api.domain.single.dto.response.SingleGameCreateResponseDto;
import com.backend.api.domain.single.dto.response.SingleGameResultDto;
import com.backend.api.domain.single.dto.response.SingleTradeResponseDto;
import com.backend.api.domain.single.dto.response.StockChartDataDto;
import com.backend.api.domain.single.dto.response.StockChartDto;
import com.backend.api.domain.single.dto.response.StockInfoDto;
import com.backend.api.domain.single.entity.SingleGame;
import com.backend.api.domain.single.entity.SingleGameLog;
import com.backend.api.domain.single.entity.SingleGameStock;
import com.backend.api.domain.single.entity.SingleTrade;
import com.backend.api.domain.single.repository.SingleGameLogRepository;
import com.backend.api.domain.single.repository.SingleGameStockRepository;
import com.backend.api.domain.single.repository.SingleTradeRepository;
import com.backend.api.domain.stock.entity.StockChart;
import com.backend.api.domain.stock.repository.StockChartRepository;
import com.backend.api.domain.type.TradeType;
import com.backend.api.global.common.code.ErrorCode;
import com.backend.api.global.exception.BaseExceptionHandler;
import jakarta.servlet.http.HttpSession;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Timer;
import java.util.TimerTask;
import java.util.UUID;
import java.util.concurrent.ThreadLocalRandom;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
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
    private final HttpSession httpSession;
    private long[] startDateId;
    private HashMap<Long, Integer> stocks;
    private static final int MAX_CHANCES = 5;
    private static final long RECHARGE_TIME = 5 * 1000;
    private final Map<Long, Timer> timers = new HashMap<>();
    /*
    // 그 사람이 갖고 있는지를 확인해야해요.
    // 프론트쪽에서 보유 수량정보는 계속 들고있는게 어떨까?
    // -> 게임 내의 매수/매도에서 모두 DB에 접근하는 것이 아니라, 별도 게임 서버에서 객체를 관리하고 결과를 뱉어준다.
     */

    public SingleGameCreateResponseDto createGame() {
        /*
        //TODO: 하드코딩 & Member currentMember = memberRepository.findById(@AuthenticationPrincipal ... );
         */

        // 도전 기회가 있는지 확인한다.
        Member me = memberRepository.findById(1L).get(); //TODO : 바꿔야함
        if(me.getSingleGameChance() <= 0){
            throw new BaseExceptionHandler(ErrorCode.NOT_ENOUGH_CHANCE);
        }
        me.decreaseChance();

        // 정해진 시간마다 기회 충전된다.
        if (!timers.containsKey(me.getId())) {
            startRechargeTimer(me);
        }


        stocks = new HashMap<>(); // key : stockId, value : idx
        for (int i = 0; i < 9; i++) {
            stocks.put((long) (i + 1), i); //TODO: 랜덤으로 바꿀것
        }

        httpSession.setAttribute("singleGame",
            new SingleGame(
            UUID.randomUUID().toString(),
            stocks,
            new int[10],
            me.getAsset(),
            me.getAsset()
        ));

        // 1. 랜덤한 날짜로 간다 -> 350번의 날 이전.
        // 선택한 날짜에 데이터가 있다 -> 350개는 있을거야
        LocalDateTime lastDate = stockChartRepository.findById(350L).get().getDate();
        LocalDateTime startDate = LocalDateTime.of(2001, 3, 22, 0, 0);

        LocalDate randomDate = between(LocalDate.from(startDate), LocalDate.from(lastDate));

        //TODO : 해당 날짜의 데이터가 있는 종목만 10개 고르기 + 350 거래일 전에 상폐는 되지 않았는지

        // 2. 해당 날의 데이터가 없으면 더 전으로
        while (stockChartRepository.findByDate(randomDate).isEmpty()) {
            randomDate = randomDate.minusDays(1);
        }

        // SingleGameLog 만들기
        SingleGameLog singleGameLog
            = SingleGameLog.builder()
            .member(memberRepository.findById(1L).orElseThrow())
            .startDate(randomDate.atStartOfDay())
            .initialAsset(10000000L)
            .finalProfit(0L)
            .finalRoi(0D)
            .build();

        Long gameLogId = singleGameLogRepository.save(singleGameLog).getId();

        List<StockChartDataDto> stockChartDataList = new ArrayList<>();

        // 시작일의 stockChart가져옴. 있는것만 들고온다.
        List<StockChart> startDateStockCharts = stockChartRepository.findByDate(randomDate);
        // 시작일 데이터
        startDateId = new long[10];
        for (int i = 0; i < startDateStockCharts.size(); i++) {
            startDateId[i] = startDateStockCharts.get(i).getId();
        }

        // TODO :  있어야한다. -> 10개 채우는 로직 추가
        for (long stockIdx = 0; stockIdx < startDateStockCharts.size(); stockIdx++) {

            // 3. 첫 날의 ID값을 받는다.
            StockChart startChart = startDateStockCharts.get((int) stockIdx);
            // SingleGameStock 만들어서 저장.
            SingleGameStock singleGameStock = SingleGameStock.builder()
                .singleGameLog(singleGameLog)
                .stock(startChart.getStock())
                .roi(0D)
                .profit(0)
                .averagePurchasePrice(0)
                .build();
            singleGameStockRepository.save(singleGameStock);

            // 각 날짜에 대해 StockChartDto 생성 후 넣어주기
            List<StockChartDto> stockChartDtoList = new ArrayList<>();
            // 4. 350번 가져온다.
            List<StockChart> stockChartList = stockChartRepository.findByIdBetween(startChart.getId(), startChart.getId() + 349);
            if(stockChartList.size() < 350) break; // 350일이 채워지지 않는다면 break;

            stockChartList.forEach((stockChart) -> {
                StockChartDto stockChartDto = new StockChartDto(

                    stockChart.getMarketPrice(),
                    stockChart.getHighPrice(),
                    stockChart.getLowPrice(),
                    stockChart.getEndPrice(),
                    stockChart.getDate()
                );
                stockChartDtoList.add(stockChartDto);
            });
            StockChartDataDto stockChartDataDto = new StockChartDataDto(singleGameStock.getStock().getId(), stockChartDtoList);
            stockChartDataList.add(stockChartDataDto);
        }

        return new SingleGameCreateResponseDto(gameLogId, me.getSingleGameChance(), stockChartDataList);
    }

    public SingleTradeResponseDto sell(SingleTradeRequestDto dto) {
        //TODO: memberId -> @AuthenticationPrincipal
        SingleGameStock singleGameStock = singleGameStockRepository.findBySingleGameLog_IdAndStock_Id(dto.gameLogId(), dto.stockId())
            .orElseThrow(() -> new BaseExceptionHandler(ErrorCode.NO_SINGLE_GAME_STOCK));

        // 세션에 저장된 게임을 가져온다.
        SingleGame currentGame = this.getGame();
        Integer stockIdx = currentGame.getStocks().get(dto.stockId()); // Map으로 저장한 stockId에 대한 index값을 가져온다.

        // 차트에서 오늘 날짜의 종가를 가져온다.
        StockChart stockChart = stockChartRepository.findById(startDateId[stockIdx] +  dto.day()).orElseThrow();

        // 현재 수량보다 많으면 에러.
        if (dto.amount() > currentGame.getStockAmount()[stockIdx]) {
            throw new BaseExceptionHandler(ErrorCode.NOT_ENOUGH_STOCK_AMOUNT);
        }

        // roi 계산
        long totalAsset = currentGame.getCash();
        for (Long stockId : currentGame.getStocks().keySet()) {
            StockChart todayStockChart = stockChartRepository.findById(startDateId[stockIdx] +  dto.day()).orElseThrow();

            int amount = currentGame.getStockAmount()[currentGame.getStocks().get(stockId)]; // 해당 Stock의 보유량 가져오기

            totalAsset += (long) amount * todayStockChart.getEndPrice(); // 총 자산 계산
        }
        double resultRoi = 1.0 * totalAsset / currentGame.getInitial() * 100;

        // profit 계산
        long resultProfit = totalAsset - currentGame.getInitial();

        // 팔았으니 currentGame 바꿔주기
        currentGame.getStockAmount()[stockIdx] -= dto.amount();
        currentGame.setCash(currentGame.getCash() + (long) dto.amount() * stockChart.getEndPrice());

        SingleTrade singleTrade = SingleTrade.builder()
            .singleGameStock(singleGameStock)
            .date(stockChart.getDate())
            .tradeType(TradeType.SELL)
            .amount(dto.amount())
            .price(stockChart.getEndPrice()) // 현재가격.
            .stockQuantity(currentGame.getStockAmount()[(int)dto.stockId()] - dto.amount())
            .roi(Double.parseDouble(String.format("%.2f", resultRoi)))
            .profit(resultProfit)
            .build();
        singleTradeRepository.save(singleTrade);

        // 변동있는 주식
        // 보유 자산 변동 -> stockId, 보유수량, 평가손익, 수익률, 평균 단가
        ChangedStockResponseDto changedStockResponseDto =
            new ChangedStockResponseDto(
                dto.stockId(),
                currentGame.getStockAmount()[currentGame.getStocks().get(dto.stockId())],
                (long)currentGame.getStockAmount()[stockIdx] * (stockChart.getEndPrice() - singleGameStock.getAveragePurchasePrice()), //평가손익
                singleGameStock.getAveragePurchasePrice(), //평균단가
                1.0 * (stockChart.getEndPrice() - singleGameStock.getAveragePurchasePrice()) / singleGameStock.getAveragePurchasePrice()// 수익률
            );

        // 보유현금, 보유자산 변동, 매매내역
        return new SingleTradeResponseDto(
            currentGame.getCash(),
            changedStockResponseDto,
            TradeType.SELL,
            stockChart.getEndPrice(),
            dto.amount(),
            (int) (stockChart.getEndPrice() * dto.amount() * 0.025),
            (long) (stockChart.getEndPrice() - singleGameStock.getAveragePurchasePrice()) * dto.amount() - (int) (stockChart.getEndPrice() * dto.amount() * 0.025)
        );
    }

    public SingleTradeResponseDto buy(SingleTradeRequestDto dto) {
        //TODO: memberId -> @AuthenticationPrincipal // SingleGameLog는 어디서 가져오지?
        //
        SingleGameStock singleGameStock = singleGameStockRepository.findBySingleGameLog_IdAndStock_Id(dto.gameLogId(), dto.stockId())
            .orElseThrow(() -> new BaseExceptionHandler(ErrorCode.NO_SINGLE_GAME_STOCK));

        // 쓰레드에 저장된 게임 가져옴.
        SingleGame currentGame = this.getGame();

        Integer stockIdx = currentGame.getStocks().get(dto.stockId());

        // 차트에서 오늘 날짜의 종가를 가져온다.
        StockChart stockChart = stockChartRepository.findById(startDateId[stockIdx] +  dto.day()).orElseThrow();

        // 현재 가진 돈보다 더 많이 요구한다면
        if ((long) dto.amount() * stockChart.getEndPrice() > currentGame.getCash()) {
            throw new BaseExceptionHandler(ErrorCode.NOT_ENOUGH_MONEY);
        }

        // roi 계산
        long totalAsset = currentGame.getCash();
        for (Long stockId : currentGame.getStocks().keySet()) {
            StockChart todayStockChart = stockChartRepository.findById(startDateId[stockIdx] +  dto.day()).orElseThrow();

            int amount = currentGame.getStockAmount()[currentGame.getStocks().get(stockId)]; // 해당 Stock의 보유량 가져오기

            totalAsset += (long)amount * todayStockChart.getEndPrice(); // 총 자산 계산
        }
        double resultRoi = 1.0 * totalAsset / currentGame.getInitial() * 100;

        // 총 profit 계산
        long resultProfit = totalAsset - currentGame.getInitial();

        // 평균단가 계산 => (평균단가 * 수량 + 이번에 사는데 쓴 돈) / (원래수량 + 이번에 사는 수량)
        int averagePrice = (singleGameStock.getAveragePurchasePrice() * currentGame.getStockAmount()[stockIdx] + dto.amount() * stockChart.getEndPrice())/(currentGame.getStockAmount()[stockIdx] + dto.amount());
        singleGameStock.setAveragePurchasePrice(averagePrice);
        // 샀으니 game 바꿔주기
        currentGame.getStockAmount()[stockIdx] += dto.amount();
        currentGame.setCash(currentGame.getCash() - (long) dto.amount() * stockChart.getEndPrice());

        SingleTrade singleTrade = SingleTrade.builder()
            .singleGameStock(singleGameStock)
            .date(stockChart.getDate())
            .tradeType(TradeType.BUY)
            .amount(dto.amount())
            .price(stockChart.getEndPrice()) // 현재가격.
            .stockQuantity(currentGame.getStockAmount()[(int) dto.stockId()] + dto.amount())
            .roi(Double.parseDouble(String.format("%.2f", resultRoi)))
            .profit(resultProfit)
            .build();
        singleTradeRepository.save(singleTrade);

        // 보유 자산 변동 -> stockId, 보유수량, 평가손익, 수익률, 평균 단가
        ChangedStockResponseDto changedStockResponseDto =
            new ChangedStockResponseDto(
                dto.stockId(),
                currentGame.getStockAmount()[currentGame.getStocks().get(dto.stockId())],
                (long) currentGame.getStockAmount()[stockIdx] * (stockChart.getEndPrice() - singleGameStock.getAveragePurchasePrice()), //평가손익
                singleGameStock.getAveragePurchasePrice(), //평균단가
                1.0 * (stockChart.getEndPrice() - singleGameStock.getAveragePurchasePrice()) / singleGameStock.getAveragePurchasePrice()// 수익률
            );

        // 보유현금, 보유자산 변동, 매매내역
        return new SingleTradeResponseDto(
            currentGame.getCash(),
            changedStockResponseDto,
            TradeType.BUY,
            stockChart.getEndPrice(),
            dto.amount(),
            (int) (stockChart.getEndPrice() * dto.amount() * 0.0015),
            (long) (stockChart.getEndPrice() - singleGameStock.getAveragePurchasePrice()) * dto.amount() - (int) (stockChart.getEndPrice() * dto.amount() * 0.025)
        );
    }

    public NextDayResponseDto getTomorrow(NextDayRequestDto dto){
        // 하루 뒤의 데이터를 기반으로 시장 정보 갱신.
        // 1. 종목별 가격.
        // 2. 보유 현금, 총 평가 손익, 총 매입 금액, 총 평가금액
        // 3. 보유자산 -> 종목별 숫자, 평가손익, 손익률 변화 있어야함.
        // TODO : think - 다음날 호출 할때마다 일봉보내주는건 어떤지

        SingleGame currentGame = this.getGame();
        // 종목별 "오늘의 종가, 등락정도, 보유수량, 평가손익, 손익률"를 담아서 리턴. responseDto에 넣어야겠다.
        List<NextDayInfoResponseDto> stockSummaries = new ArrayList<>();
        int totalPurchaseAmount = 0;
        long totalAsset = currentGame.getCash();

        for (long stockId = 1; stockId <= 3; stockId++) { //TODO: stockIdx   바꿔주기!
            Integer idx = stocks.get(stockId);
            StockChart todayChart = stockChartRepository.findById(startDateId[idx] + dto.day()).orElseThrow();
            StockChart yesterdayChart = stockChartRepository.findById(startDateId[idx] + dto.day() - 1).orElseThrow();
            SingleGameStock singleGameStock = singleGameStockRepository.findBySingleGameLog_IdAndStock_Id(dto.gameLogId(), stockId)
                .orElseThrow(() -> new BaseExceptionHandler(ErrorCode.NO_SINGLE_GAME_STOCK));

            int amount = currentGame.getStockAmount()[currentGame.getStocks().get(stockId)];
            // 총 자산 가치
            totalAsset += (long) amount * todayChart.getEndPrice();
            // 총 매입금액
            totalPurchaseAmount += currentGame.getStockAmount()[currentGame.getStocks().get(stockId)] * singleGameStock.getAveragePurchasePrice();

            // 종목별 정보 담아주기
            Integer stockIdx = currentGame.getStocks().get(stockId);
            stockSummaries.add(
                new NextDayInfoResponseDto(
                    stockId, // 종목 Id
                    todayChart.getEndPrice(), // 오늘의 종가
                    todayChart.getEndPrice() - yesterdayChart.getEndPrice(), // 등락정도
                    currentGame.getStockAmount()[stockIdx], // 보유수량
                    (long) currentGame.getStockAmount()[stockIdx] * (todayChart.getEndPrice() - singleGameStock.getAveragePurchasePrice()), // 평가손익
                    singleGameStock.getAveragePurchasePrice() == 0?0: 1.0 * ((todayChart.getEndPrice() - singleGameStock.getAveragePurchasePrice()) * 100) / singleGameStock.getAveragePurchasePrice()// 손익률
                )
            );
        }
        // 총 profit 계산
        long resultProfit = totalAsset - currentGame.getInitial();

        if (dto.day() == 50) {
            // 결과 저장.
            singleGameResultSave(1.0 * resultProfit / currentGame.getInitial(), totalAsset);

            LocalDateTime startDate = null, endDate = null;
            List<StockInfoDto> stockInfoDtoList = new ArrayList<>();
            for (int i = 0; i < startDateId.length; i++) {
                if(startDateId[i] == 0) continue;
                StockChart end = stockChartRepository.findById(startDateId[i]).orElseThrow();
                if (i == 0) {
                    // 한번만 실행 -> 날짜 받아오기
                    startDate = stockChartRepository.findById(startDateId[i] + 349).orElseThrow().getDate();
                    endDate = end.getDate();
                }
                stockInfoDtoList.add(new StockInfoDto(end.getStock().getId(), end.getStock().getStockName()));
            }
            SingleGameResultDto singleGameResultDto = new SingleGameResultDto(stockInfoDtoList, startDate, endDate);
            return new NextDayResponseDto(stockSummaries, currentGame.getCash(), resultProfit, totalPurchaseAmount, totalAsset, singleGameResultDto);
        }
        return new NextDayResponseDto(stockSummaries, currentGame.getCash(), resultProfit, totalPurchaseAmount, totalAsset, null);
    }

    private void singleGameResultSave(double avgRoi, long totalAsset) {
        Member me = memberRepository.findById(1L).get(); // TODO: "나" 로 바꾸기!

        // 평균 수익률 바꾸기
        me.updateSingleAvgRoi((me.getSingleAvgRoi() + avgRoi) / (me.getWin() + me.getLose() + 1));

        // 승수 쌓기
        if( avgRoi > 0 ){
            me.increaseWin();
        } else if (avgRoi < 0) {
            me.increaseLose();
        }
        me.updateAsset(totalAsset);
    }

    // 시작날짜, 끝 날짜 사이의 랜덤한 날을 가져온다.
    public static LocalDate between(LocalDate startInclusive, LocalDate endExclusive) {
        long startEpochDay = startInclusive.toEpochDay();
        long endEpochDay = endExclusive.toEpochDay();
        long randomDay = ThreadLocalRandom
            .current()
            .nextLong(startEpochDay, endEpochDay);

        return LocalDate.ofEpochDay(randomDay);
    }

    public SingleGame getGame() {
        // 현재 사용자의 세션에서 게임 상태를 가져옴
        return (SingleGame) httpSession.getAttribute("singleGame");
    }
    private void startRechargeTimer(Member member) {
        Timer timer = new Timer();
        timer.scheduleAtFixedRate(new TimerTask() {

            @Override
            public void run() {
                member.increaseChance();
                memberRepository.save(member);
                // 타이머를 중지하고 제거한다.
                if (member.getSingleGameChance() == MAX_CHANCES) {
                    timer.cancel();
                    timers.remove(member.getId());
                }
            }
        }, RECHARGE_TIME, RECHARGE_TIME);
    }

}
