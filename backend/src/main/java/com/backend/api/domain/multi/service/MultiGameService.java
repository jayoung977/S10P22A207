package com.backend.api.domain.multi.service;

import com.backend.api.domain.member.entity.Member;
import com.backend.api.domain.member.repository.MemberRepository;
import com.backend.api.domain.member.repository.MultiGamePlayerRepository;
import com.backend.api.domain.multi.dto.MultiGameResultRequestDto;
import com.backend.api.domain.multi.dto.MultiGameSubResultRequestDto;
import com.backend.api.domain.multi.dto.MultiWaitRoomInfo;
import com.backend.api.domain.multi.dto.request.MultiGameChartRequestDto;
import com.backend.api.domain.multi.dto.request.MultiGameRoomCreateRequestDto;
import com.backend.api.domain.multi.dto.request.MultiGameStartRequestDto;
import com.backend.api.domain.multi.dto.request.MultiNextDayRequestDto;
import com.backend.api.domain.multi.dto.request.MultiTradeRequestDto;
import com.backend.api.domain.multi.dto.response.MultiGameFinalResultDto;
import com.backend.api.domain.multi.dto.response.MultiGameInfo;
import com.backend.api.domain.multi.dto.response.MultiGameResultDto;
import com.backend.api.domain.multi.dto.response.MultiGameRoomCreateResponseDto;
import com.backend.api.domain.multi.dto.response.MultiGameRoomInfo;
import com.backend.api.domain.multi.dto.response.MultiGameRoomsResponseDto;
import com.backend.api.domain.multi.dto.response.MultiGameStartResponseDto;
import com.backend.api.domain.multi.dto.response.MultiGameStockIdDto;
import com.backend.api.domain.multi.dto.response.MultiGameTotalResultDto;
import com.backend.api.domain.multi.dto.response.MultiLogMemberDto;
import com.backend.api.domain.multi.dto.response.MultiLogResponseDto;
import com.backend.api.domain.multi.dto.response.MultiLogTradeDto;
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
import com.backend.api.domain.single.dto.response.StockChartDataDto;
import com.backend.api.domain.single.dto.response.StockChartDto;
import com.backend.api.domain.stock.entity.Stock;
import com.backend.api.domain.stock.entity.StockChart;
import com.backend.api.domain.stock.repository.StockChartRepository;
import com.backend.api.domain.stock.repository.StockRepository;
import com.backend.api.global.common.SocketBaseDtoRes;
import com.backend.api.global.common.code.ErrorCode;
import com.backend.api.global.common.type.SocketType;
import com.backend.api.global.common.type.TradeType;
import com.backend.api.global.exception.BaseExceptionHandler;
import com.backend.api.global.security.userdetails.CustomUserDetails;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ThreadLocalRandom;
import java.util.concurrent.atomic.AtomicInteger;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
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
	private final MultiGameSocketService multiGameSocketService;
	private final SimpMessageSendingOperations template;

    /*
     * 멀티게임 key :  multiGame:gameId:memberId:roundNumber
     */

    public MultiGameRoomsResponseDto getMultiGameRooms(int pageNumber) {
        Set<String> multiGameRooms = redisTemplate.keys("multiGame:*");

        // MultiGameRoomInfo 객체를 담을 리스트
		Map<Long, MultiGameRoomInfo> resultSetMap = new HashMap<>();
		Map<Long, MultiWaitRoomInfo> waitRoomInfoMap = new HashMap<>();
		Map<Integer, Set<Long>> gameParticipantsIds = new ConcurrentHashMap<>();
		Map<Integer, Set<Long>> waitRoomParticipantsIds = new ConcurrentHashMap<>();
		for (String key : multiGameRooms) {
			String[] parts = key.split(":");
			if (parts.length == 2 || parts.length == 4) { // 방 번호 또는 게임 정보가 있는 경우
				Long roomId = null;
				Integer roundNumber = null;
				String roomTitle = null;
				Boolean isOpen = null;
				Integer password = null;

				// ":"로 분할된 각 요소에서 필요한 정보 추출
				for (int i = 0; i < parts.length; i++) {
					if (parts[i].equals("multiGame"))
						continue; // 첫 번째 요소인 경우 skip
					if (i == 1) { // 두 번째 요소는 roomId
						roomId = Long.valueOf(parts[1]);
						int roomInt = Integer.parseInt(parts[1]);
						if (parts.length == 2) {
							MultiWaitingRoom waitingRoom = getWaitingRoom(roomInt);
							Set<Long> participantIds = waitRoomParticipantsIds.computeIfAbsent(roomInt, set -> new HashSet<>());
                            participantIds.addAll(waitingRoom.getParticipantIds());
						}

					} else if (i == 3) { // 네 번째 요소는 roundNumber
						roundNumber = Integer.parseInt(parts[i]);
					} else if (i == 2) { // 세 번째 요소는 participantsIds
						// 세 번째 요소는 participantsIds
						Integer gameKey = Integer.parseInt(parts[1]);
						Set<Long> participantIds = gameParticipantsIds.computeIfAbsent(gameKey, set -> new HashSet<>());

                        participantIds.add(Long.parseLong(parts[2]));
						gameParticipantsIds.get(gameKey).add(Long.parseLong(parts[i]));
					}
				}
				if (parts.length == 2) {
					int waitingRoomKey = Integer.parseInt(parts[1]);
					MultiWaitingRoom waitingRoom = getWaitingRoom(waitingRoomKey);
					roomTitle = waitingRoom.getRoomTitle();
					isOpen = waitingRoom.getIsOpen();
					password = waitingRoom.getPassword();
					waitRoomInfoMap.put((long) waitingRoomKey, new MultiWaitRoomInfo((long) waitingRoomKey, roomTitle, waitRoomParticipantsIds.get(waitingRoomKey), isOpen, password, waitingRoom.getMaxRound()));
				} else {
					// MultiGameRoomInfo 객체 생성 후 리스트에 추가
					MultiGame currentGame = getGame(Long.parseLong(parts[2]), Long.parseLong(parts[1]));

					resultSetMap.put(roomId, new MultiGameRoomInfo(roomId, currentGame.getRoomTitle(), currentGame.getRound(), gameParticipantsIds.get(Integer.parseInt(parts[1])), currentGame.getIsOpen(), currentGame.getPassword(), currentGame.getMaxRound()));
				}

			}
		}
		List<MultiGameRoomInfo> resultList = new ArrayList<>(resultSetMap.values());
		List<MultiWaitRoomInfo> waitRoomInfos = new ArrayList<>(waitRoomInfoMap.values());

		// 정렬
		resultList.sort(Comparator.comparing(MultiGameRoomInfo::roomId));
		waitRoomInfos.sort(Comparator.comparing(MultiWaitRoomInfo::roomId));

        // 페이징 처리
        int fromIndex = (pageNumber - 1) * 6;
        int gameRoomToIndex = Math.min(fromIndex + 6, resultList.size());
        int waitingRoomToIndex = Math.min(fromIndex + 6, waitRoomInfos.size());


        // MultiGameRoomsResponseDto 객체 생성하여 반환
		return new MultiGameRoomsResponseDto(resultList.size(), waitRoomInfos.size(), resultList.subList(fromIndex, gameRoomToIndex), waitRoomInfos.subList(fromIndex, waitingRoomToIndex));
    }

	public MultiGameRoomCreateResponseDto createMultiGameRoom(CustomUserDetails userDetails, MultiGameRoomCreateRequestDto dto) throws
		JsonProcessingException {
		multiGameSocketService.checkStatus(userDetails);
		log.info("socket 무사 통과 - {}", userDetails);
		Long roomId = redisTemplate.opsForValue().increment("roomId", 1); // Redis에서 Atomic한 증가
		if (roomId == null || roomId == 1) {
			roomId = 1L; // 초기값 설정
			redisTemplate.opsForValue().set("roomId", roomId);
		}
		String key = "multiGame:" + roomId; // Redis에 저장할 키
		Set<Long> participantIds = new HashSet<>();
		redisTemplate.opsForValue().set("enterRoomId:"+userDetails.getEmail(), roomId); // 내가 방에 입장했다는 정보 저장
		participantIds.add(userDetails.getId());
		MultiWaitingRoom multiWaitingRoom =
			MultiWaitingRoom.builder()
				.roomTitle(dto.roomTitle())
				.participantIds(participantIds)
				.password(dto.password())
				.isOpen(dto.isOpen())
				.maxRound(dto.maxRoundNumber())
				.readyState(new HashMap<>())
				.hostId(userDetails.getId())
				.build();
		multiWaitingRoom.getReadyState().put(userDetails.getId(), true); // 방장은 레디상태 true로 초기화
		redisTemplate.opsForValue().set(key, multiWaitingRoom);
		return new MultiGameRoomCreateResponseDto(roomId);
	}

	public MultiGameStartResponseDto startMultiGame(Long memberId, MultiGameStartRequestDto dto) {
		log.info("MULTIGAMESTART:::");

        Long gameId = null;
        if (dto.roundNumber() == 1) {
            // multiGame 저장 키: multiGame:gameId:memberId:roundNumber
            gameId = redisTemplate.opsForValue().increment("gameId", 1); // Redis에서 Atomic한 증가
            if (gameId == null || gameId == 1) {
                gameId = 1L; // 초기값 설정
                redisTemplate.opsForValue().set("gameId", gameId);
            }
        } else {
            // Redis에서 memberId가 주어진 값을 가진 키 중에서 gameId가 가장 큰 값을 찾기 위한 패턴
            String pattern = "multiGame:*:" + memberId + ":*";

			// 패턴과 일치하는 키를 모두 가져옴
			Set<String> keys = redisTemplate.keys(pattern);

			Long maxGameId = null;

			// 각 키에 대해 gameId를 추출하여 최대 gameId를 찾음(가장 최근 게임. 없애주긴 하지만 에러 방지)
			for (String key : keys) {
				String[] parts = key.split(":");
				long tempGameId = Long.parseLong(parts[1]);
				if (maxGameId == null || tempGameId > maxGameId) {
					maxGameId = tempGameId;
				}
			}
			gameId = maxGameId;

		}


		// 가능한 날짜를 찾는다. -> 동일한 날짜의 데이터 주기 위함.
		LocalDateTime lastDate = LocalDateTime.of(2024, 3, 10, 0, 0);
		LocalDateTime startDate = LocalDateTime.of(1996, 5, 10, 0, 0);

		LocalDateTime randomDateTime = generateRandomDateTime(startDate, lastDate); // 이 날짜로 조회
		List<MultiGameStockIdDto> firstDayStockChartIds = new ArrayList<>();
		while (firstDayStockChartIds.size() < dto.maxRoundNumber()) {

			List<String> stockIds = stockChartRepository.findDistinctStockCodeByDateBetween(randomDateTime, randomDateTime.plusDays(1));
			if (stockIds.isEmpty()) {
				log.info("해당하는 날짜의 데이터가 없음.{}", randomDateTime);
				randomDateTime = randomDateTime.plusDays(1);
				continue;
			}
			Collections.shuffle(stockIds); // 리스트를 섞음

			// randomStocks 리스트에서 처음 50개의 요소 검토
			List<String> selectedStocks = stockIds.subList(0, Math.min(stockIds.size(), 50));   // 이거 넘기자
			List<StockChart> randomStockCharts = stockChartRepository.findRandomStocksInRange(randomDateTime,
				randomDateTime.plusDays(1), selectedStocks);

			for (StockChart stockChart : randomStockCharts) {
				// 350일 뒤의 stockChart와 다른 주식이면 pass
				StockChart stockChart350 = stockChartRepository.findById(stockChart.getId() + 349)
					.orElseThrow(() -> new BaseExceptionHandler(ErrorCode.NO_SINGLE_GAME_STOCK));

				if (!Objects.equals(stockChart.getStock().getId(), stockChart350.getStock().getId())) {
					randomDateTime = randomDateTime.minusDays(50);
					break;
				}

				// 350일간의 차트가 있으면 추가.
				firstDayStockChartIds.add(new MultiGameStockIdDto(stockChart.getStock().getId(), stockChart.getId()));
				if (firstDayStockChartIds.size() == dto.maxRoundNumber()) {
					break;
				}
			}
		}

		for (Long playerId : dto.playerIds()) { // 채팅방에 있는 모든 유저에게 메시지 전송
			log.info("메시지 전송 대상: {}", playerId);
			template.convertAndSend("/api/sub/" + playerId, new SocketBaseDtoRes<>(SocketType.START,
				new MultiGameStartResponseDto(gameId, firstDayStockChartIds, dto.roomId())));
				log.info("socketBaseDtoRes : gameId : {} roundNumber : {}", gameId, 1);
			}
			log.info("메시지 전송 완료");

        return new MultiGameStartResponseDto(gameId, firstDayStockChartIds, dto.roomId());
    }

	public StockChartDataDto getGameChart(Long memberId, MultiGameChartRequestDto dto){
		StockChart firstDayStockChart = stockChartRepository.findById(dto.firstDayStockChartId()).orElseThrow(
			() -> new BaseExceptionHandler(ErrorCode.NO_SINGLE_GAME_STOCK)
		);
		Long gameLogId = null;
		MultiGameLog multiGameLog
			= MultiGameLog.builder()
			.memberId(memberId)
			.gameId(dto.gameId())
			.stockId(dto.stockId())
			.startDate(firstDayStockChart.getDate())
			.round(dto.roundNumber())
			.build();
		gameLogId = multiGameLogRepository.save(multiGameLog).getId();

		// 게임아이디를 줄것이 아니라, roomId를 줘야한다.
		MultiWaitingRoom multiWaitingRoom = getWaitingRoom(dto.roomId());

		Member member = memberRepository.findById(memberId).orElseThrow(() -> new BaseExceptionHandler(ErrorCode.NOT_FOUND_USER));
		// 첫 게임이 아니라면 이전 게임 결과를 가져오고, 이전 게임을 삭제한다.
		MultiGame multiGame = null;
		MultiGame beforeMultiGame = null;
		MultiGamePlayer multiGamePlayer = null;
		if (dto.roundNumber() != 1) {
			try {
				String key = "multiGame:" + dto.gameId() + ":" + memberId + ":" + (dto.roundNumber() - 1);
				String jsonStr = objectMapper.writeValueAsString(redisTemplate.opsForValue().get(key));
				beforeMultiGame = objectMapper.readValue(jsonStr, MultiGame.class);
			} catch (JsonProcessingException e) {
				throw new RuntimeException(e);
			}

		multiGame = MultiGame.builder()
			.multiGameLogId(gameLogId)
			.memberId(memberId)
			.tradeList(new ArrayList<>())
			.firstDayStockChartId(dto.firstDayStockChartId())
			.roomTitle(multiWaitingRoom.getRoomTitle())
			.password(multiWaitingRoom.getPassword())
			.isOpen(multiWaitingRoom.getIsOpen())
			.cash(beforeMultiGame.getCash())
			.initial(beforeMultiGame.getCash())
			.stockAmount(0)
			.roomId(dto.roomId())
			.totalAsset(beforeMultiGame.getCash())
			.totalPurchaseAmount(0L)
			.averagePrice(0)
			.profit(0)
			.shortAveragePrice(0)
			.shortStockAmount(0)
			.rank(0) //TODO: rank 구현해야함.
			.day(1)
			.round(dto.roundNumber())
			.build();

		multiGamePlayer = MultiGamePlayer.builder()
			.multiGameLog(multiGameLog)
			.member(member)
			.finalProfit(beforeMultiGame.getProfit())
			.finalRoi(100.0 * beforeMultiGame.getProfit() / beforeMultiGame.getInitial())
			.ranking(beforeMultiGame.getRank())
			.build();

		redisTemplate.delete("multiGame:" + dto.gameId() + ":" + memberId + ":" + (dto.roundNumber() - 1));

		} else {

			// 첫게임일때
			multiGame = MultiGame.builder()
				.multiGameLogId(gameLogId)
				.memberId(memberId)
				.firstDayStockChartId(dto.firstDayStockChartId())
				.roomId(dto.roomId())
				.roomTitle(multiWaitingRoom.getRoomTitle())
				.password(multiWaitingRoom.getPassword())
				.isOpen(multiWaitingRoom.getIsOpen())
				.tradeList(new ArrayList<>())
				.cash(1_000_000_0L)
				.initial(1_000_000_0L)
				.stockAmount(0)
				.totalAsset(1_000_000_0L)
				.totalPurchaseAmount(0L)
				.averagePrice(0)
				.profit(0)
				.shortAveragePrice(0)
				.shortStockAmount(0)
				.rank(1)
				.day(1)
				.round(dto.roundNumber())
				.build();

			multiGamePlayer = MultiGamePlayer.builder()
				.multiGameLog(multiGameLog)
				.member(member)
				.finalProfit(0)
				.finalRoi(0.0)
				.ranking(1)
				.build();
		}
		// 각 플레이어의 게임 정보를 Redis에 저장.
		String key = "multiGame:" + dto.gameId() + ":" + memberId + ":" + dto.roundNumber(); // Redis에 저장할 키
		redisTemplate.opsForValue().set(key, multiGame);
		multiGamePlayerRepository.save(multiGamePlayer);


		// 350일치 차트
		List<StockChart> stockChartList = stockChartRepository.findByIdBetween(dto.firstDayStockChartId(), dto.firstDayStockChartId() + 349);

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
        return new StockChartDataDto(dto.stockId(), stockChartDtoList);
	}


    // 공매도 청산
    public MultiTradeResponseDto buy(MultiTradeRequestDto dto, Long memberId) {
        MultiGame currentGame = this.getGame(memberId, dto.gameId());

		// 차트에서 오늘의 종가를 가져온다.
		StockChart todayChart = stockChartRepository.findById(currentGame.getFirstDayStockChartId() + 299 + dto.day())
			.orElseThrow(
				() -> new BaseExceptionHandler(ErrorCode.NO_SINGLE_GAME_STOCK)
			);

		Long stockId = todayChart.getStock().getId();

		// 현재 가진 돈보다 더 많이 요구한다면
		if ((long)dto.amount() * todayChart.getEndPrice() > currentGame.getCash()) {
			throw new BaseExceptionHandler(ErrorCode.NOT_ENOUGH_MONEY);
		}

        // 샀으니 currentGame 바꿔주기
		currentGame.updateAveragePrice((dto.amount() * todayChart.getEndPrice() + currentGame.getAveragePrice() * currentGame.getStockAmount()) / (dto.amount() + currentGame.getStockAmount()));
		currentGame.increaseStockAmount(dto.amount());
		currentGame.updateCash(currentGame.getCash() - (long) (dto.amount() * todayChart.getEndPrice() * 1.0015));
		currentGame.addProfit((-1) * dto.amount() * todayChart.getEndPrice() * 0.0015);
		long totalAsset = currentGame.getCash() + ((long) currentGame.getStockAmount() * todayChart.getEndPrice());
		currentGame.addPurchaseAmount((long) dto.amount() * todayChart.getEndPrice());
		currentGame.updateTotalAsset(totalAsset);

        double resultRoi = 100.0 * currentGame.getProfit() / currentGame.getInitial();

		MultiTrade multiTrade = MultiTrade.builder()
			.tradeType(TradeType.BUY)
			.memberId(memberId)
			.amount(dto.amount())
			.day(dto.day())
			.price(todayChart.getEndPrice())
			.stockQuantity(currentGame.getStockAmount())
			.roi(resultRoi)
			.round(dto.roundNumber())
			.build();

		multiTradeRepository.save(multiTrade);
		currentGame.getTradeList().add(
			new MultiTradeListDto(
				stockId,
				multiTrade.getRound(),
				multiTrade.getDay(),
				multiTrade.getTradeType(),
				multiTrade.getAmount(),
				multiTrade.getPrice(),
				(long) ((-1) * dto.amount() * todayChart.getEndPrice() * 0.0015) // 이번 거래의 profit
			)
		);

		redisTemplate.opsForValue()
			.set("multiGame:" + dto.gameId() + ":" + memberId + ":" + dto.roundNumber(), currentGame);
		return new MultiTradeResponseDto(
			currentGame.getCash(),
			TradeType.BUY,
			multiTrade.getPrice(),
			multiTrade.getAmount(),
			(int)(todayChart.getEndPrice() * dto.amount() * 0.0015),
			currentGame.getProfit(),
			currentGame.getTotalAsset(),
			currentGame.getTradeList()
		);
	}

	public MultiTradeResponseDto sell(MultiTradeRequestDto dto, Long memberId) {
		MultiGame currentGame = this.getGame(memberId, dto.gameId());

		// 차트에서 오늘의 종가를 가져온다.
		StockChart todayChart = stockChartRepository.findById(currentGame.getFirstDayStockChartId() + 299 + dto.day())
			.orElseThrow(
				() -> new BaseExceptionHandler(ErrorCode.NO_SINGLE_GAME_STOCK)
			);

		Long stockId = todayChart.getStock().getId();

		// 현재 수량보다 많으면 에러.
		if (dto.amount() > currentGame.getStockAmount()) {
			throw new BaseExceptionHandler(ErrorCode.NOT_ENOUGH_STOCK_AMOUNT);
		}


		// 팔았으니 currentGame 바꿔주기
		currentGame.decreaseStockAmount(dto.amount());
		currentGame.updateCash(currentGame.getCash() + (long) (dto.amount() * todayChart.getEndPrice() * 0.9975));
		currentGame.addProfit(dto.amount() * (todayChart.getEndPrice() * 0.9975 - currentGame.getAveragePrice()));

		// 총 자산 -> 현금 + 주식 + 공매도주식
		long totalAsset = (long) (currentGame.getCash() + ((long) currentGame.getStockAmount() * (todayChart.getEndPrice() - currentGame.getAveragePrice()) * 0.9975 +
                    ((long) currentGame.getShortStockAmount() * (currentGame.getShortAveragePrice() - todayChart.getEndPrice()) * 0.9975)
                ));
		currentGame.updateTotalAsset(totalAsset);

		double resultRoi = 100.0 * currentGame.getProfit() / currentGame.getInitial();
		MultiTrade multiTrade = MultiTrade.builder()
			.tradeType(TradeType.SELL)
			.memberId(memberId)
			.amount(dto.amount())
			.day(dto.day())
			.price(todayChart.getEndPrice())
			.stockQuantity(currentGame.getStockAmount())
			.roi(resultRoi)
			.round(dto.roundNumber())
			.build();

        multiTradeRepository.save(multiTrade);
        currentGame.getTradeList().add(
            new MultiTradeListDto(
                stockId,
                multiTrade.getRound(),
                multiTrade.getDay(),
                multiTrade.getTradeType(),
                multiTrade.getAmount(),
                multiTrade.getPrice(),
                (long) (todayChart.getEndPrice() * 0.9975 - currentGame.getAveragePrice()) * dto.amount() // 이번 거래의 profit
            )
        );


        redisTemplate.opsForValue().set("multiGame:" + dto.gameId() + ":" + memberId + ":" + dto.roundNumber(), currentGame);
        return new MultiTradeResponseDto(
            currentGame.getCash(),
            TradeType.SELL,
            multiTrade.getPrice(),
            multiTrade.getAmount(),
            (int) (todayChart.getEndPrice() * dto.amount() * 0.0025),
            currentGame.getProfit(),
            currentGame.getTotalAsset(),
            currentGame.getTradeList()
        );
    }

	public MultiTradeResponseDto shortSelling(MultiTradeRequestDto dto, Long memberId) {

		MultiGame currentGame = this.getGame(memberId, dto.gameId());

		// 차트에서 오늘의 종가를 가져온다.
		StockChart todayChart = stockChartRepository.findById(currentGame.getFirstDayStockChartId() + 299 + dto.day())
			.orElseThrow(
				() -> new BaseExceptionHandler(ErrorCode.NO_SINGLE_GAME_STOCK)
			);

		Long stockId = todayChart.getStock().getId();

		if (currentGame.getCash() < (long)todayChart.getEndPrice() * dto.amount()) {
			throw new BaseExceptionHandler(ErrorCode.NOT_ENOUGH_MONEY);
		}

        // 공매도 -> currentGame 바꿔주기
        currentGame.updateShortAveragePrice(
            ((dto.amount() * todayChart.getEndPrice() + currentGame.getShortAveragePrice() * currentGame.getShortStockAmount()) / (dto.amount() + currentGame.getStockAmount())));
        currentGame.updateCash(currentGame.getCash() - (long) (dto.amount() * todayChart.getEndPrice() * 1.0025));
        currentGame.addProfit((-1) * dto.amount() * todayChart.getEndPrice() * 0.0025);
		long totalAsset = (long) (currentGame.getTotalAsset() - dto.amount() * todayChart.getEndPrice() * 0.0025);
		currentGame.updateTotalAsset(totalAsset);
		currentGame.addPurchaseAmount((long)dto.amount() * todayChart.getEndPrice());
		currentGame.increaseShortStockAmount(dto.amount());

        double resultRoi = 100.0 * currentGame.getProfit() / currentGame.getInitial();

		MultiTrade multiTrade = MultiTrade.builder()
			.tradeType(TradeType.SHORT)
			.memberId(memberId)
			.amount(dto.amount())
			.day(dto.day())
			.price(todayChart.getEndPrice())
			.stockQuantity(currentGame.getStockAmount())
			.roi(resultRoi)
			.round(dto.roundNumber())
			.build();

		multiTradeRepository.save(multiTrade);
		currentGame.getTradeList().add(
			new MultiTradeListDto(
				stockId,
				multiTrade.getRound(),
				multiTrade.getDay(),
				multiTrade.getTradeType(),
				multiTrade.getAmount(),
				multiTrade.getPrice(),
				(long)((-1) * dto.amount() * todayChart.getEndPrice() * 0.0025) // 이번 거래의 profit
			)
		);
		redisTemplate.opsForValue()
			.set("multiGame:" + dto.gameId() + ":" + memberId + ":" + dto.roundNumber(), currentGame);
		return new MultiTradeResponseDto(
			currentGame.getCash(),
			TradeType.SHORT,
			multiTrade.getPrice(),
			multiTrade.getAmount(),
			(int)(todayChart.getEndPrice() * dto.amount() * 0.0025),
			currentGame.getProfit(), // 이건 총 Profit
			currentGame.getTotalAsset(),
			currentGame.getTradeList()
		);
	}

	public MultiTradeResponseDto closeShortPosition(MultiTradeRequestDto dto, Long memberId) {
		MultiGame currentGame = this.getGame(memberId, dto.gameId());

		// 차트에서 오늘의 종가를 가져온다.
		StockChart todayChart = stockChartRepository.findById(currentGame.getFirstDayStockChartId() + 299 + dto.day())
			.orElseThrow(
				() -> new BaseExceptionHandler(ErrorCode.NO_SINGLE_GAME_STOCK)
			);

		Long stockId = todayChart.getStock().getId();

		// 현재 수량보다 많으면 에러.
		if (dto.amount() > currentGame.getShortStockAmount()) {
			throw new BaseExceptionHandler(ErrorCode.NOT_ENOUGH_STOCK_AMOUNT);
		}
		// 현재 총 자산 -> 현금 + 현재가 * (주식 + 공매도) //수수료제외
		long totalAsset = currentGame.getCash()
			+ (long)((currentGame.getStockAmount() + currentGame.getShortStockAmount()) * todayChart.getEndPrice()
			* 0.9975);

        // 공매도 처분 - currentGame 바꿔주기
        currentGame.updateCash(currentGame.getCash() + (long) (dto.amount() * todayChart.getEndPrice() * 0.9975));
		currentGame.decreaseShortStockAmount(dto.amount());
        currentGame.updateTotalAsset(totalAsset);
		currentGame.addPurchaseAmount((long) dto.amount() * todayChart.getEndPrice());
		currentGame.updateAveragePrice((dto.amount() * todayChart.getEndPrice() + currentGame.getAveragePrice() * currentGame.getStockAmount()) / (dto.amount() + currentGame.getStockAmount()));
		currentGame.addProfit(dto.amount() * (currentGame.getShortAveragePrice() - todayChart.getEndPrice() * 1.0025)); // 수수료 고려

		double resultRoi = 100.0 * currentGame.getProfit() / currentGame.getInitial();

		MultiTrade multiTrade = MultiTrade.builder()
			.tradeType(TradeType.CLOSE_SHORT)
			.memberId(memberId)
			.amount(dto.amount())
			.day(dto.day())
			.price(todayChart.getEndPrice())
			.stockQuantity(currentGame.getStockAmount())
			.roi(resultRoi)
			.round(dto.roundNumber())
			.build();

		multiTradeRepository.save(multiTrade);
		currentGame.getTradeList().add(
			new MultiTradeListDto(
				stockId,
				multiTrade.getRound(),
				multiTrade.getDay(),
				multiTrade.getTradeType(),
				multiTrade.getAmount(),
				multiTrade.getPrice(),
				(long) (dto.amount() * todayChart.getEndPrice() * 0.0025
				)
			));

		redisTemplate.opsForValue()
			.set("multiGame:" + dto.gameId() + ":" + memberId + ":" + dto.roundNumber(), currentGame);
		return new MultiTradeResponseDto(
			currentGame.getCash(),
			TradeType.CLOSE_SHORT,
			multiTrade.getPrice(),
			multiTrade.getAmount(),
			(int)(todayChart.getEndPrice() * dto.amount() * 0.0025),
			currentGame.getProfit(),
			currentGame.getTotalAsset(),
			currentGame.getTradeList()
		);
	}

    public MultiNextDayResponseDto getTomorrow(MultiNextDayRequestDto dto, Long memberId) {
		log.info("dto.gameId() : {}", dto.gameId());
		log.info("dto.day() : {}", dto.day());
		log.info("dto.roundNumber() : {}", dto.roundNumber());
        MultiGame currentGame = this.getGame(memberId, dto.gameId());

        currentGame.updateDay(dto.day());

        StockChart todayChart = stockChartRepository.findById(currentGame.getFirstDayStockChartId() + 299 + dto.day()).orElseThrow();
        StockChart yesterdayChart = stockChartRepository.findById(currentGame.getFirstDayStockChartId() + 299 + dto.day() - 1).orElseThrow();

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

		// 방의 다른 참여자들에게 현재 진행상황을 전한다.
		MultiWaitingRoom multiWaitingRoom = getWaitingRoom(currentGame.getRoomId());

		for(Long participantId : multiWaitingRoom.getParticipantIds()){
 			template.convertAndSend("/api/sub/" + participantId, new SocketBaseDtoRes<>(SocketType.MULTIGAMEINFO, new MultiGameInfo(memberId, dto.day())));
		}

        if (dto.day() == 51) {

            // 아직 매도하지 않은 물량은 팔아준다.
            totalAssets += (long) ((currentGame.getStockAmount() - currentGame.getShortStockAmount()) * todayChart.getEndPrice() * 0.9975);
            // 강제로 판다. (주식 수량 - 공매도 수량) * (오늘 가격 - 평단가) * 0.9975 // 생각해보니 주식수량과 공매도 수량은 공존할 수 없음.
			currentGame.addProfit((currentGame.getStockAmount() - currentGame.getShortStockAmount()) * (todayChart.getEndPrice() - currentGame.getAveragePrice()) * 0.9975);

            currentGame.updateCash(totalAssets);

            String key = "multiGame:" + dto.gameId() + ":" + memberId + ":" + dto.roundNumber(); // Redis에 저장할 키
            redisTemplate.opsForValue().set(key, currentGame);

            // roi : (총수익) / (총 투자한 돈) * 100

            double roi = currentGame.getTotalPurchaseAmount() == 0L ? 0 :
                (100.0 * (currentGame.getProfit()+
                    (currentGame.getStockAmount() * (todayChart.getEndPrice() - currentGame.getAveragePrice())) +
					1.0 * (currentGame.getShortStockAmount() * (currentGame.getShortAveragePrice() - todayChart.getEndPrice()))
                    / currentGame.getTotalPurchaseAmount()));
            MultiGameResultDto multiGameResult = new MultiGameResultDto(
                memberId,
                memberRepository.findById(memberId).orElseThrow(() -> new BaseExceptionHandler(ErrorCode.NOT_FOUND_USER)).getNickname(),

                stockRepository.findById(todayChart.getStock().getId()).orElseThrow(
                    () -> new BaseExceptionHandler(ErrorCode.NO_SINGLE_GAME_STOCK)
                ).getStockName(),
				1,
                stockChartRepository.findById(currentGame.getFirstDayStockChartId()).orElseThrow(
                    () -> new BaseExceptionHandler(ErrorCode.NO_SINGLE_GAME_STOCK)
                ).getDate(),
                stockChartRepository.findById(currentGame.getFirstDayStockChartId() + 349).orElseThrow(
                    () -> new BaseExceptionHandler(ErrorCode.NO_SINGLE_GAME_STOCK)
                ).getDate(),
                (long) currentGame.getProfit(), roi, dto.roundNumber()
            );

			MultiGameLog multiGameLog = multiGameLogRepository.findByMemberIdAndGameIdAndRound(memberId, dto.gameId(), dto.roundNumber())
				.orElseThrow(() -> new BaseExceptionHandler(ErrorCode.BAD_REQUEST_ERROR));
            MultiGamePlayer memberGamePlayer = multiGamePlayerRepository.findByMultiGameLog_IdAndMember_Id(multiGameLog.getId(), memberId)
				.orElseThrow(() -> new BaseExceptionHandler(ErrorCode.NOT_FOUND_USER));

            memberGamePlayer.updateFinalProfit(currentGame.getProfit());
            memberGamePlayer.updateFinalRoi(100.0 * currentGame.getProfit() / currentGame.getInitial());

			if (currentGame.getMaxRound() == dto.roundNumber()) {
				redisTemplate.delete("multiGame:" + dto.gameId() + ":" + memberId + ":" + dto.roundNumber());
			}

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
		try {
			String jsonStr = objectMapper.writeValueAsString(redisTemplate.opsForValue().get("multiGame:" + roomId));
			return objectMapper.readValue(jsonStr, MultiWaitingRoom.class);
		} catch (Exception e) {
			e.printStackTrace();
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
				String jsonStr = objectMapper.writeValueAsString(
					redisTemplate.opsForValue().get("multiGame:" + gameId + ":" + memberId + ":" + maxNumber));
				return objectMapper.readValue(jsonStr, MultiGame.class);
			} catch (Exception e) {
				e.printStackTrace();
			}

		}
		return null;
	}

    public List<MultiGameResultDto> getSubResult(Long memberId, MultiGameSubResultRequestDto dto) {
        MultiGameLog multiGameLog = multiGameLogRepository.findByMemberIdAndGameIdAndRound(memberId, dto.gameId(), dto.roundNumber())
            .orElseThrow(() -> new BaseExceptionHandler(ErrorCode.BAD_REQUEST_ERROR));

        List<MultiGamePlayer> multiGamePlayers = multiGameLog.getMultiGamePlayers();
        List<Long> memberIds = multiGamePlayers.stream()
            .map(MultiGamePlayer::getMember)
            .map(Member::getId)
            .toList();

        String stockName = stockRepository.findById(multiGameLog.getStockId()).orElseThrow(
            () -> new BaseExceptionHandler(ErrorCode.NO_SINGLE_GAME_STOCK)
        ).getStockName();
        StockChart firstDayStockChart = stockChartRepository.findByStock_IdAndDate(multiGameLog.getStockId(), multiGameLog.getStartDate())
            .orElseThrow(() -> new BaseExceptionHandler(ErrorCode.NO_SINGLE_LOG_STOCK_CHART));
        StockChart lastDayStockChart = stockChartRepository.findById(firstDayStockChart.getId() + 349)
            .orElseThrow(() -> new BaseExceptionHandler(ErrorCode.NO_SINGLE_LOG_STOCK_CHART));

        List<MultiGameResultDto> result = new ArrayList<>();


        Map<Long, Integer> map = new HashMap<>(); // 랭크를 담을 map
        // 결과를 보여달라고 할 때 랭크를 설정해서 보여준다.
        if (dto.roundNumber() != 1) {
            Long finalGameId = dto.gameId();
            List<MultiGame> multiGames = new ArrayList<>(memberIds.stream().map(playerId -> {
                try {
                    String jsonStr = objectMapper.writeValueAsString(redisTemplate.opsForValue().get("multiGame:" + finalGameId + ":" + playerId + ":" + (dto.roundNumber())));
                    return objectMapper.readValue(jsonStr, MultiGame.class);
                } catch (JsonProcessingException e) {
                    throw new RuntimeException(e);
                }
            }).toList());

            // Sort players by profit in descending order
            multiGames.sort(Comparator.comparing(MultiGame::getProfit).reversed());
            for (int i = 0; i < multiGames.size(); i++) {
                map.put(multiGames.get(i).getMemberId(), i + 1);
            }

            // 정산할 때 rank를 바꿔준다. -> 새로 API 요청!
            MultiGameLog beforeMultigameLog = multiGameLogRepository.findByMemberIdAndGameIdAndRound(memberId, dto.gameId(), dto.roundNumber())
                .orElseThrow(() -> new BaseExceptionHandler(ErrorCode.BAD_REQUEST_ERROR));
            List<MultiGamePlayer> beforeMultiGameLogMultiGamePlayers = beforeMultigameLog.getMultiGamePlayers();

            for (MultiGamePlayer gamePlayer : beforeMultiGameLogMultiGamePlayers) {
                gamePlayer.updateRanking(map.get(gamePlayer.getMember().getId()));
            }
        }

        for (MultiGamePlayer multiGamePlayer : multiGamePlayers) {
            MultiGameResultDto multiGameResultDto = new MultiGameResultDto(
                multiGamePlayer.getMember().getId(),
                multiGamePlayer.getMember().getNickname(),
                stockName,
                multiGamePlayer.getRanking(),
                multiGameLog.getStartDate(),
                lastDayStockChart.getDate(),
                (long) multiGamePlayer.getFinalProfit(),
                multiGamePlayer.getFinalRoi(),
                dto.roundNumber());

            result.add(multiGameResultDto);
        }

        return result;
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

		for (MultiGameLog multiGameLog : collect) {
			int round = multiGameLog.getRound();

			// 특정 게임, 라운드의 플레이어들 마다!
			List<MultiGamePlayer> multiGamePlayers = multiGameLog.getMultiGamePlayers();
			String stockName = stockRepository.findById(multiGameLog.getStockId()).orElseThrow(
				() -> new BaseExceptionHandler(ErrorCode.NO_SINGLE_GAME_STOCK)
			).getStockName();
			StockChart firstDayStockChart = stockChartRepository.findByStock_IdAndDate(multiGameLog.getStockId(),
					multiGameLog.getStartDate())
				.orElseThrow(() -> new BaseExceptionHandler(ErrorCode.NO_SINGLE_LOG_STOCK_CHART));
			StockChart lastDayStockChart = stockChartRepository.findById(firstDayStockChart.getId() + 349)
				.orElseThrow(() -> new BaseExceptionHandler(ErrorCode.NO_SINGLE_LOG_STOCK_CHART));

            for (MultiGamePlayer multiGamePlayer : multiGamePlayers) {
                MultiGameResultDto multiGameResultDto = new MultiGameResultDto(
                    multiGamePlayer.getMember().getId(),
                    multiGamePlayer.getMember().getNickname(),
                    stockName,
                    1,
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
					(long)totalProfit + 10_000_000,
					100.0 * totalProfit / 10_000_000
				);
			})
			.toList();
		return new MultiGameFinalResultDto(multiGameResult, totalResult);
	}

	private int calculateRankPoint(int totalPlayers, int rank) {
		int[] points;
		if (totalPlayers == 6) {
			points = new int[] {0, 15, 10, 5, 0, -5, -10};
		} else if (totalPlayers == 5) {
			points = new int[] {0, 11, 5, 2, -1, -5};
		} else if (totalPlayers == 4) {
			points = new int[] {0, 6, 3, -1, -5};
		} else if (totalPlayers == 3) {
			points = new int[] {0, 4, 1, -3};
		} else if (totalPlayers == 2) {
			points = new int[] {0, 3, -1};
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

	public MultiLogResponseDto getMultiGameLog(Long multiGameLogId, Long memberId) {
		MultiGameLog multiGameLog = multiGameLogRepository.findById(multiGameLogId)
			.orElseThrow(() -> new BaseExceptionHandler(ErrorCode.NO_MULTI_GAME_LOG));
		//1. 종목 이름 가져오기
		Stock stock = stockRepository.findById(multiGameLog.getStockId())
			.orElseThrow(() -> new BaseExceptionHandler(ErrorCode.NO_MULTI_GAME_LOG_STOCK));

		//2. 해당 종목에 대한 차트 350개 넣기
		//어떤 종목의 시작일 하나에 대한 StockChart 값 얻기
		LocalDateTime startDateTime = multiGameLog.getStartDate().withHour(0).withMinute(0).withSecond(0);

        log.info("[getMultiGameLog] stock.getStockCode(): " + stock.getStockCode());
        log.info("[getMultiGameLog] startDateTime: " + startDateTime);

        StockChart stockChart = stockChartRepository.findByStock_StockCodeAndDateBetween(stock.getStockCode(), startDateTime, startDateTime.plusDays(1)).orElseThrow(
            () -> new BaseExceptionHandler(ErrorCode.NO_SINGLE_LOG_STOCK_CHART)
        );
        log.info("[getMultiGameLog] stockChart.getId(): " + stockChart.getId());
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

		//3. 나의 매매내역 가져오기
		List<MultiLogTradeDto> tradeList = getMultiLogTradeList(multiGameLogId, memberId);

        //4. 다른 플레이어들의 정보(매매정보포함) 가져오기 - 나를 제외한
        List<MultiLogMemberDto> multiLogMemberDtoList = multiGamePlayerRepository.findAllByMultiGameLog_Id(multiGameLogId).stream().filter(
            multiGamePlayer -> multiGamePlayer.getMember().getId() != memberId
        ).map(
            multiGamePlayer -> new MultiLogMemberDto(
                multiGamePlayer.getMember().getId(),
                multiGamePlayer.getMember().getNickname(),
                multiGamePlayer.getFinalRoi(),
                multiGamePlayer.getMember().getRankPoint(),
                getMultiLogTradeList(multiGameLogId, multiGamePlayer.getMember().getId())
            )
        ).toList();

        return new MultiLogResponseDto(
            stock.getStockName(),
			stock.getStockCode(),
            stockChartDtoList,
            tradeList,
            multiLogMemberDtoList
        );
    }

    private List<MultiLogTradeDto> getMultiLogTradeList(Long multiGameLogId, Long memberId) {
        List<MultiTrade> multiTradeList = multiTradeRepository.findAllByMultiGameLog_IdAndMemberId(multiGameLogId, memberId);
        List<MultiLogTradeDto> tradeList = multiTradeList.stream().map(
            multiTrade -> new MultiLogTradeDto(
                multiTrade.getDay(),
                multiTrade.getTradeType(),
                multiTrade.getAmount(),
                multiTrade.getPrice(),
                multiTrade.getRoi()
            )
        ).toList();
        return tradeList;
    }
}
