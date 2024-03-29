package com.backend.api.domain.multi.dto.response;

import io.swagger.v3.oas.annotations.media.Schema;

public record MultiGameStartResponseDto(

    //TODO : 이거 그냥 게임 로그 ID만으로 끝나면 안될것 같은데
    @Schema(description = "게임 로그 ID")
    Long gameLogId

) {

}
