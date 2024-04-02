package com.backend.api.domain.notice.dto;

import com.backend.api.domain.notice.entity.Notice;
import com.backend.api.domain.notice.type.AlarmType;
import io.swagger.v3.oas.annotations.media.Schema;

public record NotificationResponseDto(

    @Schema(description = "알림 타입")
    AlarmType alarmType,
    @Schema(description = "받는 사람")
    String member,
    @Schema(description = "보낸 사람")
    String sender,
    @Schema(description = "내용")
    String content
) {

    public static NotificationResponseDto to(Notice notice){
        return new NotificationResponseDto(
            notice.getAlarmType(),
            notice.getMember().getNickname(),
            notice.getSender(),
            notice.getContent())
            ;
    }

}
