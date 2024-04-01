package com.backend.api.domain.multi.dto.response;

import java.util.List;
import java.util.Set;

import io.swagger.v3.oas.annotations.media.Schema;

public record MultiWaitingRoomDetailDto(
	@Schema(description = "방 Id")
	Long roomId,
	@Schema(description = "방 이름")
	String roomTitle,
	@Schema(description = "참가자 DtoList")
	List<MultiMemberRes> participants,
	@Schema(description = "방장id")
	Long hostId
) {
}
