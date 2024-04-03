package com.backend.api.domain.multi.dto.response;

import io.swagger.v3.oas.annotations.media.Schema;
import java.util.List;

public record MultiGameInfo(

    @Schema(description = "자산순 플레이어 정보")
    List<PlayerRankInfo> playerRankInfoList

) {

}
