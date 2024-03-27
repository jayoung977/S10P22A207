package com.backend.api.global.websocket.dto;

public record WebSocketMessageReq(
	Long roomId,
	String sender,
	String message
) {
}
