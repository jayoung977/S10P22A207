package com.backend.api.domain.multi.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import java.util.List;

public record MultiGameStartRequestDto(
    @Schema(description = "게임 참가자 Id")
    List<Long> playerIds)
{
}
