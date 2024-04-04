package com.backend.api.domain.fund.service;

import com.backend.api.domain.fund.dto.request.FundCreateReq;
import com.backend.api.domain.fund.dto.request.FundStartReq;
import com.backend.api.domain.fund.dto.request.FundTradeRequestDto;
import com.backend.api.domain.fund.dto.request.NextDayRequestDto;
import com.backend.api.domain.fund.dto.response.*;
import com.backend.api.domain.fund.entity.*;
import com.backend.api.domain.fund.entity.type.FundStatus;
import com.backend.api.domain.fund.repository.FundMemberRepository;
import com.backend.api.domain.fund.repository.FundRepository;
import com.backend.api.domain.fund.repository.FundStockRepository;
import com.backend.api.domain.fund.repository.FundTradeRepository;
import com.backend.api.domain.hadoop.service.HadoopService;
import com.backend.api.domain.member.entity.Member;
import com.backend.api.domain.member.repository.MemberRepository;
import com.backend.api.domain.notice.entity.Notice;
import com.backend.api.domain.notice.service.NotificationService;
import com.backend.api.domain.notice.type.AlarmType;
import com.backend.api.domain.stock.entity.Stock;
import com.backend.api.domain.stock.entity.StockChart;
import com.backend.api.domain.stock.repository.StockChartRepository;
import com.backend.api.domain.stock.repository.StockRepository;
import com.backend.api.global.common.code.ErrorCode;
import com.backend.api.global.common.type.FeeType;
import com.backend.api.global.common.type.TradeType;
import com.backend.api.global.exception.BaseExceptionHandler;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.*;
import java.util.concurrent.ThreadLocalRandom;

@Log4j2
@Service
@RequiredArgsConstructor
public class FundService {

	private final StockRepository stockRepository;
	private final FundRepository fundRepository;
	private final FundMemberRepository fundMemberRepository;
	private final MemberRepository memberRepository;
	private final StockChartRepository stockChartRepository;
	private final RedisTemplate<String, Object> redisTemplate;
    private final FundStockRepository fundStockRepository;
	private final ObjectMapper objectMapper;
	private final FundTradeRepository fundTradeRepository;
	private final SimpMessageSendingOperations template;
	private final NotificationService noticeService;
	private final HadoopService hadoopService;
	private final FundAndMemberService fundAndMemberService;
	private HashMap<Long, Integer> stocks;
	private List<Long> list;


	public List<FundRes> getAllFunds() {
		List<Fund> fundList = fundRepository.findAll();
		return getFundRes(fundList);
	}

	public List<FundRes> getRunningFunds() {
		List<Fund> fundList = fundRepository.findALLByStatusOrderByIdDesc(FundStatus.RUNNING);
		return getFundRes(fundList);
	}

	public List<FundRes> getRecruitingFunds() {
		List<Fund> fundList = fundRepository.findALLByStatusOrderByIdDesc(FundStatus.RECRUITING);
		return getFundRes(fundList);
	}

	public List<FundRes> getManagingFunds(Long managerId) {
		List<Fund> fundList = fundRepository.findAllByManager_IdOrderByIdDesc(managerId);
		return getFundRes(fundList);
	}

