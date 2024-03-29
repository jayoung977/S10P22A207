package com.backend.api.domain.multi.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import java.time.LocalDateTime;

public record MultiGameStartRoundResponseDto(

    @Schema(description = "주식 Id")
    Long stockId,

    @Schema(description = "시장가")
    Integer marketPrice,
    @Schema(description = "고가")
    Integer highPrice,
    @Schema(description = "저가")
    Integer lowPrice,
    @Schema(description = "종가")
    Integer endPrice,

    @Schema(description = "거래량")
    Long tradingVolume,

    @Schema(description = "거래일시")
    LocalDateTime date

    ) {

}
