package com.backend.api.domain.single.dto.response;

import io.swagger.v3.oas.annotations.media.Schema;

@Schema(name = "다음 날의 정보를 보여줄 때 각 종목의 변화 정보를 담는 response Dto", description = "싱글게임 관련 response Dto")
public record NextDayInfoResponseDto(

    @Schema(description = "종목 Id")
    long stockId,
    @Schema(description = "해당 일의 종가")
    Integer TodayEndPrice,
    @Schema(description = "전날 대비 등락 정도")
    int volatility,
    @Schema(description = "보유 수량")
    int stockAmount,
    @Schema(description = "평가 손익")
    long unrealizedGain,
    @Schema(description = "손익률")
    double profitMargin
) {

}
