package com.backend.api.domain.single.dto.response;

import io.swagger.v3.oas.annotations.media.Schema;
import java.util.List;

@Schema(name = "싱글게임 생성 response Dto", description = "싱글게임 관련 response Dto")
public record SingleGameCreateResponseDto(
    @Schema(description = "게임 로그 Id")
    Long gameLogId,
    @Schema(description = "레디스 게임 Id")
    Long redisGameIdx,
    @Schema(description = "게임 가능 횟수")
    Integer singleGameChance,

    @Schema(description = "종목별 차트(350개)를 담아준 리스트")
    List<StockChartDataDto> stockChartDataList
) {

}
