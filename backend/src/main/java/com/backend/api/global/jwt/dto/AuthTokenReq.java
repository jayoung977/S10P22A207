package com.backend.api.global.jwt.dto;

import jakarta.validation.constraints.NotNull;

public record AuthTokenReq(
        @NotNull String refreshToken
) {
}
