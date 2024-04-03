package com.backend.api.domain.multi.dto.response;

import com.backend.api.domain.single.dto.response.StockChartDto;
import io.swagger.v3.oas.annotations.media.Schema;

import java.util.List;

@Schema(description = "멀티게임 관련 response Dto")
public record MultiStockChartDataDto(
    @Schema(description = "종목 Id")
    Long stockId,

    @Schema(description = "멀티 게임 로그 Id")
    Long multiGameLogId,

    @Schema(description = "종목별 차트(350개)")
    List<StockChartDto> stockChartList
) {

}
