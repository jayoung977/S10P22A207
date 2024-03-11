package com.backend.api.domain.member.dto.response;

import com.backend.api.domain.member.entity.type.GenderType;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.validation.constraints.NotNull;

@Schema(name = "멤버 response Dto", description = "멤버 관련 response Dto")
public record MemberProfileRes(

	@Schema(description = "멤버 id")
	Long memberId,

	@Schema(description = "이메일")
	@NotNull
	String email,

	@Schema(description = "닉네임")
	@NotNull
	String nickname,

	@Schema(description = "출생년도")
	Short birthYear,

	@Schema(description = "성별")
	@Enumerated(EnumType.STRING)
	GenderType gender,

	@Schema(description = "자산")
	@NotNull
	Long asset,

	@Schema(description = "랭크포인트")
	@NotNull
	Integer rankPoint,
	@Schema(description = "승")
	@NotNull
	Integer win,
	@Schema(description = "패")
	@NotNull
	Integer lose,
	@Schema(description = "싱글평균수익률")
	@NotNull
	Double singleAvgRoi,

	@Schema(description = "멀티평균수익률")
	@NotNull
	Double multiAvgRoi
) {
}
