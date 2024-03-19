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
import com.backend.api.global.common.code.ErrorCode;
import com.backend.api.global.common.type.TradeType;
import com.backend.api.global.exception.BaseExceptionHandler;
import jakarta.servlet.http.HttpSession;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.UUID;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.ScheduledFuture;
import java.util.concurrent.ThreadLocalRandom;
import java.util.concurrent.TimeUnit;
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
	private ConcurrentHashMap<Long, Integer> stocks;
	private List<StockChart> list;
	private static final int MAX_CHANCES = 5;
	private static final long RECHARGE_TIME = 10 * 60 * 1000; // 10분
	private final Map<Long, ScheduledFuture<?>> timers = new ConcurrentHashMap<>();
	public SingleGameCreateResponseDto createGame() {
		// TODO: @AuthenticationPrincipal UserDetails userDetails
		// 도전 기회가 있는지 확인한다.
		Member me = memberRepository.findById(1L).get(); //TODO : 바꿔야함
		if (me.getSingleGameChance() <= 0) {
			throw new BaseExceptionHandler(ErrorCode.NOT_ENOUGH_CHANCE);
		}
		me.decreaseChance();

		// 정해진 시간마다 기회 충전된다.
		if (!timers.containsKey(me.getId())) {
			startRechargeTimer(me);
		}

		LocalDateTime lastDate = LocalDateTime.of(2024, 3, 10, 0, 0); // 위험할수도
		LocalDateTime startDate = LocalDateTime.of(1996, 5, 10, 0, 0);

		LocalDateTime randomDateTime = generateRandomDateTime(startDate, lastDate); // 이 날짜로 조회

		// 10개의 Stock을 정한다. <StockId, idx>
		stocks = new ConcurrentHashMap<>(); // key : stockId, value : idx

		// 각
		list = new ArrayList<>();

		// 10개 안채워지면 반복해야함.
		while(stocks.size() < 10){
			List<String> stockIds = stockChartRepository.findDistinctStockCodeByDateBetween(randomDateTime, randomDateTime.plusDays(1));
			if(stockIds.isEmpty()){
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
                    continue;
                }

				// 350일간의 차트가 있으면 추가.
                stocks.put(stockChart.getStock().getId(), stocks.size());
				list.add(stockChart);
            }
		}

		httpSession.setAttribute("singleGame",
			new SingleGame(
				UUID.randomUUID().toString(),
				stocks,
				new int[10],
				me.getAsset(),
				me.getAsset()
			));

		List<StockChartDataDto> stockChartDataList = new ArrayList<>();

		Long gameLogId = null;
		SingleGameLog singleGameLog
			= SingleGameLog.builder()
			.member(memberRepository.findById(1L).orElseThrow())
			.startDate(randomDateTime)
			.initialAsset(10000000L)
			.finalProfit(0L)
			.finalRoi(0D)
			.build();
		gameLogId = singleGameLogRepository.save(singleGameLog).getId();

		int cnt = 0;
		for(long stockId : stocks.keySet()){
			StockChart stockChart = list.get(cnt++);

			// 350일치 차트
			List<StockChart> stockChartList = stockChartRepository.findByIdBetween(stockChart.getId(), stockChart.getId() + 349);

			// SingleGameStock 만들어서 저장.
			SingleGameStock singleGameStock = SingleGameStock.builder()
				.singleGameLog(singleGameLog)
				.stock(stockChart.getStock())
				.roi(0D)
				.profit(0)
				.averagePurchasePrice(0)
				.build();
			singleGameStockRepository.save(singleGameStock);
			// 각 날짜에 대해 StockChartDto 생성 후 넣어주기
			List<StockChartDto> stockChartDtoList = new ArrayList<>();
			// 4. 350번 가져온다.
			stockChartList.forEach((stockChart1) -> {
				StockChartDto stockChartDto = new StockChartDto(

					stockChart1.getMarketPrice(),
					stockChart1.getHighPrice(),
					stockChart1.getLowPrice(),
					stockChart1.getEndPrice(),
					stockChart1.getDate()
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
		StockChart firstDayChart = list.get(stockIdx);
		StockChart todayChart = stockChartRepository.findById(firstDayChart.getId() + dto.day()).orElseThrow(
			() -> new BaseExceptionHandler(ErrorCode.NO_SINGLE_GAME_STOCK)
		);;

		// 현재 수량보다 많으면 에러.
		if (dto.amount() > currentGame.getStockAmount()[stockIdx]) {
			throw new BaseExceptionHandler(ErrorCode.NOT_ENOUGH_STOCK_AMOUNT);
		}

		// roi 계산
		long totalAsset = currentGame.getCash();
		for (Long stockId : currentGame.getStocks().keySet()) {
			StockChart todayStockChart = stockChartRepository.findById(stockId + dto.day()).orElseThrow(
				() -> new BaseExceptionHandler(ErrorCode.NO_SINGLE_GAME_STOCK)
			);

			int amount = currentGame.getStockAmount()[currentGame.getStocks().get(stockId)]; // 해당 Stock의 보유량 가져오기

			totalAsset += (long)amount * todayStockChart.getEndPrice(); // 총 자산 계산
		}
		double resultRoi = 1.0 * totalAsset / currentGame.getInitial() * 100;

		// profit 계산
		long resultProfit = totalAsset - currentGame.getInitial();

		// 팔았으니 currentGame 바꿔주기
		currentGame.getStockAmount()[stockIdx] -= dto.amount();
		currentGame.setCash(currentGame.getCash() + (long) (dto.amount() * todayChart.getEndPrice() * 0.975));

		SingleTrade singleTrade = SingleTrade.builder()
			.singleGameStock(singleGameStock)
			.date(todayChart.getDate())
			.tradeType(TradeType.SELL)
			.amount(dto.amount())
			.price(todayChart.getEndPrice()) // 현재가격.
			.stockQuantity(currentGame.getStockAmount()[stockIdx] - dto.amount())
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
				(long)currentGame.getStockAmount()[stockIdx] * (todayChart.getEndPrice()
					- singleGameStock.getAveragePurchasePrice()), //평가손익
				singleGameStock.getAveragePurchasePrice(), //평균단가
				100.0 * (todayChart.getEndPrice() - singleGameStock.getAveragePurchasePrice())
					/ singleGameStock.getAveragePurchasePrice()// 수익률
			);

		// 보유현금, 보유자산 변동, 매매내역
		return new SingleTradeResponseDto(
			currentGame.getCash(),
			changedStockResponseDto,
			TradeType.SELL,
			todayChart.getEndPrice(),
			dto.amount(),
			(int)(todayChart.getEndPrice() * dto.amount() * 0.0025),
			(long)(todayChart.getEndPrice() - singleGameStock.getAveragePurchasePrice()) * dto.amount() - (int)(
				todayChart.getEndPrice() * dto.amount() * 0.0025)
		);
	}

	public SingleTradeResponseDto buy(SingleTradeRequestDto dto) {
		//TODO: memberId -> @AuthenticationPrincipal // SingleGameLog는 어디서 가져오지?
		//
		SingleGameStock singleGameStock = singleGameStockRepository.findBySingleGameLog_IdAndStock_Id(dto.gameLogId(),
				dto.stockId())
			.orElseThrow(() -> new BaseExceptionHandler(ErrorCode.NO_SINGLE_GAME_STOCK));

		// 쓰레드에 저장된 게임 가져옴.
		SingleGame currentGame = this.getGame();

		Integer stockIdx = stocks.get(dto.stockId());
		// 차트에서 첫 날짜, 오늘 날짜의 종가를 가져온다.
		StockChart firstDayChart = list.get(stockIdx);
		StockChart todayChart = stockChartRepository.findById(firstDayChart.getId() + dto.day()).orElseThrow(
			() -> new BaseExceptionHandler(ErrorCode.NO_SINGLE_GAME_STOCK)
		);;


		// 현재 가진 돈보다 더 많이 요구한다면
		if ((long)dto.amount() * todayChart.getEndPrice() > currentGame.getCash()) {
			throw new BaseExceptionHandler(ErrorCode.NOT_ENOUGH_MONEY);
		}

		// roi 계산
		long totalAsset = currentGame.getCash();
		for (Long stockId : currentGame.getStocks().keySet()) {
			StockChart todayStockCharts = stockChartRepository.findById(stockId + dto.day()).orElseThrow(
				() -> new BaseExceptionHandler(ErrorCode.NO_SINGLE_GAME_STOCK)
			);

			int amount = currentGame.getStockAmount()[currentGame.getStocks().get(stockId)]; // 해당 Stock의 보유량 가져오기

			totalAsset += (long)amount * todayStockCharts.getEndPrice(); // 총 자산 계산
		}
		double resultRoi = 1.0 * totalAsset / currentGame.getInitial() * 100;

		// 총 profit 계산
		long resultProfit = totalAsset - currentGame.getInitial();

		// 평균단가 계산 => (평균단가 * 수량 + 이번에 사는데 쓴 돈) / (원래수량 + 이번에 사는 수량)
		int averagePrice = (singleGameStock.getAveragePurchasePrice() * currentGame.getStockAmount()[stockIdx]
			+ dto.amount() * todayChart.getEndPrice()) / (currentGame.getStockAmount()[stockIdx] + dto.amount());
		singleGameStock.setAveragePurchasePrice(averagePrice);
		// 샀으니 game 바꿔주기
		currentGame.getStockAmount()[stockIdx] += dto.amount();
		currentGame.setCash(currentGame.getCash() - (long) (dto.amount() * todayChart.getEndPrice() * 1.0015));

		SingleTrade singleTrade = SingleTrade.builder()
			.singleGameStock(singleGameStock)
			.date(todayChart.getDate())
			.tradeType(TradeType.BUY)
			.amount(dto.amount())
			.price(todayChart.getEndPrice()) // 현재가격.
			.stockQuantity(currentGame.getStockAmount()[stockIdx] + dto.amount())
			.roi(Double.parseDouble(String.format("%.2f", resultRoi)))
			.profit(resultProfit)
			.build();
		singleTradeRepository.save(singleTrade);

		// 보유 자산 변동 -> stockId, 보유수량, 평가손익, 수익률, 평균 단가
		ChangedStockResponseDto changedStockResponseDto =
			new ChangedStockResponseDto(
				dto.stockId(),
				currentGame.getStockAmount()[currentGame.getStocks().get(dto.stockId())],
				(long)currentGame.getStockAmount()[stockIdx] * (todayChart.getEndPrice()
					- singleGameStock.getAveragePurchasePrice()), //평가손익 : 오늘자 가격 -
				singleGameStock.getAveragePurchasePrice(), //평균단가
				100.0 * (todayChart.getEndPrice() - singleGameStock.getAveragePurchasePrice())
					/ singleGameStock.getAveragePurchasePrice()// 수익률
			);

		// 보유현금, 보유자산 변동, 매매내역
		return new SingleTradeResponseDto(
			currentGame.getCash(),
			changedStockResponseDto,
			TradeType.BUY,
			todayChart.getEndPrice(),
			dto.amount(),
			(int)(todayChart.getEndPrice() * dto.amount() * 0.00015),
			(long)(todayChart.getEndPrice() - singleGameStock.getAveragePurchasePrice()) * dto.amount()
				- (int)(todayChart.getEndPrice() * dto.amount() * 0.00015)
		);
	}

	public NextDayResponseDto getTomorrow(NextDayRequestDto dto) {
		SingleGame currentGame = this.getGame();
		// 종목별 "오늘의 종가, 등락정도, 보유수량, 평가손익, 손익률"를 담아서 리턴. responseDto에 넣어야겠다.
		List<NextDayInfoResponseDto> stockSummaries = new ArrayList<>();
		int totalPurchaseAmount = 0;
		long totalAsset = currentGame.getCash();

		for (StockChart startDateChart : list) {
			StockChart todayChart = stockChartRepository.findById(startDateChart.getId() + dto.day()).orElseThrow();
			StockChart yesterdayChart = stockChartRepository.findById(startDateChart.getId() + dto.day() - 1).orElseThrow();
			SingleGameStock singleGameStock = singleGameStockRepository.findBySingleGameLog_IdAndStock_Id(
					dto.gameLogId(), startDateChart.getStock().getId())
				.orElseThrow(() -> new BaseExceptionHandler(ErrorCode.NO_SINGLE_GAME_STOCK));
			long stockId = startDateChart.getStock().getId();
			int amount = currentGame.getStockAmount()[currentGame.getStocks().get(stockId)];
			// 총 자산 가치
			totalAsset += (long)amount * todayChart.getEndPrice();
			// 총 매입금액
			totalPurchaseAmount += currentGame.getStockAmount()[currentGame.getStocks().get(stockId)]
				* singleGameStock.getAveragePurchasePrice();

			// 종목별 정보 담아주기
			Integer stockIdx = currentGame.getStocks().get(startDateChart.getStock().getId());
			stockSummaries.add(
				new NextDayInfoResponseDto(
					stockId, // 종목 Id
					todayChart.getEndPrice(), // 오늘의 종가
					todayChart.getEndPrice() - yesterdayChart.getEndPrice(), // 등락정도
					currentGame.getStockAmount()[stockIdx], // 보유수량
					(long)currentGame.getStockAmount()[stockIdx] * (todayChart.getEndPrice()
						- singleGameStock.getAveragePurchasePrice()), // 평가손익
					singleGameStock.getAveragePurchasePrice() == 0 ? 0 :
						1.0 * ((todayChart.getEndPrice() - singleGameStock.getAveragePurchasePrice()) * 100)
							/ singleGameStock.getAveragePurchasePrice()// 손익률
				)
			);
		}
		// 총 profit 계산
		long resultProfit = totalAsset - currentGame.getInitial();
		double resultRoi = 1.0 * resultProfit / currentGame.getInitial() * 100;

		if (dto.day() == 50) {
			// 결과 저장.
			singleGameResultSave(1.0 * resultProfit / currentGame.getInitial() * 100, totalAsset);

			LocalDateTime startDate = null, endDate = null;
			List<StockInfoDto> stockInfoDtoList = new ArrayList<>();
			for (int i = 0; i < list.size(); i++) {
				StockChart startStockChart = list.get(i);
				if (i == 0) {
					// 한번만 실행 -> 날짜 받아오기
					startDate = startStockChart.getDate();
					endDate = stockChartRepository.findById(startStockChart.getId() + 349).orElseThrow(
						() -> new BaseExceptionHandler(ErrorCode.NO_SINGLE_GAME_STOCK)
					).getDate();
				}
				stockInfoDtoList.add(new StockInfoDto(startStockChart.getStock().getId(), startStockChart.getStock().getStockName()));
			}

			// 게임 로그 저장하기
			SingleGameResultDto singleGameResultDto = new SingleGameResultDto(stockInfoDtoList, startDate, endDate);
			SingleGameLog singleGameLog = singleGameLogRepository.findById(dto.gameLogId()).orElseThrow(
				() -> new BaseExceptionHandler(ErrorCode.NO_SINGLE_GAME_LOG)
			);
			singleGameLog.updateFinalProfit(resultProfit);
			singleGameLog.updateFinalRoi(1.0 * resultProfit / currentGame.getInitial() * 100);

			return new NextDayResponseDto(stockSummaries, currentGame.getCash(), resultProfit, resultRoi, totalPurchaseAmount,
				 totalAsset, singleGameResultDto);
		}
		return new NextDayResponseDto(stockSummaries, currentGame.getCash(), resultProfit, resultRoi, totalPurchaseAmount,
			totalAsset, null);
	}

	private void singleGameResultSave(double avgRoi, long totalAsset) {
		Member me = memberRepository.findById(1L).get(); // TODO: "나" 로 바꾸기!

		// 평균 수익률 바꾸기
		me.updateSingleAvgRoi((me.getSingleAvgRoi() + avgRoi) / (me.getWin() + me.getLose() + 1));

		// 승수 쌓기
		if (avgRoi > 0) {
			me.increaseWin();
		} else if (avgRoi < 0) {
			me.increaseLose();
		}
		me.addAsset(totalAsset);
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

	public SingleGame getGame() {
		// 현재 사용자의 세션에서 게임 상태를 가져옴
		return (SingleGame)httpSession.getAttribute("singleGame");
	}

	public void startRechargeTimer(Member member) {
		if (!timers.containsKey(member.getId())) {
			ScheduledExecutorService scheduler = Executors.newScheduledThreadPool(1);
			ScheduledFuture<?> future = scheduler.scheduleAtFixedRate(() -> {
				log.info("timer 작동 - 남은 횟수: {} ",member.getSingleGameChance());
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

}
