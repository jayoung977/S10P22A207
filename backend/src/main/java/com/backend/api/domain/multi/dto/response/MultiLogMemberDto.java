package com.backend.api.domain.multi.dto.response;

import io.swagger.v3.oas.annotations.media.Schema;
import java.util.List;

public record MultiLogMemberDto(
        @Schema(description = "멤버 id")
        Long memberId,

        @Schema(description = "닉네임")
        String nickname,

        @Schema(description = "수익률")
        Double roi,

        @Schema(description = "rankPoint")
        Integer rankPoint,
        @Schema(description = "해당 플레이어의 매매 내역")
        List<MultiLogTradeDto> multiLogTradeDtoList
) {
}
