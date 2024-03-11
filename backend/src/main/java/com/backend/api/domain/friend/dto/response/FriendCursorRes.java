package com.backend.api.domain.friend.dto.response;

import java.util.List;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotNull;

@Schema(description = "친구 목록 조회 커서 기반 페이징 응답 Dto")
public record FriendCursorRes(

	@Schema(description = "친구리스트")
	List<FriendRes> friendResList,
	@Schema(description = "Cursor")
	@NotNull
	Long cursor
) {
}