	public FundDetailRes getFundDetail(Long fundId) {
		Fund fund = fundRepository.findById(fundId)
			.orElseThrow(() -> new IllegalArgumentException("해당 펀드가 존재하지 않습니다."));
		return new FundDetailRes(
			fund.getId(),
			fund.getFundName(),
			fund.getIndustry(),
			fund.getManager().getNickname(),
			fund.getMinimumAmount(),
			fund.getTargetAmount(),
			fund.getFundAsset(),
			fund.getFundMemberList().stream().map(fundMember -> new FundMemberRes(
				fundMember.getMember().getId(),
				fundMember.getMember().getNickname(),
				fundMember.getInvestmentAmount()
			)).toList(),
			fund.getCapacity(),
			fund.getStatus().toString(),
			fund.getFeeType().toString(),
			fund.getPeriod(),
			fund.calRoi(),//TODO: 수익률 계산
			fund.getFundStockList().stream().map(fundStock -> new FundStockRes(
				fundStock.getStock().getId(),
				fundStock.getStock().getStockName(),
				fundStock.getStockAmount(),
				fundStock.getInvestmentAmount(),
				fundStock.getRoi()//TODO: 수익률 계산
			)).toList(),
			fund.getFundTradeList().stream().map(fundTrade -> new FundTradeRes(
				fundTrade.getId(),
				fundTrade.getFund().getId(),
				fundTrade.getStock().getStockName(),
				fundTrade.getTradeAmount(),
				fundTrade.getTradePrice(),
				fundTrade.getTradeType().toString(),
				fundTrade.getTradeDate().toString(),
				fundTrade.getRoi(),//TODO: 수익률 계산
				fundTrade.getProfit()//TODO: 수익금 계산
			)).toList(),
			fund.getStartDate() != null ? LocalDate.from(fund.getStartDate()) : null,
			fund.getStartDate() != null ? LocalDate.from(fund.getStartDate().plusDays(fund.getPeriod())) : null
		);
	}

	public List<FundRes> getInvestingFunds(Long loginUserId) {
		List<FundRes> fundResList = fundMemberRepository.findAllByMember_Id(loginUserId).stream()
			.filter(fundMember -> fundMember.getFund().getStatus() != FundStatus.CLOSED)
			.map(FundMember::getFund)
			.sorted(Comparator.comparing(Fund::getId).reversed())
			.map(fund -> {
				LocalDate startDate = fund.getStartDate() != null ? LocalDate.from(fund.getStartDate()) : null;
				LocalDate endDate = fund.getStartDate() != null ? LocalDate.from(fund.getStartDate().plusDays(fund.getPeriod())) : null;

				return new FundRes(
					fund.getId(),
					fund.getFundName(),
					fund.getManager().getNickname(),
					fund.getIndustry(),
					fund.getMinimumAmount(),
					fund.getTargetAmount(),
					fund.getFundAsset(),
					fund.getFundMemberList().size(),
					fund.getCapacity(),
					fund.getStatus().toString(),
					fund.getFeeType().toString(),
					fund.getPeriod(),
					fund.calRoi(), //TODO: Calculate yield
					startDate,
					endDate
				);
			})
			.toList();

		return fundResList;
	}


	public List<FundRes> getClosedInvestingFunds(Long loginUserId) {
		List<FundRes> fundResList = fundMemberRepository.findAllByMember_Id(loginUserId).stream()
			.filter(fundMember -> fundMember.getFund().getStatus() == FundStatus.CLOSED)
			.map(FundMember::getFund)
			.sorted(Comparator.comparing(Fund::getId).reversed())
			.map(fund -> {
				LocalDate startDate = fund.getStartDate() != null ? LocalDate.from(fund.getStartDate()) : null;
				LocalDate endDate = fund.getStartDate() != null ? LocalDate.from(fund.getStartDate().plusDays(fund.getPeriod())) : null;

				return new FundRes(
					fund.getId(),
					fund.getFundName(),
					fund.getManager().getNickname(),
					fund.getIndustry(),
					fund.getMinimumAmount(),
					fund.getTargetAmount(),
					fund.getFundAsset(),
					fund.getFundMemberList().size(),
					fund.getCapacity(),
					fund.getStatus().toString(),
					fund.getFeeType().toString(),
					fund.getPeriod(),
					fund.calRoi(), //TODO: Calculate yield
					startDate,
					endDate
				);
			})
			.toList();

		return fundResList;
	}


