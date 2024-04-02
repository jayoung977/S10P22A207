package com.backend.api.domain.multi.dto.response;

import io.swagger.v3.oas.annotations.media.Schema;
import java.util.Objects;
import java.util.Set;

public record MultiGameRoomInfo(

    @Schema(description = "방 Id")
    Long roomId,
    @Schema(description = "방 이름")
    String roomTitle,

    @Schema(description = "라운드 번호")
    Integer roundNumber,

    @Schema(description = "참가자 Id")
    Set<Long> participantsIds,

    @Schema(description = "비밀방 여부")
    Boolean isOpen,

    @Schema(description = "비밀번호")
    Integer password,

    @Schema(description = "총 라운드 수")
    Integer maxRoundNumber

    ) {
}
