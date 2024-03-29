package com.backend.api.domain.single.dto.response;

import io.swagger.v3.oas.annotations.media.Schema;

import java.util.List;

public record SingleLogTradeListDto(

        @Schema(description = "종목 Id")
        Long stockId,

        @Schema(description = "종목별 매매기록")
        List<SingleLogTradeDto> singleLogTradeDtoList

) {

}
