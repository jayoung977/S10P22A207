package com.backend.api.domain.single.dto.response;

import io.swagger.v3.oas.annotations.media.Schema;

public record ExistingSingleGameResponseDto(
    @Schema(description = "진행중인 게임이 있는지 여부")
    boolean isExistSingleGame,

    @Schema(description = "남은 게임 가능 횟수")
    Integer singleGameChance

) {

}
