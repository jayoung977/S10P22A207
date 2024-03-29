package com.backend.api.domain.multi.dto.response;

import com.backend.api.global.common.type.TradeType;
import io.swagger.v3.oas.annotations.media.Schema;
import java.time.LocalDateTime;

public record MultiTradeListDto(
    @Schema(description = "주식 Id")
    long stockId,

    @Schema(description = "라운드")
    int round,
    @Schema(description = "매매 턴")
    LocalDateTime date,

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
