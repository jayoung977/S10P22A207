package com.backend.api.domain.single.dto.response;

import io.swagger.v3.oas.annotations.media.Schema;

import java.util.List;
@Schema(name = "종목별 상위3위 멤버별 매매기록(개수: 종목수와 동일한 10개) response Dto", description = "싱글게임기록 관련 response Dto")
public record SingleLogRankMemberTradeListDto(

        @Schema(description = "종목 Id")
        Long stockId,
        @Schema(description = "종목별 상위 3위 유저(3개) 매매 내역")
        List<SingleLogRankMemberTradeDto> rankMemberTradeListDtoList

) {
}
