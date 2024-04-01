package com.backend.api.domain.member.dto.response;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotNull;

public record MemberListRes(
        @Schema(description = "친구 ID")
        @NotNull
        Long memberId,
        @Schema(description = "닉네임")
        @NotNull
        String nickname,
        @Schema(description = "자산")
        @NotNull
        Long asset,

        @Schema(description = "로그인 여부")
        Boolean isLogin
) {
}
