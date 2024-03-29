package com.backend.api.domain.multi.dto.response;

import io.swagger.v3.oas.annotations.media.Schema;

public record MultiGameStartResponseDto(

    @Schema(description = "게임 로그 ID")
    Long gameLogId

) {

}
