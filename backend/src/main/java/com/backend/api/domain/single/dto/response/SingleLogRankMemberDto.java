package com.backend.api.domain.single.dto.response;

import io.swagger.v3.oas.annotations.media.Schema;

public record SingleLogRankMemberDto(
        @Schema(description = "멤버 id")
        Long memberId,
        @Schema(description = "닉네임")
        String nickname,
        @Schema(description = "해당 game stock id")
        Long singleGameStockId,
        @Schema(description = "수익률")
        Double roi
) {
}
