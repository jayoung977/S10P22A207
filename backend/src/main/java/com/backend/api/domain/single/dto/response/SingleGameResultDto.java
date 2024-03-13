package com.backend.api.domain.single.dto.response;

import io.swagger.v3.oas.annotations.media.Schema;
import java.time.LocalDateTime;
import java.util.List;

@Schema(name = "싱글게임 결과 response Dto", description = "싱글게임 관련 response Dto")
public record SingleGameResultDto(

    @Schema(description = "각 종목의 Id와 이름")
    List<StockInfoDto> stockInfoDtoList,

    @Schema(description = "시작 날짜")
    LocalDateTime StartDate,
    @Schema(description = "끝 날짜")
    LocalDateTime endDate
) {

}
