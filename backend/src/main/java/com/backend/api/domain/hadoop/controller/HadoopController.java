package com.backend.api.domain.hadoop.controller;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.backend.api.domain.hadoop.dto.TradeLogDto;
import com.backend.api.domain.hadoop.service.HadoopService;
import com.backend.api.domain.single.entity.SingleGameStock;
import com.backend.api.domain.single.entity.SingleTrade;
import com.backend.api.domain.hadoop.dto.StockRes;
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
@RequestMapping("/hadoop/test")
@RequiredArgsConstructor
@Tag(name = "하둡", description = "하둡 관련 API")
public class HadoopController {
	private final HadoopService hadoopService;

	@Operation(
		summary = "하둡테스트"
	)
	@GetMapping("/stock/get")
	public ResponseEntity<BaseResponse<List<StockRes>>> getStockRes() {
		log.info("Controller getStockRes");
		List<StockRes> result = hadoopService.getStockData();
		log.info("controller result show: {}", result.toString());
		return BaseResponse.success(
			SuccessCode.CHECK_SUCCESS,
			result
		);
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
	public ResponseEntity<BaseResponse<String>> saveTradeLog(@AuthenticationPrincipal CustomUserDetails userDetails){
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

	// @GetMapping("")
	// public ResponseEntity<BaseResponse<List<StockRes>>> createStockTradeLog(@AuthenticationPrincipal CustomUserDetails userDetails){
	// 	var result = hadoopService.createStockTradeLog(userDetails.getId());
	// 	return BaseResponse.success(
	// 		SuccessCode.CHECK_SUCCESS,
	// 		result
	// 	);
	// }
}
