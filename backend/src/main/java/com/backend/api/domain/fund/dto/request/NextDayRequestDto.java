package com.backend.api.domain.fund.dto.request;
import io.swagger.v3.oas.annotations.media.Schema;


public record NextDayRequestDto(
    @Schema(description = "펀드 Id")
    Long fundId,
    @Schema(description = "레디스 게임 Id")
    Long gameIdx,
    @Schema(description = "시작일로부터의 날짜")
    int day
) {

}
