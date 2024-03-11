package com.backend.api.domain.member.dto.response;

import io.swagger.v3.oas.annotations.media.Schema;

@Schema(name = "멀티게임로그 response Dto", description = "멀티게임로그 관련 response Dto")
public record ProfileMultiGameLogRes(
	@Schema(description = "멀티게임로그 id")
	Long multiGameLogId,

	@Schema(description = "같이 플레이한 플레이어 수")
	Integer players,

	@Schema(description = "수익률")
	Double finalRoi,

	@Schema(description = "순위")
	Integer ranking,
	@Schema(description = "게임 플레이 날짜")
	String gameDate
) {
}