	private List<FundRes> getFundRes(List<Fund> fundList) {
		List<FundRes> fundResList = fundList.stream().map(fund -> {
			LocalDate startDate = fund.getStartDate() != null ? LocalDate.from(fund.getStartDate()) : null;
			LocalDate endDate = fund.getStartDate() != null ? LocalDate.from(fund.getStartDate().plusDays(fund.getPeriod())) : null;

			return new FundRes(
				fund.getId(),
				fund.getFundName(),
				fund.getManager().getNickname(),
				fund.getIndustry(),
				fund.getMinimumAmount(),
				fund.getTargetAmount(),
				fund.getFundAsset(),
				fund.getFundMemberList().size(),
				fund.getCapacity(),
				fund.getStatus().toString(),
				fund.getFeeType().toString(),
				fund.getPeriod(),
				fund.calRoi(), //TODO: 수익률 계산
				startDate,
				endDate
			);
		}).toList();
		return fundResList;
	}


	public List<FundRes> searchFund(String fundName) {
		List<Fund> fundList = fundRepository.findAllByFundNameContainingOrderByIdDesc(fundName);
		return getFundRes(fundList);
	}

	@Transactional
	public Long createFund(Long loginUserId, FundCreateReq fundCreateReq) {
		Member manager = memberRepository.findById(loginUserId)
			.orElseThrow(() -> new BaseExceptionHandler(ErrorCode.NOT_FOUND_USER));
		Fund fund = Fund.builder()
			.manager(manager)
			.fundName(fundCreateReq.fundName())
			.targetAmount(fundCreateReq.targetAmount())
			.fundAsset(0L)
			.startAsset(0L)
			.startDate(null)
			.period(fundCreateReq.period())
			.capacity(fundCreateReq.capacity())
			.minimumAmount(fundCreateReq.minimumAmount())
			.status(FundStatus.RECRUITING)
			.feeType(FeeType.valueOf(fundCreateReq.feeType()))
			.industry(fundCreateReq.industry())
			.build();
		fundRepository.save(fund);
		return fund.getId();
	}

	@Transactional
	public Long startFund(Long loginUserId, FundStartReq fundStartReq){
		Fund fund = fundRepository.findById(fundStartReq.fundId())
			.orElseThrow(() -> new BaseExceptionHandler(ErrorCode.NOT_FOUND_FUND));
		/* 예외 처리 */
		if(fund.getManager().getId() != loginUserId){
			throw new BaseExceptionHandler(ErrorCode.UNAUTHORIZED_USER_EXCEPTION);
		}
		if(fund.getStatus() != FundStatus.RECRUITING){
			throw new BaseExceptionHandler(ErrorCode.NOT_RECRUITING_FUND);
		}
		if(fund.getFundAsset() < fund.getTargetAmount()){
			throw new BaseExceptionHandler(ErrorCode.NOT_ENOUGH_ASSET);
		}
		fund.updateFundStatus(FundStatus.RUNNING);
		fund.updateFundStart();
		fundRepository.save(fund);
		// 펀드 시작 알림
		log.info("펀드 시작: {}", fund.getFundName());
		for(Member member : fund.getFundMemberList().stream().map(FundMember::getMember).toList()){
			log.info("펀드 시작 알림: {}", member.getNickname());
			template.convertAndSend("/api/sub/" + member.getId(), "펀드가 시작되었습니다.");
			Notice notice = Notice.builder()
				.member(member)
				.sender(fund.getManager().getNickname())
				.isRead(false)
				.alarmType(AlarmType.FUNDSTARTED)
				.content(fund.getFundName()+"펀드가 시작되었습니다.")
				.build();
			noticeService.createNotification(notice);
		}
		return fund.getId();
	}

	public boolean existsFundname(String fundName) {
		return fundRepository.existsByFundName(fundName);
	}

