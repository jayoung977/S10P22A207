package com.backend.api.domain.multi.dto.request;

import io.swagger.v3.oas.annotations.media.Schema;
import java.util.List;

public record MultiGameStartRequestDto(
    @Schema(description = "게임 참가자 Id")
    List<Long> playerIds,

    @Schema(description = "라운드")
    Integer roundNumber
    )


{
}
