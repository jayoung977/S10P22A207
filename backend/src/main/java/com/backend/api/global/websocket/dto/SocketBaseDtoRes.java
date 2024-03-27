package com.backend.api.global.websocket.dto;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

import com.backend.api.global.websocket.type.SocketType;

import io.swagger.v3.oas.annotations.media.Schema;

@Schema(description = "소켓 응답 Base DTO")
public record SocketBaseDtoRes<T>(
        SocketType type,
        @Schema(description = "응답 시간")
        String time,
        T result
) {
    public SocketBaseDtoRes {
        // 현재 시간을 time 변수에 적용
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
        time = LocalDateTime.now().format(formatter);
    }

    public SocketBaseDtoRes(SocketType type, T result) {
        this(type, null, result);
    }
}
