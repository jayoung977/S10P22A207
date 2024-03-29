package com.backend.api.global.websocket.dto.request;

import io.swagger.v3.oas.annotations.media.Schema;

public record FriendInviteReq(
	@Schema(description = "초대받은 방 번호")
	Long roomId,
	@Schema(description = "초대받은 사람")
	Long receiver
) {
}
