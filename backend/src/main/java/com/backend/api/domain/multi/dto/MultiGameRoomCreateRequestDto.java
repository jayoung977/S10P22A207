package com.backend.api.domain.multi.dto;

import io.swagger.v3.oas.annotations.media.Schema;

public record MultiGameRoomCreateRequestDto(
    @Schema(description = "방 이름")
    String roomTitle,

    @Schema(description = "총 라운드 수")
    Integer maxRoundNumber,

    @Schema(description = "비밀방 여부")
    Boolean isOpen,

    @Schema(description = "비밀번호")
    Integer password

) {

}
