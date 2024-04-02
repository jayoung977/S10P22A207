package com.backend.api.domain.single.dto.response;

import io.swagger.v3.oas.annotations.media.Schema;

import java.time.LocalDate;

public record RawMaterialRes(
        @Schema(description = "날짜")
        LocalDate date,

        @Schema(description = "wti")
        String wti,

        @Schema(description = "copper")
        String copper,

        @Schema(description = "gold")
        String gold,

        @Schema(description = "wheat")
        String wheat,

        @Schema(description = "silver")
        String silver,

        @Schema(description = "gas")
        String gas

) {
}
