package com.backend.api.domain.single.dto.response;

import io.swagger.v3.oas.annotations.media.Schema;

import java.util.List;
@Schema(name = "상위3위 멤버별 차트(개수: 유저수와 동일한 3개) response Dto", description = "싱글게임기록 관련 response Dto")
public record SingleLogRankMemberStockChartDataDto(
        @Schema(description = "멤버 id")
        Long memberId,
        @Schema(description = "닉네임")
        String nickname,
        @Schema(description = "멤버별 차트(350개)")
        List<StockChartDto> stockChartList
) {
}
