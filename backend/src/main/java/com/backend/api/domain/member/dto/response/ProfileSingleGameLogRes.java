package com.backend.api.domain.member.dto.response;

import io.swagger.v3.oas.annotations.media.Schema;

@Schema(name = "싱글게임로그 response Dto", description = "싱글게임로그 관련 response Dto")
public record ProfileSingleGameLogRes(
	@Schema(description = "싱글게임로그 id")
	Long singleGameLogId,

	@Schema(description = "게임 시작 전 시드머니")
	Long initialAsset,

	@Schema(description = "수익률")
	Double finalRoi,

	@Schema(description = "최종 수익")
	Long finalProfit,
	@Schema(description = "게임 플레이 날짜")
	String gameDate
) {
}
