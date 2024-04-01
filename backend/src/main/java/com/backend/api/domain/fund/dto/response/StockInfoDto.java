package com.backend.api.domain.fund.dto.response;
import io.swagger.v3.oas.annotations.media.Schema;

@Schema(name = "게임이 끝난 후 종목 정보 response Dto", description = "펀드게임 관련 response Dto")
public record StockInfoDto(
    @Schema(description = "종목 ID")
    Long stockId,
    @Schema(description = "종목 이름")
    String stockName
) {

}
