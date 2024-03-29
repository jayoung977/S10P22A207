package com.backend.api.global.websocket.dto.request;

import io.swagger.v3.oas.annotations.media.Schema;

public record MultiGameReadyReq(
	@Schema(description = "멀티게임 방 번호")
	Long roomId,
	@Schema(description = "멀티게임 준비 여부")
	Boolean readyState

) {
}
