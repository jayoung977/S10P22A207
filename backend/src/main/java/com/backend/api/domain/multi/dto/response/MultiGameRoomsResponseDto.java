package com.backend.api.domain.multi.dto.response;

import io.swagger.v3.oas.annotations.media.Schema;
import java.util.List;

public record MultiGameRoomsResponseDto(

    @Schema(description = "방의 총 갯수")
    int totalMultiRoomCounts,
    @Schema(description = "방 정보(방 번호, 라운드, 참가자 Id)를 나타낸 리스트")
    List<MultiGameRoomInfo> multiGameRoomInfoList

    ) {

}
