package com.backend.api.domain.multi.dto.response;

import io.swagger.v3.oas.annotations.media.Schema;

public record MultiGameStockIdDto(

    @Schema(description = "주식 Id")
    Long stockId,

    @Schema(description = "첫 날의 StockChart Id")
    Long firstDayStockChartId

) {

}
