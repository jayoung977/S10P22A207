package com.backend.api.domain.multi.dto;

import io.swagger.v3.oas.annotations.media.Schema;

public record MultiGameTotalResultDto(


    @Schema(description = "멤버 ID")
    Long memberId,
    @Schema(description = "닉네임")
    String nickName,
    @Schema(description = "등수")
    Integer rank,

    @Schema(description = "점수 보상")
    Integer rankPoint,
    @Schema(description = "마무리 금액")
    Long finalAsset,

    @Schema(description = "수익률")
    Double profitMargin
) {

}
