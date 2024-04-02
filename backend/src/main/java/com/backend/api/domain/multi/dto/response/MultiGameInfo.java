package com.backend.api.domain.multi.dto.response;

import io.swagger.v3.oas.annotations.media.Schema;

public record MultiGameInfo(

    @Schema(description = "멤버 Id")
    Long memberId,

    @Schema(description = "턴수. 진행정도")
    int day
) {

}
