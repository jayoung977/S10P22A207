package com.backend.api.domain.fund.dto.response;
import com.backend.api.global.common.type.TradeType;
import io.swagger.v3.oas.annotations.media.Schema;

import java.util.List;

public record FundTradeResponseDto(
        @Schema(description = "보유 현금")
        long cash,
        @Schema(description = "변동이 있는 주식")
        ChangedStockResponseDto changedStockResponseDto,
        @Schema(description = "매수 or 매도")
        TradeType tradeType,
        @Schema(description = "구매가격")
        int price,
        @Schema(description = "수량")
        int amount,
        @Schema(description = "수수료")
        int fee,
        @Schema(description = "실현 손익")
        long realizedProfit,

        @Schema(description = "총 평가 자산")
        TotalAssetDto totalAsset,

        @Schema(description = "보유 자산")
        List<AssetListDto> assetList,

        @Schema(description = "그간 매매 내역")
        List<FundTradeListDto> tradeList
) {
}
