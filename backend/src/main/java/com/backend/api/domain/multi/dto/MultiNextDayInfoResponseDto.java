package com.backend.api.domain.multi.dto;

import io.swagger.v3.oas.annotations.media.Schema;

public record MultiNextDayInfoResponseDto(
    @Schema(description = "해당 일의 종가")
    Integer TodayEndPrice,
    @Schema(description = "전날 대비 등락 정도")
    int volatility,
    @Schema(description = "보유 수량")
    int stockAmount,
    @Schema(description = "공매도 보유 수량")
    int shortStockAmount,
    @Schema(description = "평가 손익")
    long unrealizedGain,
    @Schema(description = "손익률")
    double profitMargin
) {

}
