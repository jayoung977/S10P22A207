package com.backend.api.domain.quiz.dto.response;

import io.swagger.v3.oas.annotations.media.Schema;

@Schema(name = "",description = "퀴즈 id")
public record QuizeUpdateAssetRes(
        @Schema(description = "500만원 이상인지 이하인지")
        Boolean isBelow,

        @Schema(description = "현재 자산 반환")
        Long asset
) {

}
