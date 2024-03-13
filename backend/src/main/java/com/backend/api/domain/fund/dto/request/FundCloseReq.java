package com.backend.api.domain.fund.dto.request;

import io.swagger.v3.oas.annotations.media.Schema;

@Schema(name = "펀드 종료 request Dto", description = "펀드 종료 관련 request Dto")
public record FundCloseReq(
	@Schema(description = "펀드 ID")
	Long fundId
) {
}
