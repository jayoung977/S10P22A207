package com.backend.api.domain.fund.dto.response;

import io.swagger.v3.oas.annotations.media.Schema;

import java.util.List;

public record NextDayResponseDto(
    @Schema(description = "종목별 '오늘의 종가, 등락정도, 보유수량, 평가손익, 손익률'")
    List<NextDayInfoResponseDto> NextDayInfo,
    @Schema(description = "보유 현금")
    long cash,
    @Schema(description = "총 평가 손익")
    long resultProfit,
    @Schema(description = "총 평가 수익률")
    double resultRoi,
    @Schema(description = "총 매입 금액")
    long totalPurchaseAmount,
    @Schema(description = "총 평가 금액")
    long totalAsset,

    @Schema(description = "보유 자산")
    List<AssetListDto> assetList,

    @Schema(description = "마지막날(51일) 종목 이름과 시작날, 끝나는 날 표시하기 위한 Dto")
    FundGameResultDto stockInfoDtoList



) {

}
