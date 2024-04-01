package com.backend.api.domain.fund.dto.response;
import io.swagger.v3.oas.annotations.media.Schema;

public record AssetListDto(
    @Schema(description = "종목 Id")
    Long stockId,
    @Schema(description = "수량")
    Integer stockAmount,
    @Schema(description = "비실현 수익")
    long unrealizedProfit,
    @Schema(description = "평균 단가")
    int averagePurchasePrice,
    @Schema(description = "수익률")
    double profitMargin
) {

}
