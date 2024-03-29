package com.backend.api.domain.multi.dto.response;

import io.swagger.v3.oas.annotations.media.Schema;

public record MultiGameRoomCreateResponseDto(
    @Schema(description = "방 Id")
    Long multiGameId
) {

}
