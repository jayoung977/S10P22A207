package com.backend.api.domain.multi.dto.response;

import com.backend.api.global.common.type.TradeType;
import io.swagger.v3.oas.annotations.media.Schema;
import java.util.List;

@Schema(name = "멀티게임 매매 결과 response Dto", description = "멀티게임 관련 response Dto")
public record MultiTradeResponseDto(
    @Schema(description = "보유 현금")
    long cash,
    @Schema(description = "매수 or 매도")
    TradeType tradeType,
    @Schema(description = "구매가격")
    int price,
    @Schema(description = "수량")
    int amount,
    @Schema(description = "수수료")
    int fee,
    @Schema(description = "실현 손익")
    long profit,

    @Schema(description = "총 평가 자산")
    long totalAsset,

    @Schema(description = "그간 매매 내역")
    List<MultiTradeListDto> tradeList

) {

}
