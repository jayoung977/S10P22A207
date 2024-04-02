package com.backend.api.domain.multi.dto.response;

import io.swagger.v3.oas.annotations.media.Schema;
import java.util.List;

public record MultiGameStartResponseDto(

    @Schema(description = "레디스에 저장된 게임 Id")
    Long gameId,

    @Schema(description = "해당 방의 게임 Id DTO들")
    List<MultiGameStockIdDto> multiGameStockIds,

    @Schema(description = "방 Id")
    Long roomId

) {

}
