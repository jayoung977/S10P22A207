package com.backend.api.domain.single.dto.response;

import com.backend.api.global.common.type.TradeType;
import io.swagger.v3.oas.annotations.media.Schema;

public record SingleTradeListDto(
        @Schema(description = "종목 Id")
        Long stockId,
        @Schema(description = "매매 턴")
        int day,

        @Schema(description = "매매 타입")
        TradeType tradeType,

        @Schema(description = "구매 수량")
        Integer amount,

        @Schema(description = "가격")
        Integer price,

        @Schema(description = "수익금")
        Long profit

) {

}
