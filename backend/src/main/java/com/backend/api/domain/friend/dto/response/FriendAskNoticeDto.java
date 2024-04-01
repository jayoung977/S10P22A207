package com.backend.api.domain.friend.dto.response;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotNull;

@Schema(description = "친구 요청 알림 Dto")
public record FriendAskNoticeDto(
	@Schema(description = "보낸사람 ID")
	@NotNull
	Long senderId,
	@Schema(description = "보낸사람 닉네임")
	@NotNull
	String senderNickname
) {
}