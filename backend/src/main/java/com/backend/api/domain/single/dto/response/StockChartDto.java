package com.backend.api.domain.single.dto.response;

import io.swagger.v3.oas.annotations.media.Schema;
import java.time.LocalDateTime;

@Schema(name = "하루 차트 response Dto", description = "싱글게임 관련 response Dto")
public record StockChartDto(
    @Schema(description = "시장가")
    Integer marketPrice,
    @Schema(description = "고가")
    Integer highPrice,
    @Schema(description = "저가")
    Integer lowPrice,
    @Schema(description = "종가")
    Integer endPrice,
    @Schema(description = "날짜")
    LocalDateTime date
) {

}
