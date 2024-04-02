package com.backend.api.domain.hadoop.service;

import java.time.format.DateTimeFormatter;
import java.util.List;

import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import com.backend.api.domain.fund.entity.FundTrade;
import com.backend.api.domain.hadoop.dto.ApiTradeLogDto;
import com.backend.api.domain.hadoop.dto.ChangeRateCountDto;
import com.backend.api.domain.hadoop.dto.ChangeRateResponseDto;
import com.backend.api.domain.hadoop.dto.MaxDataDto;
import com.backend.api.domain.hadoop.dto.MaxDataResponseDto;
import com.backend.api.domain.hadoop.dto.MaxMinPriceDto;
import com.backend.api.domain.hadoop.dto.MaxMinResponseDto;
import com.backend.api.domain.hadoop.dto.MinDataDto;
import com.backend.api.domain.hadoop.dto.MinDataResponseDto;
import com.backend.api.domain.hadoop.dto.StockRes;
import com.backend.api.domain.hadoop.dto.StockResponseDto;
import com.backend.api.domain.hadoop.dto.TradeLogDto;
import com.backend.api.domain.hadoop.dto.TradeLogResponseDto;
import com.backend.api.domain.member.entity.Member;
import com.backend.api.domain.member.repository.MemberRepository;
import com.backend.api.domain.single.entity.SingleTrade;
import com.backend.api.global.common.code.ErrorCode;
import com.backend.api.global.exception.BaseExceptionHandler;
import com.backend.api.global.security.userdetails.CustomUserDetails;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;

@Log4j2
@Service
@RequiredArgsConstructor
public class HadoopService {

	private final WebClient webClient;
	private final MemberRepository memberRepository;

	public List<StockRes> getStockData(int page, int pageSize, String stockCode){
		// WebClient webClient = WebClient.create();
		log.info("webClient 생성 완료");
		String uri = "/hadoop/stock/get";
		//WebClient  요청
		StockResponseDto response = webClient.get()
			.uri(uriBuilder -> uriBuilder
				.path(uri)
				.queryParam("page", page)
				.queryParam("pageSize", pageSize)
				.queryParam("stockCode", stockCode)
				.build())
			.retrieve()
			.bodyToMono(StockResponseDto.class)
			.blockOptional()
			.orElseThrow(() -> new RuntimeException("Failed to retrieve stock data from hadoop-app"));

		log.info("service result mono: {}", response);
		return response.getResult();
	}

	public List<StockRes> getStockDataStartEnd(String startDate, String endDate, String stockCode){
		log.info("webClient 생성 완료");
		String uri = "/hadoop/stock/get/start-end";
		//WebClient  요청
		StockResponseDto response = webClient.get()
			.uri(uriBuilder -> uriBuilder
				.path(uri)
				.queryParam("startDate", startDate)
				.queryParam("endDate", endDate)
				.queryParam("stockCode", stockCode)
				.build())
			.retrieve()
			.bodyToMono(StockResponseDto.class)
			.blockOptional()
			.orElseThrow(() -> new RuntimeException("Failed to retrieve stock data from hadoop-app"));

		log.info("service result mono: {}", response);
		return response.getResult();
	}

	public List<MaxMinPriceDto> getMaxMinPrice(String startDate, String endDate, String stockCode){
		log.info("webClient 생성 완료");
		String uri = "/hadoop/stock/max-min";
		//WebClient  요청
		MaxMinResponseDto response = webClient.get()
			.uri(uriBuilder -> uriBuilder
				.path(uri)
				.queryParam("startDate", startDate)
				.queryParam("endDate", endDate)
				.queryParam("stockCode", stockCode)
				.build())
			.retrieve()
			.bodyToMono(MaxMinResponseDto.class)
			.blockOptional()
			.orElseThrow(() -> new RuntimeException("Failed to retrieve stock data from hadoop-app"));

		log.info("service result mono: {}", response);
		return response.getResult();
	}

	public List<MaxDataDto> getMaxDate(String startDate, String endDate, String stockCode, int maxPrice){
		log.info("webClient 생성 완료");
		String uri = "/hadoop/stock/max-date";

		//WebClient  요청
		MaxDataResponseDto response = webClient.get()
			.uri(uriBuilder -> uriBuilder
				.path(uri)
				.queryParam("startDate", startDate)
				.queryParam("endDate", endDate)
				.queryParam("stockCode", stockCode)
				.queryParam("maxPrice", maxPrice)
				.build())
			.retrieve()
			.bodyToMono(MaxDataResponseDto.class)
			.blockOptional()
			.orElseThrow(() -> new RuntimeException("Failed to retrieve stock data from hadoop-app"));

		log.info("service result mono: {}", response);
		return response.getResult();
	}

	public List<MinDataDto> getMinDate(String startDate, String endDate, String stockCode, int minPrice){
		log.info("webClient 생성 완료");
		String uri = "/hadoop/stock/min-date";
		//WebClient  요청
		MinDataResponseDto response = webClient.get()
			.uri(uriBuilder -> uriBuilder
				.path(uri)
				.queryParam("startDate", startDate)
				.queryParam("endDate", endDate)
				.queryParam("stockCode", stockCode)
				.queryParam("minPrice", minPrice)
				.build())
			.retrieve()
			.bodyToMono(MinDataResponseDto.class)
			.blockOptional()
			.orElseThrow(() -> new RuntimeException("Failed to retrieve stock data from hadoop-app"));

		log.info("service result mono: {}", response);
		return response.getResult();
	}

