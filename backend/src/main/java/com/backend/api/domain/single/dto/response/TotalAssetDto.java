package com.backend.api.domain.single.dto.response;

import io.swagger.v3.oas.annotations.media.Schema;

public record TotalAssetDto(
    @Schema(description = "보유 현금")
    Long cash,
    @Schema(description = "총 평가 손익")
    long resultProfit,
    @Schema(description = "총 평가 수익률")
    double resultRoi,
    @Schema(description = "총 매입 금액")
    long totalPurchaseAmount,
    @Schema(description = "총 평가 금액")
    long totalAsset

) {

}
