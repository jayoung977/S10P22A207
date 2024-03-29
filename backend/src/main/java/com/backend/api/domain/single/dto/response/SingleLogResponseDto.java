package com.backend.api.domain.single.dto.response;

import io.swagger.v3.oas.annotations.media.Schema;

import java.util.List;
@Schema(name = "싱글게임기록 response Dto", description = "싱글게임기록 관련 response Dto")
public record SingleLogResponseDto(
        @Schema(description = "종목 정보(종목수와 동일한 10개)")
        List<StockInfoDto> stockInfoDtoList,
        @Schema(description = "종목별 차트(350개)를 담아준 리스트(종목수와 동일한 10개)")
        List<StockChartDataDto> stockChartDataList,
        @Schema(description = "그간 매매 내역")
        List<SingleLogTradeListDto> tradeList,
        @Schema(description = "종목별 상위 3위 유저(종목수와 동일한 10개)")
        List<SingleLogRankMemberListDto> rankMemberList
) {
}
