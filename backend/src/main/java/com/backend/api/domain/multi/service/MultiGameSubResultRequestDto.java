package com.backend.api.domain.multi.service;

import io.swagger.v3.oas.annotations.media.Schema;

public record MultiGameSubResultRequestDto(

    @Schema(description = "게임Id")
    Long gameId,

    @Schema(description = "라운드")
    Integer roundNumber
) {

}
