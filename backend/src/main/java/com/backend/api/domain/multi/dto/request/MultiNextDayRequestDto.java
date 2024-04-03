package com.backend.api.domain.multi.dto.request;

import io.swagger.v3.oas.annotations.media.Schema;

@Schema(description = "멀티게임 관련 response Dto")
public record MultiNextDayRequestDto(

    @Schema(description = "레디스에 저장된 Index")
    Long gameId,

    @Schema(description = "라운드")
    int roundNumber,
    @Schema(description = "시작일로부터의 날짜")
    int day,

    @Schema(description = "멀티게임 로그 ID")
    long multiGameLogId

) {

}
