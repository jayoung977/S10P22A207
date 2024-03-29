package com.backend.api.domain.multi.dto.request;

import io.swagger.v3.oas.annotations.media.Schema;

@Schema(name = "매수, 매도, 공매도 RequestDto", description = "멀티게임 관련 request Dto")
public record MultiTradeRequestDto(
    @Schema(description = "레디스에 저장된 Index")
    Long gameId,

    @Schema(description = "라운드")
    int roundNumber,

    @Schema(description = "거래요청 수량")
    Integer amount,
    @Schema(description = "시작일로부터의 일 수")
    int day


) {

}
