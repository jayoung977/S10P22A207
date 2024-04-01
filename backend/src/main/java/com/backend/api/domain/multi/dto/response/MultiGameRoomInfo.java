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
    Integer password

    ) {
    @Override
    public int hashCode() {
        return Objects.hash(roomId, roomTitle, roundNumber, participantsIds, isOpen, password);
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        MultiGameRoomInfo that = (MultiGameRoomInfo) o;
        return Objects.equals(roomId, that.roomId) &&
            Objects.equals(roomTitle, that.roomTitle) &&
            Objects.equals(roundNumber, that.roundNumber) &&
            Objects.equals(participantsIds, that.participantsIds) &&
            Objects.equals(isOpen, that.isOpen) &&
            Objects.equals(password, that.password);
    }

}
