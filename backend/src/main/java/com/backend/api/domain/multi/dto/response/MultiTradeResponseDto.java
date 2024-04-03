package com.backend.api.domain.multi.dto.response;

import io.swagger.v3.oas.annotations.media.Schema;
import java.util.List;

@Schema(name = "멀티게임 매매 결과 response Dto", description = "멀티게임 관련 response Dto")
public record MultiTradeResponseDto(

    @Schema(description = "초기 자산")
    long initialAsset,
    @Schema(description = "총 평가 자산")
    long totalAsset,
    @Schema(description = "수익률")
    double profitMargin,
    @Schema(description = "수익금")
    long unrealizedGain,
    @Schema(description = "보유 현금")
    long cash,
    @Schema(description = "보유 주식 수량")
    int stockAmount,

    @Schema(description = "보유 공매도 수량")
    int shortStockAmount,

    @Schema(description = "주식, 공매도 매입금")
    long totalPurchaseAmount,

    @Schema(description = "주식 평단가")
    int averagePrice,

    @Schema(description = "공매도 평단가")
    int shortAveragePrice,

    @Schema(description = "현재가")
    int todayEndPrice,

    @Schema(description = "주식, 공매도 평가금")
    long stockValue,

    @Schema(description = "그간 매매 내역")
    List<MultiTradeListDto> tradeList

) {

}
