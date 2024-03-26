package com.backend.api.domain.notice.dto;

import com.backend.api.domain.notice.entity.Notification;
import com.backend.api.domain.notice.type.AlarmType;
import io.swagger.v3.oas.annotations.media.Schema;

public record NotificationResponseDto(

    @Schema(description = "알림 타입")
    AlarmType alarmType,

    @Schema(description = "방 Id")
    Long roomId,

    @Schema(description = "보낸 사람")
    String sender,

    @Schema(description = "내용")
    String content
) {

    public static NotificationResponseDto to(Notification notification){
        return new NotificationResponseDto(
            notification.getAlarmType(),
            Long.valueOf(notification.getContent()),
            notification.getSender(),
            notification.getContent())
            ;
    }

}
