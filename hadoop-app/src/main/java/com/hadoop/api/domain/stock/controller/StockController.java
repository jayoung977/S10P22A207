package com.hadoop.api.domain.stock.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hadoop.api.domain.stock.dto.StockRes;
import com.hadoop.api.domain.stock.service.StockService;
import com.hadoop.api.global.common.BaseResponse;
import com.hadoop.api.global.common.code.SuccessCode;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;

@RestController
@Log4j2
@RequestMapping("/hadoop/stock")
@RequiredArgsConstructor
public class StockController {

	private final StockService stockService;

	@GetMapping("/get")
	public ResponseEntity<BaseResponse<List<StockRes>>> getStockData() {
		List<StockRes> stockResList = stockService.getStockData();
		return BaseResponse.success(SuccessCode.SELECT_SUCCESS, stockResList);
	}

	@PostMapping("/create")
	public ResponseEntity<BaseResponse<String>> createStockData(@RequestBody String temp) {
		String jsonData = stockService.createStockData();
		return BaseResponse.success(SuccessCode.INSERT_SUCCESS, jsonData);
	}
}