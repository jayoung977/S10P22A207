package com.backend.api.domain.member.dto.request;

import com.backend.api.domain.member.entity.type.GenderType;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.Pattern;

@Schema(description = "추가 정보 저장 요청 DTO")
public record MemberAdditionalInfoReq(
	@Schema(description = "닉네임")
	String nickname,
	@Schema(description = "생년월일, yyyy-MM-dd")
	@Pattern(regexp = "^(19|20)\\d{2}$")
	String birth,
	@Schema(description = "성별")
	GenderType gender
) {
}
