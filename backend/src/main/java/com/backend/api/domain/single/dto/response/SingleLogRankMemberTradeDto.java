package com.backend.api.domain.single.dto.response;

import io.swagger.v3.oas.annotations.media.Schema;

import java.util.List;

public record SingleLogRankMemberTradeDto(

        @Schema(description = "멤버 id")
        Long memberId,
        @Schema(description = "닉네임")
        String nickname,
        @Schema(description = "매매 내역")
        List<SingleLogTradeDto> tradeList
) {
}
