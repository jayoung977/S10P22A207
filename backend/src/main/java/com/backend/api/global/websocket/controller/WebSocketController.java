package com.backend.api.global.websocket.controller;

import com.backend.api.domain.multi.service.MultiGameSocketService;
import com.backend.api.global.common.SocketBaseDtoRes;
import com.backend.api.global.common.type.SocketType;
import com.backend.api.global.websocket.dto.request.WebSocketMessageReq;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RequiredArgsConstructor
@RestController
@Tag(name = "웹소켓", description = "웹소켓 관련 API")
public class WebSocketController {

	private final SimpMessageSendingOperations template;
	private final RedisTemplate<String, Object> redisTemplate;
	private final ObjectMapper objectMapper;
	private final MultiGameSocketService multiGameSocketService;

	/**
	 * 소켓을 통해 메시지가 들어오면 받아서 해당되는 채널로 전달
	 */
	@Operation(summary = "메시지 전송")
	@MessageMapping("/websocket/message")
	public void receiveAndSendMessage(WebSocketMessageReq webSocketMessageReq,
		SimpMessageHeaderAccessor headerAccessor) throws
		JsonProcessingException {
		/* 채팅방에 있는 모든 유저에게 메시지 전송 */
		log.info("메시지 전송: {}", webSocketMessageReq);
		multiGameSocketService.sendMessageToMultiWaitingRoom(webSocketMessageReq.roomId(),
			new SocketBaseDtoRes<>(SocketType.MESSAGE, webSocketMessageReq));
		log.info("메시지 전송 완료");
	}
}