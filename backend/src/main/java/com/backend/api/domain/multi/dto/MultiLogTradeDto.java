package com.backend.api.domain.multi.dto;

import com.backend.api.global.common.type.TradeType;
import io.swagger.v3.oas.annotations.media.Schema;

import java.time.LocalDateTime;

@Schema(name = "멀티게임 매매기록 response Dto", description = "멀티게임기록 관련 response Dto")
public record MultiLogTradeDto(
        @Schema(description = "일자")
        LocalDateTime date,

        @Schema(description = "매매 타입")
        TradeType tradeType,

        @Schema(description = "구매 수량")
        Integer amount,

        @Schema(description = "가격")
        Integer price,

        @Schema(description = "수익률")
        Double roi
) {
}
