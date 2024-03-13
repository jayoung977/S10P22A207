package com.backend.api.domain.fund.dto.response;

import io.swagger.v3.oas.annotations.media.Schema;

@Schema(name = "펀드 거래 response Dto", description = "펀드 거래 관련 response Dto")
public record FundTradeRes(
	@Schema(description = "펀드 매매 id")
	Long fundTradeId,
	@Schema(description = "펀드 id")
	Long fundId,
	@Schema(description = "주식 이름")
	String stockName,
	@Schema(description = "매매량")
	Integer tradeAmount,
	@Schema(description = "매매가격")
	Integer tradePrice,
	@Schema(description = "매매타입")
	String tradeType,
	@Schema(description = "매매일자")
	String tradeDate,
	@Schema(description = "매매수익률")
	Double roi,
	@Schema(description = "수익금")
	Long profit
) {
}
