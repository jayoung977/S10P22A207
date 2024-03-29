package com.backend.api.global.websocket.dto.request;

import io.swagger.v3.oas.annotations.media.Schema;

public record WebSocketMessageReq(
	@Schema(description = "방 번호")
	Long roomId,
	@Schema(description = "보낸 사람")
	String sender,
	@Schema(description = "메시지")
	String message
) {
}
