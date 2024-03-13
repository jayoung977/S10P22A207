package com.backend.api.domain.fund.dto.response;

import io.swagger.v3.oas.annotations.media.Schema;

@Schema(name = "펀드 response Dto", description = "펀드 관련 response Dto")
public record FundRes(
	@Schema(description = "펀드 id")
	Long fundId,
	@Schema(description = "펀드명")
	String fundName,
	@Schema(description = "펀드 매니저 닉네임")
	String managerNickname,
	@Schema(description = "펀드 종목")
	String industry,
	@Schema(description = "펀드 최소금액")
	Long minimumAmount,
	@Schema(description = "펀드 목표금액")
	Long targetAmount,
	@Schema(description = "펀드 현재금액")
	Long fundAsset,
	@Schema(description = "펀드 참여자 수")
	int participantCount,
	@Schema(description = "펀드 최대 인원")
	Long capacity,
	@Schema(description = "펀드 상태")
	String status,
	@Schema(description = "수수료 타입")
	String feeType,
	@Schema(description = "펀드 기간")
	Short period,
	@Schema(description = "펀드 수익률")
	Double roi
) {
}
