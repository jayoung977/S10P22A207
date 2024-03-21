package com.backend.api.domain.single.dto.request;

import io.swagger.v3.oas.annotations.media.Schema;

@Schema(name = "다음날 request Dto", description = "싱글게임 관련 response Dto")
public record NextDayRequestDto(
    @Schema(description = "게임 로그 Id")
    Long gameLogId,
    @Schema(description = "레디스 게임 Id")
    Long redisGameIdx,
    @Schema(description = "시작일로부터의 날짜")
    int day
) {

}
