package com.backend.api.domain.multi.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import java.util.List;
import java.util.Set;

public record MultiWaitRoomInfo(
    @Schema(description = "방 Id")
    Long roomId,
    @Schema(description = "방 이름")
    String roomTitle,

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
