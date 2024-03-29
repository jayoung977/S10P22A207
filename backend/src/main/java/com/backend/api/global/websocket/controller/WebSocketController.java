package com.backend.api.global.websocket.controller;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.web.bind.annotation.RestController;

import com.backend.api.global.common.SocketBaseDtoRes;
import com.backend.api.global.common.type.SocketType;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequiredArgsConstructor
@RestController
@Tag(name = "웹소켓", description = "웹소켓 관련 API")
public class WebSocketController {

    private final SimpMessageSendingOperations template;
    // private final RedisTemplate<String, Object> redisTemplate;

    /**
     * 소켓을 통해 메시지가 들어오면 받아서 해당되는 채널로 전달
     */
    @Operation(summary = "메시지 전송")
    @MessageMapping("/websocket/message")
    //TODO: 매개변수 RequestDto 로 수정
    public void receiveAndSendMessage(String endPoint, SimpMessageHeaderAccessor headerAccessor) {
        template.convertAndSend("/api/sub/" + endPoint, new SocketBaseDtoRes<>(SocketType.MESSAGE, endPoint));
    }
}