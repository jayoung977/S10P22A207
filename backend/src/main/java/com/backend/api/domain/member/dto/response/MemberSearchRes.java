package com.backend.api.domain.member.dto.response;

import io.swagger.v3.oas.annotations.media.Schema;

@Schema(name = "멤버검색 response Dto", description = "멤버검색 관련 response Dto")
public record MemberSearchRes(
	@Schema(description = "멤버 id")
	Long memberId,
	@Schema(description = "닉네임")
	String nickname,
	@Schema(description = "자산")
	Long asset

) {
}
