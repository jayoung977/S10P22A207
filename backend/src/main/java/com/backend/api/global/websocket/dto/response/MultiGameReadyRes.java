package com.backend.api.global.websocket.dto.response;

import io.swagger.v3.oas.annotations.media.Schema;

public record MultiGameReadyRes(
	@Schema(description = "멀티게임 방 번호")
	Long roomId,
	@Schema(description = "멀티게임 준비 여부")
	Boolean readyState,
	@Schema(description = "레디 버튼 누른 유저")
	Long readyUserId
) {
}
