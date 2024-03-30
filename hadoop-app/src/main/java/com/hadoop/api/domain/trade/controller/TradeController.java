package com.hadoop.api.domain.trade.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hadoop.api.domain.trade.dto.ApiTradeLogDto;
import com.hadoop.api.domain.trade.dto.TradeLogDto;
import com.hadoop.api.domain.trade.service.TradeService;
import com.hadoop.api.global.common.BaseResponse;
import com.hadoop.api.global.common.code.SuccessCode;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;

@RestController
@Log4j2
@RequestMapping("/hadoop/trade")
@RequiredArgsConstructor
public class TradeController {
	private final TradeService tradeService;

	@GetMapping("/get")
	public ResponseEntity<BaseResponse<List<TradeLogDto>>> getTradeLog() {
		List<TradeLogDto> tradeLogList = tradeService.getTradeLog();
		return BaseResponse.success(SuccessCode.SELECT_SUCCESS, tradeLogList);
	}

	@PostMapping("/save")
	public ResponseEntity<BaseResponse<String>> saveTradeLog(@RequestBody ApiTradeLogDto apiTradeLogDto) {
		tradeService.saveTradeLog(apiTradeLogDto);
		return BaseResponse.success(SuccessCode.INSERT_SUCCESS, "거래 기록 저장 성공");
	}
}