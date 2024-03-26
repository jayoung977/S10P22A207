package com.backend.api.domain.single.dto.response;

import io.swagger.v3.oas.annotations.media.Schema;
import java.util.List;

@Schema(name = "싱글게임 생성 response Dto", description = "싱글게임 관련 response Dto")
public record SingleGameCreateResponseDto(
    @Schema(description = "레디스에 저장된 Index")
    Long gameIdx,
    @Schema(description = "게임 일차. 기본값은 0이지만 불러오기라면 0이 아니다.")
    Integer day,
    @Schema(description = "게임 가능 횟수")
    Integer singleGameChance,

    @Schema(description = "종목별 차트(350개)를 담아준 리스트")
    List<StockChartDataDto> stockChartDataList,

    @Schema(description = "총 평가 자산")
    TotalAssetDto totalAsset,

    @Schema(description = "보유 자산")
    List<AssetListDto> assetList,

    @Schema(description = "그간 매매 내역")
    List<SingleTradeListDto> tradeList,

    @Schema(description = "전날 대비 변화량")
    List<NextDayInfoResponseDto> nextDayInfos


) {

}
