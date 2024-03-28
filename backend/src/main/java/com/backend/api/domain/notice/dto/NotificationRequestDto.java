package com.backend.api.domain.notice.dto;

import com.backend.api.domain.notice.type.AlarmType;
import io.swagger.v3.oas.annotations.media.Schema;

public record NotificationRequestDto(

    @Schema(description = "알림 타입")
    AlarmType alarmType,
    @Schema(description = "알림 내용")
    String content,

    @Schema(description = "초대가 갈 대상(채널)")
    String channelName,
    @Schema(description = "초대 보낸 사람")
    String sender,
    
    @Schema(description = "방 ID")
    Long roomId

) {
}
