package com.backend.api.domain.fund.dto.request;

import io.swagger.v3.oas.annotations.media.Schema;

@Schema(name = "펀드 시작 request Dto", description = "펀드 시작 request Dto")
public record FundStartReq(

	@Schema(description = "펀드id")
	Long fundId,
	@Schema(description = "펀드명")
	String fundName

) {
}
