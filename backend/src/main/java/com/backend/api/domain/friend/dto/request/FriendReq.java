package com.backend.api.domain.friend.dto.request;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotNull;

@Schema(name = "친구 request Dto", description = "친구 관련 request Dto")
public record FriendReq(
	@Schema(description = "닉네임")
	@NotNull
	String nickname
) {
}
