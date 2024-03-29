package com.backend.api.domain.multi.dto.request;

import io.swagger.v3.oas.annotations.media.Schema;

@Schema(name = "다음날 request Dto", description = "멀티게임 관련 response Dto")
public record MultiNextDayRequestDto(

    @Schema(description = "레디스에 저장된 Index")
    Long gameId,

    @Schema(description = "라운드")
    Integer roundNumber,
    @Schema(description = "시작일로부터의 날짜")
    int day
) {

}
