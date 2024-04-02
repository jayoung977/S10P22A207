package com.backend.api.domain.fund.dto.request;

import io.swagger.v3.oas.annotations.media.Schema;

public record FundTradeRequestDto(
        @Schema(description = "펀드 Id")
        Long fundId,
        @Schema(description = "레디스에 저장된 Index")
        Long gameIdx,
        @Schema(description = "종목 Id")
        Long stockId,
        @Schema(description = "거래요청 수량")
        Integer amount,
        @Schema(description = "시작일로부터의 일 수")
        Integer day
) {
}
