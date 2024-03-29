package com.backend.api.domain.single.dto.response;

import io.swagger.v3.oas.annotations.media.Schema;

import java.util.List;
@Schema(name = "어떤 종목의 상위3위 어떤 멤버의 차트 + 매매기록 response Dto", description = "싱글게임기록 관련 response Dto")
public record SingleLogRankMemberLogDto(
        @Schema(description = "차트(350개)")
        List<StockChartDto> stockChartList,
        @Schema(description = "매매 내역")
        List<SingleLogTradeDto> tradeList
) {
}
