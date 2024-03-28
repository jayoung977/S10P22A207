package com.backend.api.domain.multi.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import java.util.List;

public record MultiGameRoomsResponseDto(

    @Schema(description = "방 번호")
    Long roomNumber,

    @Schema(description = "라운드 번호")
    Integer roundNumber,

    @Schema(description = "참가자 Id")
    List<Long> participantsIds

    ) {

}
