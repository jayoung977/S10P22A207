package com.backend.api.domain.multi.dto.response;

import io.swagger.v3.oas.annotations.media.Schema;
import java.time.LocalDateTime;

public record MultiGameResultDto(


    @Schema(description = "멤버 ID")
    Long memberId,
    @Schema(description = "닉네임")
    String nickName,
    @Schema(description = "종목 이름")
    String stockName,

    @Schema(description = "랭킹")
    Integer rank,

    @Schema(description = "시작 날짜")
    LocalDateTime StartDate,
    @Schema(description = "끝 날짜")
    LocalDateTime endDate,

    @Schema(description = "순이익")
    Long netProfit,

    @Schema(description = "수익률")
    Double profitMargin,

    @Schema(description = "라운드")
    Integer round


) {

}
