package com.backend.api.domain.fund.dto.response;

import io.swagger.v3.oas.annotations.media.Schema;

import java.time.LocalDateTime;
import java.util.List;

@Schema(name = "펀드게임 결과 response Dto", description = "펀드게임 관련 response Dto")
public record FundGameResultDto(

    @Schema(description = "각 종목의 Id와 이름")
    List<StockInfoDto> stockInfoDtoList,

    @Schema(description = "시작 날짜")
    LocalDateTime StartDate,
    @Schema(description = "끝 날짜")
    LocalDateTime endDate,

    @Schema(description = "시작 금액")
    Long initialAsset,

    @Schema(description = "종료 금액")
    Long finalAsset,

    @Schema(description = "순이익")
    Long netProfit,

    @Schema(description = "수익률")
    Double profitMargin
) {

}
