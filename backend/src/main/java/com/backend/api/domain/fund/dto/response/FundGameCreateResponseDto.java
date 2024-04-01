package com.backend.api.domain.fund.dto.response;

import io.swagger.v3.oas.annotations.media.Schema;

import java.util.List;


public record FundGameCreateResponseDto(
        @Schema(description = "레디스에 저장된 Index")
        Long gameIdx,

        @Schema(description = "종목별 차트(350개)를 담아준 리스트")
        List<StockChartDataDto> stockChartDataList,

        @Schema(description = "총 평가 자산")
        TotalAssetDto totalAsset,

        @Schema(description = "전날 대비 변화량")
        List<NextDayInfoResponseDto> nextDayInfos

) {
}
