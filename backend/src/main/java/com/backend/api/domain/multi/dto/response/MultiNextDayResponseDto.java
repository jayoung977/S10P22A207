package com.backend.api.domain.multi.dto.response;

import io.swagger.v3.oas.annotations.media.Schema;

@Schema(description = "멀티게임 관련 response Dto")
public record MultiNextDayResponseDto(

    @Schema(description = "오늘의 종가, 등락정도, 주식 보유수량, 공매도 보유수량, 평가손익, 손익률")
    MultiTradeResponseDto nextDayInfo,

    @Schema(description = "마지막날(51일) 종목 이름과 시작날, 끝나는 날 등의 정보")
    MultiGameResultDto multiGameInfos
) {

}