	@Transactional
    public FundGameCreateResponseDto createGame(Long fundId, Long LoginUserId) {
		Fund fund = fundRepository.findById(fundId).orElseThrow(() -> new BaseExceptionHandler(ErrorCode.NOT_FOUND_FUND));

		//[1] 운영중인 펀드의 매니저 아이디와 현재 로그인한 멤버의 아이디가 같은지 확인한다.
		if (fund.getManager().getId() != LoginUserId) throw new BaseExceptionHandler(ErrorCode.NOT_FUND_MANAGER);

		//[2] 랜덤 10개의 Stock 정하기
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
			log.info("randomDateTime - {}", randomDateTime);
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
						.orElseThrow(() -> new BaseExceptionHandler(ErrorCode.NO_FUND_STOCK));

				if (!Objects.equals(stockChart.getStock().getId(), stockChart350.getStock().getId())) {
					randomDateTime = randomDateTime.minusDays(50);
					break;
				}

				// 350일간의 차트가 있으면 추가.
				stocks.put(stockChart.getStock().getId(), stocks.size());
				list.add(stockChart.getId());
			}
		}
		//[3] 펀드 게임 생성 - Redis
		FundGame fundGame = FundGame.builder()
				.fundId(fundId)
				.stocks(stocks)
				.firstDayChartList(list)
				.tradeList(new ArrayList<>())
				.stockAmount(new int[10])
				.averagePrice(new int[10])
				.cash(fund.getFundAsset())
				.initial(fund.getFundAsset())
				.totalPurchaseAmount(0L)
				.profits(new int[10])
				.stockPurchaseAmount(new long[10])
			.build();

		Long nextId = null; //사실 fundGame은 한번밖에 못해서 필요없는 변수이기는 함
		nextId = redisTemplate.opsForValue().increment("nextId", 1); // Redis에서 Atomic한 증가
		if (nextId == null || nextId == 1) {
			nextId = 1L; // 초기값 설정
			redisTemplate.opsForValue().set("nextId", nextId); // Redis에 첫 번째 id 설정
		}
		String key = "fundGame:" + fundId + ":" + nextId; // Redis에 저장할 키
		redisTemplate.opsForValue().set(key, fundGame);

		//[4] 주식차트 350개 가져오기
		List<StockChartDataDto> stockChartDataList = new ArrayList<>();
		int cnt = 0;
		for (long stockId : stocks.keySet()) { //10번 반복

			log.info("차트 그리기");
			StockChart stockChart = stockChartRepository.findById(list.get(cnt++)).orElseThrow(
					() -> new BaseExceptionHandler(ErrorCode.BAD_REQUEST_ERROR)
			);

			// FundStock 만들어서 저장.
			FundStock fundStock = FundStock.builder()
					.stock(stockChart.getStock())
					.fund(fund)
					.stockAmount(0L)
					.investmentAmount(0L)
					.roi(0D)
					.profit(0)
					.averagePurchasePrice(0)
					.build();
			fundStockRepository.save(fundStock);

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
			StockChartDataDto stockChartDataDto = new StockChartDataDto(fundStock.getStock().getId(), stockChartDtoList);
			stockChartDataList.add(stockChartDataDto);
		}
		//[5] NextDayInfo
		List<NextDayInfoResponseDto> stockSummaries = new ArrayList<>();
		for (Long firstDayStockChartId : fundGame.getFirstDayChartList()) {
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

		TotalAssetDto totalAssetDto = new TotalAssetDto(fund.getFundAsset(), 0, 0, 0, fund.getFundAsset());

		return new FundGameCreateResponseDto(
				nextId,
				stockChartDataList,
				totalAssetDto,
				stockSummaries
		);
    }
	public static LocalDateTime generateRandomDateTime(LocalDateTime start, LocalDateTime end) {
		long startEpochDay = start.toLocalDate().toEpochDay();
		long endEpochDay = end.toLocalDate().toEpochDay();
		long randomDay = ThreadLocalRandom.current().nextLong(startEpochDay, endEpochDay + 1);

		LocalDate randomLocalDate = LocalDate.ofEpochDay(randomDay);
		LocalTime randomLocalTime = LocalTime.ofSecondOfDay(ThreadLocalRandom.current().nextLong(0, 24 * 60 * 60));
		return LocalDateTime.of(randomLocalDate, randomLocalTime);
	}

	@Transactional
	public FundTradeResponseDto sell(FundTradeRequestDto dto, Long managerId) {
		Fund fund = fundRepository.findById(dto.fundId()).orElseThrow(() -> new BaseExceptionHandler(ErrorCode.NOT_FOUND_FUND));
		FundGame currentGame = this.getGame(dto.fundId(), dto.gameIdx());


		// 세션에 저장된 게임을 가져온다.
		Integer stockIdx = currentGame.getStocks().get(dto.stockId()); // Map으로 저장한 stockId에 대한 index값을 가져온다.

		// 차트에서 오늘 날짜의 종가를 가져온다.
		StockChart firstDayChart = stockChartRepository.findById(currentGame.getFirstDayChartList().get(stockIdx))
				.orElseThrow(() -> new BaseExceptionHandler(ErrorCode.BAD_REQUEST_ERROR));
		StockChart todayChart = stockChartRepository.findById(firstDayChart.getId() + 299 + dto.day()).orElseThrow(
				() -> new BaseExceptionHandler(ErrorCode.NO_FUND_STOCK)
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
					() -> new BaseExceptionHandler(ErrorCode.NO_FUND_STOCK)
			);
			int amount = currentGame.getStockAmount()[i]; // 해당 Stock의 보유량 가져오기

			totalAsset += (long) (amount * todayStockChart.getEndPrice() * 0.9975); // 총 자산 계산
		}

		// 팔았으니 currentGame 바꿔주기
		currentGame.getStockAmount()[stockIdx] -= dto.amount();
		currentGame.updateCash(currentGame.getCash() + (long) (dto.amount() * todayChart.getEndPrice() * 0.9975));
		currentGame.addProfit(stockIdx, (int) (dto.amount() * (0.9975 * todayChart.getEndPrice() - currentGame.getAveragePrice()[stockIdx])));
		currentGame.updateTotalAsset(totalAsset);

		double resultRoi = 100.0 * currentGame.getProfits()[stockIdx] / currentGame.getStockPurchaseAmount()[stockIdx];
		Stock stock = stockRepository.findById(dto.stockId()).get();
		//Mysql - 매매내역 추가
		FundTrade fundTrade = FundTrade.builder()
				.fund(fund)
				.stock(stock)
				.tradeDate(todayChart.getDate())
				.tradeType(TradeType.SELL)
				.tradeAmount(dto.amount())
				.tradePrice(todayChart.getEndPrice()) // 현재가격.
				.stockQuantity(currentGame.getStockAmount()[stockIdx])
				.roi(Double.parseDouble(String.format("%.2f", resultRoi)))
				.profit((long) (dto.amount() * (0.9975 * todayChart.getEndPrice() - currentGame.getAveragePrice()[stockIdx]))) // 이번 거래의 profit
				.build();
		fundTradeRepository.save(fundTrade);
		/* 하둡저장 */
		try{
			hadoopService.saveFundTradeLogHdfs(fundTrade, managerId);
		} catch (Exception e){

		}

		//Redis - 매매내역 추가 및 값 변경
		currentGame.getTradeList().add(
				new FundTradeListDto(
						dto.stockId(),
						dto.day(),
						fundTrade.getTradeType(),
						fundTrade.getTradeAmount(),
						fundTrade.getTradePrice(),
						fundTrade.getProfit())
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
		redisTemplate.opsForValue().set("fundGame:" + dto.fundId() + ":" + dto.gameIdx(), currentGame);

		long totalProfit = 0;
		for (int i = 0; i < currentGame.getProfits().length; i++) {
			totalProfit += currentGame.getProfits()[i];
		}
		double totalRoi = 100.0 * (totalAsset - currentGame.getInitial()) / currentGame.getInitial();
		TotalAssetDto totalAssetDto = new TotalAssetDto(currentGame.getCash(), totalAsset - currentGame.getInitial(), totalRoi, currentGame.getTotalPurchaseAmount(), currentGame.getTotalAsset());
		currentGame.updateProfit(stockIdx, dto.amount());
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
		return new FundTradeResponseDto(
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
	public FundGame getGame(long fundId, long gameIdx) {
		try {
			String jsonStr = objectMapper.writeValueAsString(redisTemplate.opsForValue().get("fundGame:" + fundId + ":" + gameIdx));
			return objectMapper.readValue(jsonStr, FundGame.class);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}

	@Transactional
	public FundTradeResponseDto buy(FundTradeRequestDto dto, Long managerId) {
		Fund fund = fundRepository.findById(dto.fundId()).orElseThrow(() -> new BaseExceptionHandler(ErrorCode.NOT_FOUND_FUND));
		FundGame currentGame = this.getGame(dto.fundId(), dto.gameIdx());
		Integer stockIdx = currentGame.getStocks().get(dto.stockId());

		// 차트에서 첫 날짜, 오늘 날짜의 종가를 가져온다.
		StockChart firstDayChart = stockChartRepository.findById(currentGame.getFirstDayChartList().get(stockIdx))
				.orElseThrow(() -> new BaseExceptionHandler(ErrorCode.BAD_REQUEST_ERROR));
		StockChart todayChart = stockChartRepository.findById(firstDayChart.getId() + 299 + dto.day()).orElseThrow(
				() -> new BaseExceptionHandler(ErrorCode.NO_FUND_STOCK)
		);

		// 현재 가진 돈보다 더 많이 요구한다면
		if ((long) dto.amount() * todayChart.getEndPrice() > currentGame.getCash()) {
			throw new BaseExceptionHandler(ErrorCode.NOT_ENOUGH_MONEY);
		}

		log.info("flag 0");
		// 평균단가 계산 => (평균단가 * 수량 + 이번에 사는데 쓴 돈) / (원래수량 + 이번에 사는 수량)
		int averagePrice = (currentGame.getAveragePrice()[stockIdx] * currentGame.getStockAmount()[stockIdx]
				+ dto.amount() * todayChart.getEndPrice()) / (currentGame.getStockAmount()[stockIdx] + dto.amount());

		log.info("flag 1");
		//  샀으니 game 바꿔주기
		currentGame.getStockAmount()[stockIdx] += dto.amount();
		currentGame.updateCash(currentGame.getCash() - (long) (dto.amount() * todayChart.getEndPrice() * 1.0015));
		currentGame.getAveragePrice()[stockIdx] = averagePrice;
		currentGame.getStockPurchaseAmount()[stockIdx] += (long) dto.amount() * todayChart.getEndPrice();
		currentGame.getProfits()[stockIdx] -= (int) (dto.amount() * todayChart.getEndPrice() * 0.0015);
		log.info("flag 2");
		// 총 roi 계산
		long totalAsset = currentGame.getCash();
		for (int i = 0; i < currentGame.getFirstDayChartList().size(); i++) {
			long firstDayChartId = currentGame.getFirstDayChartList().get(i);
			StockChart todayStockCharts = stockChartRepository.findById(firstDayChartId + 299 + dto.day()).orElseThrow(
					() -> new BaseExceptionHandler(ErrorCode.NO_FUND_STOCK)
			);
			long stockId = todayStockCharts.getStock().getId();
			log.info("currentGame.getStocks().get(firstDayChartId) : {}", currentGame.getStocks().get(stockId));
			log.info("currentGame.getStocks() : {}", currentGame.getStocks());
			log.info("firstDayChartId : {}", firstDayChartId);
			int amount = currentGame.getStockAmount()[currentGame.getStocks().get(stockId)]; // 해당 Stock의 보유량 가져오기

			totalAsset += (long) (amount * todayStockCharts.getEndPrice() * 0.9975); // 총 자산 계산
		}
		log.info("flag 3");
		// 총 구입 금액 계산
		currentGame.addTotalPurchaseAmount((long) dto.amount() * todayChart.getEndPrice());
		currentGame.updateTotalAsset(totalAsset);

		double resultRoi = 100.0 * currentGame.getProfits()[stockIdx] / currentGame.getStockPurchaseAmount()[stockIdx];
		Stock stock = stockRepository.findById(dto.stockId()).get();
		log.info("flag 4");
		// 총 profit 계산
		FundTrade fundTrade = FundTrade.builder()
				.fund(fund)
				.stock(stock)
				.tradeDate(todayChart.getDate())
				.tradeType(TradeType.BUY)
				.tradeAmount(dto.amount())
				.tradePrice(todayChart.getEndPrice()) // 현재가격.
				.stockQuantity(currentGame.getStockAmount()[stockIdx])
				.roi(Double.parseDouble(String.format("%.2f", resultRoi)))
				.profit((-1) *(long) (dto.amount() * todayChart.getEndPrice() * 0.0015))
				.build();

		log.info("flag 5");
		fundTradeRepository.save(fundTrade);
		try{
			hadoopService.saveFundTradeLogHdfs(fundTrade, managerId);
		} catch (Exception e){

		}
		log.info("flag 6");
		//Redis - 매매내역 추가 및 값 변경
		currentGame.getTradeList().add(
				new FundTradeListDto(
						dto.stockId(),
						dto.day(),
						fundTrade.getTradeType(),
						fundTrade.getTradeAmount(),
						fundTrade.getTradePrice(),
						fundTrade.getProfit())
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

		log.info("flag 7");
		redisTemplate.opsForValue().set("fundGame:" + dto.fundId() + ":" + dto.gameIdx(), currentGame);

		long totalProfit = 0;
		for (int i = 0; i < currentGame.getProfits().length; i++) {
			totalProfit += currentGame.getProfits()[i];
		}

		log.info("flag 8");
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
		log.info("flag 9");
		// 보유현금, 보유자산 변동, 매매내역
		return new FundTradeResponseDto(
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
	@Transactional
	public NextDayResponseDto getTomorrow(NextDayRequestDto dto, Long managerId) {
		FundGame currentGame = this.getGame(dto.fundId(), dto.gameIdx());
		Fund fund = fundRepository.findById(dto.fundId()).orElseThrow(() -> new BaseExceptionHandler(ErrorCode.NOT_FOUND_FUND));
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
							(long) (currentGame.getStockAmount()[stockIdx] * (0.9975 * todayChart.getEndPrice()
									- currentGame.getAveragePrice()[stockIdx])), // 평가손익
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
				// FundStock 에 저장
				FundStock fundGameStock = fundStockRepository.findByFund_IdAndStock_Id(currentGame.getFundId(),todayChart.getStock().getId() )
						.orElseThrow(() -> new BaseExceptionHandler(ErrorCode.NO_FUND_STOCK));

				Long stockId = todayChart.getStock().getId();
				Integer index = currentGame.getStocks().get(stockId);

				// 최종 투자금액, 보유개수 저장
				log.info("fundGameStock.updateInvestmentAmount : {}",currentGame.getStockPurchaseAmount()[stockIdx]);
				log.info("fundGameStock.updateStockAmount : {}",(long) currentGame.getStockAmount()[stockIdx]);
				log.info("fundGameStock.updateAveragePurchasePrice : {}",currentGame.getAveragePrice()[index]);
				log.info("(long) currentGame.getStockAmount()[stockIdx] : {}",currentGame.getProfits()[index] + currentGame.getStockAmount()[index] * (todayChart.getEndPrice() - currentGame.getAveragePrice()[index]));
				fundGameStock.updateInvestmentAmount(currentGame.getStockPurchaseAmount()[stockIdx]);
				fundGameStock.updateStockAmount((long) currentGame.getStockAmount()[stockIdx]);

				fundGameStock.updateAveragePurchasePrice(currentGame.getAveragePrice()[index]);
				fundGameStock.updateProfit(currentGame.getProfits()[index] + currentGame.getStockAmount()[index] * (todayChart.getEndPrice() - currentGame.getAveragePrice()[index]));
				double roi = currentGame.getStockPurchaseAmount()[index] == 0L ? 0 :
						(100.0 * (currentGame.getProfits()[index] +
								currentGame.getStockAmount()[index] * (todayChart.getEndPrice() - currentGame.getAveragePrice()[index]))
								/ currentGame.getStockPurchaseAmount()[index]);
				fundGameStock.updateRoi(roi);
				log.info("fundGameStock.updateRoi : {}",roi);
			}
		}
		// 총 profit 계산
		long resultProfit = totalAsset - currentGame.getInitial();
		double resultRoi = 100.0 * (totalAsset - currentGame.getInitial()) / currentGame.getInitial();

		currentGame.updateTotalAsset(totalAsset);
		redisTemplate.opsForValue().set("fundGame:" + dto.fundId() + ":" + dto.gameIdx(), currentGame);

		if (dto.day() == 51) {
			// 결과 저장.
			LocalDateTime startDate = null, endDate = null;
			List<StockInfoDto> stockInfoDtoList = new ArrayList<>();
			for (int i = 0; i < currentGame.getFirstDayChartList().size(); i++) {
				Long firstDateChartId = currentGame.getFirstDayChartList().get(i);
				StockChart stockChart = stockChartRepository.findById(firstDateChartId).get();
				if (i == 0) {
					// 한번만 실행 -> 날짜 받아오기
					startDate = stockChart.getDate();
					endDate = stockChartRepository.findById(stockChart.getId() + 349).orElseThrow(
						() -> new BaseExceptionHandler(ErrorCode.NO_FUND_STOCK)
					).getDate();
				}
				stockInfoDtoList.add(new StockInfoDto(stockChart.getStock().getId(), stockChart.getStock().getStockName()));
			}

			// 게임 로그 저장하기
			FundGameResultDto fundGameResultDto = new FundGameResultDto(
					stockInfoDtoList,
					startDate,
					endDate,
					currentGame.getInitial(),
					currentGame.getTotalAsset(),
					currentGame.getTotalAsset() - currentGame.getInitial(),
					100.0 * (currentGame.getTotalAsset() - currentGame.getInitial()) / currentGame.getInitial()
			);
			// 결과 저장.
			fund.updateFinalFundAsset(currentGame.getTotalAsset());

			// 레디스에서 삭제해주기
			redisTemplate.delete("fundGame:" + dto.fundId() + ":" + dto.gameIdx());
			// 펀드 종료
			fund.updateFundStatus(FundStatus.CLOSED);
			// 펀드 종료 알림
			for (Member member : fund.getFundMemberList().stream().map(FundMember::getMember).toList()) {
				log.info("펀드 종료 알림: {}", member.getNickname());
				template.convertAndSend("/api/sub/" + member.getId(), "펀드가 종료되었습니다.");
				Notice notice = Notice.builder()
						.member(member)
						.sender(fund.getManager().getNickname())
						.isRead(false)
						.alarmType(AlarmType.FUNDCLOSED)
						.content(fund.getFundName() + "펀드가 종료되었습니다.")
						.build();
				noticeService.createNotification(notice);
			}
			fundAndMemberService.closeFund(managerId, fund.getId());
			return new NextDayResponseDto(stockSummaries, currentGame.getCash(), resultProfit, resultRoi, currentGame.getTotalPurchaseAmount(),
					totalAsset, assetList, fundGameResultDto);
		}
		return new NextDayResponseDto(stockSummaries, currentGame.getCash(), resultProfit, resultRoi, currentGame.getTotalPurchaseAmount(),
				totalAsset, assetList, null);
	}

}