	public List<ChangeRateCountDto> getChangeRateCount(String stockCode){
		log.info("webClient 생성 완료");
		String uri = "/hadoop/stock/change-count";
		//WebClient  요청
		ChangeRateResponseDto response = webClient.get()
			.uri(uriBuilder -> uriBuilder
				.path(uri)
				.queryParam("stockCode", stockCode)
				.build())
			.retrieve()
			.bodyToMono(ChangeRateResponseDto.class)
			.blockOptional()
			.orElseThrow(() -> new RuntimeException("Failed to retrieve stock data from hadoop-app"));

		log.info("service result mono: {}", response);
		return response.getResult();
	}

	public List<ChangeRateCountDto> getChangeRateCountStartEnd(String startDate, String endDate, String stockCode){
		log.info("webClient 생성 완료");
		String uri = "/hadoop/stock/change-count/start-end";
		//WebClient  요청
		ChangeRateResponseDto response = webClient.get()
			.uri(uriBuilder -> uriBuilder
				.path(uri)
				.queryParam("startDate", startDate)
				.queryParam("endDate", endDate)
				.queryParam("stockCode", stockCode)
				.build())
			.retrieve()
			.bodyToMono(ChangeRateResponseDto.class)
			.blockOptional()
			.orElseThrow(() -> new RuntimeException("Failed to retrieve stock data from hadoop-app"));

		log.info("service result mono: {}", response);
		return response.getResult();
	}

	public List<TradeLogDto> getTradeLog() {
		String uri = "hadoop/trade/get";
		TradeLogResponseDto response = webClient.get()
			.uri(uri)
			.retrieve()
			.bodyToMono(TradeLogResponseDto.class)
			.blockOptional()
			.orElseThrow(() -> new RuntimeException("Failed to retrieve trade logs from hadoop-app"));
		log.info("service result mono: {}", response);
		return response.getResult();
	}

	@Async
	public void saveSingleTradeLogHdfs(SingleTrade trade, Long loginUserId) {

		//거래 내역 생성
		TradeLogDto tradeLogDto = convertSingleToTradeLogDto(trade, loginUserId);
		// ApiTradeLogDto 생성
		ApiTradeLogDto apiTradeDto = ApiTradeLogDto.builder()
			.tradeLogList(List.of(tradeLogDto))
			.build();

		// WebClient webClient = WebClient.create();
		log.info("webClient 생성 완료");
		//WebClient  요청
		String uri = "/hadoop/trade/save";
		String result = webClient.post()
			.uri(uri)
			.bodyValue(apiTradeDto)
			.retrieve()
			.bodyToMono(String.class)
			.block();
		log.info("service result mono: {}", result);
	}

	public void saveFundTradeLogHdfs(FundTrade trade, Long loginUserId) {
		//거래 내역 생성
		TradeLogDto tradeLogDto = convertFundToTradeLogDto(trade, loginUserId);
		// ApiTradeLogDto 생성
		ApiTradeLogDto apiTradeDto = ApiTradeLogDto.builder()
			.tradeLogList(List.of(tradeLogDto))
			.build();

		// WebClient webClient = WebClient.create();
		log.info("webClient 생성 완료");
		//WebClient  요청
		String uri = "/hadoop/trade/save";
		String result = webClient.post()
			.uri(uri)
			.bodyValue(apiTradeDto)
			.retrieve()
			.bodyToMono(String.class)
			.block();
		log.info("service result mono: {}", result);
	}


	private TradeLogDto convertSingleToTradeLogDto(SingleTrade trade, Long loginUserId) {
		Member member = memberRepository.findById(loginUserId).orElseThrow(
			() -> new BaseExceptionHandler(ErrorCode.NOT_FOUND_ERROR)
		);
		log.info("convertToTradeLogDto : userDetails : {} {}", member.getId(), member.getNickname());
		return TradeLogDto.builder()
			.stockCode(trade.getSingleGameStock().getStock().getStockCode())
			.stockName(trade.getSingleGameStock().getStock().getStockName())
			.price(trade.getPrice())
			.date(trade.getDate().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")))
			.tradeType(trade.getTradeType().toString())
			.amount(trade.getAmount())
			.stockQuantity(trade.getStockQuantity())
			.roi(trade.getRoi())
			.profit(trade.getProfit())
			.memberId(member.getId())
			.memberName(member.getNickname())
			.build();
	}

	private TradeLogDto convertFundToTradeLogDto(FundTrade trade, Long loginUserId) {
		Member member = memberRepository.findById(loginUserId).orElseThrow(
			() -> new BaseExceptionHandler(ErrorCode.NOT_FOUND_ERROR)
		);
		log.info("convertToTradeLogDto : userDetails : {} {}", member.getId(), member.getNickname());
		return TradeLogDto.builder()
			.stockCode(trade.getStock().getStockCode())
			.stockName(trade.getStock().getStockName())
			.price(trade.getTradePrice())
			.date(trade.getTradeDate().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")))
			.tradeType(trade.getTradeType().toString())
			.amount(trade.getTradeAmount())
			.stockQuantity(trade.getStockQuantity())
			.roi(trade.getRoi())
			.profit(trade.getProfit())
			.memberId(member.getId())
			.memberName(member.getNickname())
			.build();
	}
}


