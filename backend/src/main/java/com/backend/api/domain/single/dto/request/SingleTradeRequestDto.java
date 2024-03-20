package com.backend.api.domain.single.dto.request;

import io.swagger.v3.oas.annotations.media.Schema;

@Schema(name = "매수, 매도 RequestDto", description = "싱글게임 관련 response Dto")
public record SingleTradeRequestDto(
    @Schema(description = "게임 로그 Id")
    Long gameLogId,
    @Schema(description = "레디스 게임 Id")
    Long redisGameIdx,
    @Schema(description = "종목 Id")
    long stockId,
    @Schema(description = "거래요청 수량")
    int amount,
    @Schema(description = "시작일로부터의 일 수")
    int day
) {

}
