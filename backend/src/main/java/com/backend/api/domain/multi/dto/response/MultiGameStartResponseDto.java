package com.backend.api.domain.multi.dto.response;

import io.swagger.v3.oas.annotations.media.Schema;

public record MultiGameStartResponseDto(

    @Schema(description = "레디스에 저장된 게임 Id")
    Long gameId

) {

}
