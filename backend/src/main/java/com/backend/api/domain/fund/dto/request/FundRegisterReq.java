package com.backend.api.domain.fund.dto.request;

import io.swagger.v3.oas.annotations.media.Schema;

@Schema(name = "펀드 가입 request Dto", description = "펀드 가입 관련 request Dto")
public record FundRegisterReq(
	@Schema(description = "펀드 ID")
	Long fundId,
	@Schema(description = "투자 금액")
	Long investmentAmount
) {
}
