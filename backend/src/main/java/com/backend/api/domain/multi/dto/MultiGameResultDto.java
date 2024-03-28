package com.backend.api.domain.multi.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import java.time.LocalDateTime;

public record MultiGameResultDto(

    @Schema(description = "종목 이름")
    String stockName,

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
