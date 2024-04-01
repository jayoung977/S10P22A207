package com.backend.api.domain.multi.dto.response;

import io.swagger.v3.oas.annotations.media.Schema;

public record MultiMemberRes(
	@Schema(description = "멤버 id")
	Long memberId,
	@Schema(description = "닉네임")
	String nickname,
	@Schema(description = "수익률")
	Double gameRoi,
	@Schema(description = "랭크포인트")
	Integer rankPoint,
	@Schema(description = "승")
	Integer win,
	@Schema(description = "패")
	Integer lose,
	@Schema(description = "자산")
	Long asset,
	@Schema(description = "현재 게임 순위")
	Integer currentRank
	) {
}
