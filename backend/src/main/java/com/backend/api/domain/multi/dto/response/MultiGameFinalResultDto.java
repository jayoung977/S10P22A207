package com.backend.api.domain.multi.dto.response;

import io.swagger.v3.oas.annotations.media.Schema;
import java.util.List;

public record MultiGameFinalResultDto(

    @Schema(description = "라운드별 정보")
    List<MultiGameResultDto> roundResultInfo,

    @Schema(description = "마지막 종합 정보")
    List<MultiGameTotalResultDto> totalResult
) {

}
