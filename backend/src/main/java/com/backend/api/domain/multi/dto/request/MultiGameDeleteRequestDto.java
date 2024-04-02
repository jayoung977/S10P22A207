package com.backend.api.domain.multi.dto.request;

import io.swagger.v3.oas.annotations.media.Schema;

public record MultiGameDeleteRequestDto(
    @Schema(description = "레디스에 저장된 Index")
    Long gameId,
    @Schema(description = "멤버 Id")
    Long memberId,
    @Schema(description = "라운드")
    int roundNumber,

    @Schema(description = "돌아갈 대기 방 Id")
    Long roomId
) {

}
