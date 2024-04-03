package com.backend.api.domain.multi.dto.request;

import io.swagger.v3.oas.annotations.media.Schema;

public record MultiPlayerInfoRequestDto(
    @Schema(description = "레디스에 저장된 Index")
    Long gameId,

    @Schema(description = "라운드")
    int roundNumber

)

{

}
