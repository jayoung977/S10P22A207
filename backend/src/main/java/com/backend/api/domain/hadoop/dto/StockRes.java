package com.backend.api.domain.hadoop.dto;

import io.swagger.v3.oas.annotations.media.Schema;

public record StockRes(
	@Schema(description = "주식 코드")
	String stockCode,
	@Schema(description = "주식 이름")
	String stockName,
	@Schema(description = "시가")
	Integer marketPrice,
	@Schema(description = "고가")
	Integer highPrice,
	@Schema(description = "저가")
	Integer lowPrice,
	@Schema(description = "종가")
	Integer endPrice,
	@Schema(description = "거래량")
	Long tradingVolume,
	@Schema(description = "날짜")
	String date,
	@Schema(description = "변동률")
	Double changeRate
) {
}
