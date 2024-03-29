package com.backend.api.domain.multi.dto;

import io.swagger.v3.oas.annotations.media.Schema;

public record MultiGameResultRequestDto(

    @Schema(description = "게임Id")
    Long gameId
) {

}
