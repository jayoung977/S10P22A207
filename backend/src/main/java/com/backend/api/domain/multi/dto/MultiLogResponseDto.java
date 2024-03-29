package com.backend.api.domain.multi.dto;

import com.backend.api.domain.single.dto.response.StockChartDto;
import io.swagger.v3.oas.annotations.media.Schema;

import java.util.List;

@Schema(name = "멀티게임기록 response Dto", description = "멀티게임기록 관련 response Dto")
public record MultiLogResponseDto(
        @Schema(description = "종목 이름")
        String stockName,
        @Schema(description = "종목별 차트")
        List<StockChartDto> stockChartDtoList,
        @Schema(description = "나의 매매 내역")
        List<MultiLogTradeDto> multiLogTradeDtoList,
        @Schema(description = "다른 플레이어들의 정보(매매정보포함)")
        List<MultiLogMemberDto> multiLogMemberDtoList

) {
}
