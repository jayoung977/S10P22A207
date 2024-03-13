package com.backend.api.domain.fund.dto.response;

import io.swagger.v3.oas.annotations.media.Schema;

@Schema(name = "펀드 보유 주식 response Dto", description = "펀드 보유 주식 관련 response Dto")
public record FundStockRes(
	@Schema(description = "주식 id")
	Long stockId,
	@Schema(description = "주식명")
	String stockName,
	@Schema(description = "주식개수")
	Long stockAmount,
	@Schema(description = "투자금액")
	Long investmentAmount,
	@Schema(description = "수익률")
	Double roi
) {
}
