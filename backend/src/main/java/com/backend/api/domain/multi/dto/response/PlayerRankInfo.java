package com.backend.api.domain.multi.dto.response;

import io.swagger.v3.oas.annotations.media.Schema;

public record PlayerRankInfo(
    @Schema(description = "멤버 닉네임")
    String nickName,

    @Schema(description = "턴수. 진행정도")
    int day,

    @Schema(description = "랭킹. 순위")
    int rank,

    @Schema(description = "총 평가 자산")
    long totalAsset
) {

}
