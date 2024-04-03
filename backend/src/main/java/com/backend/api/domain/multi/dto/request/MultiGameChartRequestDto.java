package com.backend.api.domain.multi.dto.request;

import io.swagger.v3.oas.annotations.media.Schema;

public record MultiGameChartRequestDto(

    @Schema(description = "라운드")
    Integer roundNumber,

    @Schema(description = "게임 ID")
    Long gameId,

    @Schema(description = "주식 Id")
    Long stockId,

    @Schema(description = "첫 날의 StockChart Id")
    Long firstDayStockChartId,


    @Schema(description = "방 ID")
    Long roomId

) {

}
