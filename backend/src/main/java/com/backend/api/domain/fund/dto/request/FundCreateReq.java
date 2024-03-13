package com.backend.api.domain.fund.dto.request;

import io.swagger.v3.oas.annotations.media.Schema;

@Schema(name = "펀드 생성 request Dto", description = "펀드 생성 request Dto")
public record FundCreateReq(
	@Schema(description = "펀드명")
	String fundName,
	@Schema(description = "펀드 투자 기간")
	Short period,
	@Schema(description = "펀드 인원")
	Long capacity,
	@Schema(description = "펀드 목표 금액")
	Long targetAmount,
	@Schema(description = "펀드 최소 금액")
	Long minimumAmount,
	@Schema(description = "펀드 수수료 타입")
	String feeType,
	@Schema(description = "종목")
	String industry
) {
}
