package com.hadoop.api.domain.stock.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.hadoop.api.domain.stock.dto.ChangeRateCountDto;
import com.hadoop.api.domain.stock.dto.MaxDataDto;
import com.hadoop.api.domain.stock.dto.MaxMinPriceDto;
import com.hadoop.api.domain.stock.dto.MinDataDto;
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
	public ResponseEntity<BaseResponse<List<StockRes>>> getStockData(
		@RequestParam(defaultValue = "1") int page,
		@RequestParam int pageSize, @RequestParam String stockCode){
		List<StockRes> stockResList = stockService.getStockData(page, pageSize, stockCode);
		return BaseResponse.success(SuccessCode.SELECT_SUCCESS, stockResList);
	}

	@GetMapping("/max-min")
	public ResponseEntity<BaseResponse<List<MaxMinPriceDto>>> getMaxMinPrice(@RequestParam String stockCode){
		List<MaxMinPriceDto> maxMinPriceDto = stockService.getMaxMinPrice(stockCode);
		return BaseResponse.success(SuccessCode.SELECT_SUCCESS, maxMinPriceDto);
	}

	@GetMapping("/max-date")
	public ResponseEntity<BaseResponse<List<MaxDataDto>>> getMaxDate(@RequestParam String stockCode, @RequestParam int maxPrice){
		List<MaxDataDto> maxMinPriceDto = stockService.getMaxDate(stockCode, maxPrice);
		return BaseResponse.success(SuccessCode.SELECT_SUCCESS, maxMinPriceDto);
	}

	@GetMapping("/min-date")
	public ResponseEntity<BaseResponse<List<MinDataDto>>> getMinDate(@RequestParam String stockCode, @RequestParam int minPrice){
		List<MinDataDto> maxMinPriceDto = stockService.getMinDate(stockCode, minPrice);
		return BaseResponse.success(SuccessCode.SELECT_SUCCESS, maxMinPriceDto);
	}

	@GetMapping("/change-count")
	public ResponseEntity<BaseResponse<List<ChangeRateCountDto>>> getChangeRateCount(@RequestParam String stockCode){
		List<ChangeRateCountDto> changeRateCountDto = stockService.getChangeRateCount(stockCode);
		return BaseResponse.success(SuccessCode.SELECT_SUCCESS, changeRateCountDto);
	}
	@GetMapping("/partition")
	public ResponseEntity<BaseResponse<String>> partitionParquetByStockCod() {
		stockService.partitionParquetByStockCode();
		return BaseResponse.success(SuccessCode.INSERT_SUCCESS, "Success to partition parquet by stockCode");
	}
}