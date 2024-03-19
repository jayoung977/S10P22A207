package com.backend.api.domain.single.dto.response;

import io.swagger.v3.oas.annotations.media.Schema;
import java.util.List;

@Schema(name = "다음 날의 정보를 가져오는 response Dto", description = "싱글게임 관련 response Dto")
public record NextDayResponseDto(
    @Schema(description = "종목별 '오늘의 종가, 등락정도, 보유수량, 평가손익, 손익률'")
    List<NextDayInfoResponseDto> nextDayInfoResponseDtoList,
    @Schema(description = "보유 현금")
    long cash,
    @Schema(description = "총 평가 손익")
    long resultProfit,
    @Schema(description = "총 평가 수익률")
    double resultRoi,
    @Schema(description = "총 매입 금액")
    int totalPurchaseAmount,
    @Schema(description = "총 평가 금액")
    long totalAsset,

    @Schema(description = "마지막날(50일) 종목 이름과 시작날, 끝나는 날 표시하기 위한 Dto")
    SingleGameResultDto stockInfoDtoList

) {

}
