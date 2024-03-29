package com.backend.api.domain.multi.dto.response;

import io.swagger.v3.oas.annotations.media.Schema;

public record MultiGameRoomEnterResponseDto(
    @Schema(description = "멤버 ID")
    Long memberId,

    @Schema(description = "닉네임")
    String nickname

) {

}
