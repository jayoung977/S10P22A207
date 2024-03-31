package com.backend.api.domain.hadoop.controller;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.backend.api.domain.hadoop.dto.ChangeRateCountDto;
import com.backend.api.domain.hadoop.dto.MaxDataDto;
import com.backend.api.domain.hadoop.dto.MaxMinPriceDto;
import com.backend.api.domain.hadoop.dto.MinDataDto;
import com.backend.api.domain.hadoop.dto.StockRes;
import com.backend.api.domain.hadoop.dto.TradeLogDto;
import com.backend.api.domain.hadoop.service.HadoopService;
import com.backend.api.domain.single.entity.SingleGameStock;
import com.backend.api.domain.single.entity.SingleTrade;
import com.backend.api.domain.stock.entity.Stock;
import com.backend.api.global.common.BaseResponse;
import com.backend.api.global.common.code.SuccessCode;
import com.backend.api.global.common.type.TradeType;
import com.backend.api.global.security.userdetails.CustomUserDetails;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;

@Log4j2
@RestController
@RequestMapping("/hadoop/")
@RequiredArgsConstructor
@Tag(name = "하둡", description = "하둡 관련 API")
public class HadoopController {
	private final HadoopService hadoopService;

	@Operation(
		summary = "하둡 주식 조회"
	)
	@GetMapping("/stock/get")
	public ResponseEntity<BaseResponse<List<StockRes>>> getStockRes(
		@RequestParam(defaultValue = "0") int page,
		@RequestParam(defaultValue = "10") int size,
		@RequestParam String stockCode) {
		log.info("Controller getStockRes");

		Pageable pageable = PageRequest.of(page, size);
		List<StockRes> stockDataList = hadoopService.getStockData(pageable.getPageNumber() + 1, pageable.getPageSize(), stockCode);
		log.info("controller result show: {} {} {} {}", page, size, stockCode, stockDataList.size());
		return BaseResponse.success(SuccessCode.CHECK_SUCCESS, stockDataList);
	}

	@Operation(
		summary = "하둡 최대가격 최소가격 조회"
	)
	@GetMapping("/stock/max-min")
	public ResponseEntity<BaseResponse<List<MaxMinPriceDto>>> getMaxMinPrice(
		@RequestParam String stockCode) {
		log.info("Controller getMaxMinPrice");

		List<MaxMinPriceDto> MaxMinPriceDtoList = hadoopService.getMaxMinPrice(stockCode);
		log.info("controller result show: {} {}",stockCode, MaxMinPriceDtoList.size());
		return BaseResponse.success(SuccessCode.CHECK_SUCCESS, MaxMinPriceDtoList);
	}
	@Operation(
		summary = "하둡 최대 가격 날짜 조회"
	)
	@GetMapping("/stock/max-date")
	public ResponseEntity<BaseResponse<List<MaxDataDto>>> getMaxDate(
		@RequestParam String stockCode,
		@RequestParam int maxPrice) {
		log.info("Controller getMaxMinPrice");

		List<MaxDataDto> MaxDataDtoList = hadoopService.getMaxDate(stockCode, maxPrice);
		log.info("controller result show: {} {}",stockCode, MaxDataDtoList.size());
		return BaseResponse.success(SuccessCode.CHECK_SUCCESS, MaxDataDtoList);
	}

	@Operation(
		summary = "하둡 최소 가격 날짜 조회"
	)
	@GetMapping("/stock/min-date")
	public ResponseEntity<BaseResponse<List<MinDataDto>>> getMinDate(
		@RequestParam String stockCode,
		@RequestParam int minPrice) {
		log.info("Controller getMaxMinPrice");

		List<MinDataDto> MinDataDtoList = hadoopService.getMinDate(stockCode, minPrice);
		log.info("controller result show: {} {}",stockCode, MinDataDtoList.size());
		return BaseResponse.success(SuccessCode.CHECK_SUCCESS, MinDataDtoList);
	}

	@Operation(
		summary = "하둡 등락률 개수 조회"
	)
	@GetMapping("/stock/change-count")
	public ResponseEntity<BaseResponse<List<ChangeRateCountDto>>> getChangeRateCount(
		@RequestParam String stockCode) {
		log.info("Controller getChangeRateCount");

		List<ChangeRateCountDto> ChangeRateCountDtoList = hadoopService.getChangeRateCount(stockCode);
		log.info("controller result show: {} {}",stockCode, ChangeRateCountDtoList.size());
		return BaseResponse.success(SuccessCode.CHECK_SUCCESS, ChangeRateCountDtoList);
	}

	@GetMapping("/trade/get")
	public ResponseEntity<BaseResponse<List<TradeLogDto>>> getTradeLog() {
		log.info("Controller getTradeLog");
		List<TradeLogDto> result = hadoopService.getTradeLog();
		log.info("controller result show: {}", result.toString());
		return BaseResponse.success(
			SuccessCode.CHECK_SUCCESS,
			result
		);
	}

	@PostMapping("/trade/save")
	public ResponseEntity<BaseResponse<String>> saveTradeLog(@AuthenticationPrincipal CustomUserDetails userDetails) {
		log.info("Controller saveTradeLog");
		SingleTrade singleTrade = SingleTrade.builder()
			.singleGameStock(SingleGameStock.builder()
				.singleGameLog(null)
				.stock(Stock.builder()
					.stockName("삼성전자")
					.stockCode("005930")
					.build())
				.roi(0D)
				.profit(0)
				.averagePurchasePrice(0)
				.build())
			.date(LocalDateTime.now())
			.tradeType(TradeType.BUY)
			.amount(1)
			.price(1000)
			.stockQuantity(1)
			.roi(0D)
			.profit(0L)
			.build();
		hadoopService.saveSingleTradeLogHdfs(singleTrade, userDetails);
		return BaseResponse.success(
			SuccessCode.CHECK_SUCCESS,
			"하둡 저장 끝"
		);
	}

}
