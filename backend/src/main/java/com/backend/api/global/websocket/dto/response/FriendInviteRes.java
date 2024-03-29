package com.backend.api.global.websocket.dto.response;

import io.swagger.v3.oas.annotations.media.Schema;

public record FriendInviteRes(
	@Schema(description = "초대받은 방 번호")
	Long roomId,
	@Schema(description = "초대한 사람")
	String inviterNickname,
	@Schema(description = "초대받은 사람")
	Long receiverId
) {
}
