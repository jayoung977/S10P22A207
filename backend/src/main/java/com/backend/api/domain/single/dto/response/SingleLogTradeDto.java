package com.backend.api.domain.single.dto.response;

import com.backend.api.global.common.type.TradeType;
import io.swagger.v3.oas.annotations.media.Schema;

import java.time.LocalDateTime;

@Schema(name = " 어떤 멤버의 매매기록 (개수: 매매수) response Dto", description = "싱글게임기록 관련 response Dto")
public record SingleLogTradeDto(
        @Schema(description = "일자")
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
