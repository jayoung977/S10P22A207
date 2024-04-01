package com.backend.api.domain.multi.dto.response;

import com.backend.api.domain.multi.dto.MultiWaitRoomInfo;
import io.swagger.v3.oas.annotations.media.Schema;
import java.util.List;

public record MultiGameRoomsResponseDto(

    @Schema(description = "게임 중인 방의 총 갯수")
    int totalGameRoomCounts,

    @Schema(description = "대기 중인 방의 총 갯수")
    int totalWaitRoomCounts,
    @Schema(description = "게임 방 정보(방 번호, 라운드, 참가자 Id)를 나타낸 리스트")
    List<MultiGameRoomInfo> multiGameRoomInfoList,

    @Schema(description = "대기 방 정보(방 번호, 라운드, 참가자 Id)를 나타낸 리스트")
    List<MultiWaitRoomInfo> multiWaitRoomInfoList

    ) {

}
