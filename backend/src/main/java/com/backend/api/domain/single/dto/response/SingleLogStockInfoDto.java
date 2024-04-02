package com.backend.api.domain.single.dto.response;

import io.swagger.v3.oas.annotations.media.Schema;

public record SingleLogStockInfoDto(
        @Schema(description = "종목 ID")
        Long stockId,
        @Schema(description = "종목 코드")
        String stockCode,
        @Schema(description = "종목 이름")
        String stockName
) {
}
