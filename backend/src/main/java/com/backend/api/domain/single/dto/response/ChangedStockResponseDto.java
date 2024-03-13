package com.backend.api.domain.single.dto.response;

import io.swagger.v3.oas.annotations.media.Schema;

@Schema(name = "거래시에 변동된 내용을 담는 response Dto", description = "싱글게임 관련 response Dto")
public record ChangedStockResponseDto(
    @Schema(description = "종목 Id")
    Long stockId,
    @Schema(description = "거래 후 수량")
    int stockAmount,
    @Schema(description = "비실현 수익")
    long unrealizedProfit,
    @Schema(description = "평균 단가")
    int averagePurchasePrice,
    @Schema(description = "수익률")
    double profitMargin
) {

}
