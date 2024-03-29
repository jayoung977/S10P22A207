package com.backend.api.domain.multi.controller;

import com.backend.api.domain.multi.service.MultiGameSocketService;
import com.backend.api.global.common.BaseResponse;
import com.backend.api.global.common.SocketBaseDtoRes;
import com.backend.api.global.common.code.SuccessCode;
import com.backend.api.global.common.type.SocketType;
import com.backend.api.global.security.userdetails.CustomUserDetails;
import com.backend.api.global.websocket.dto.request.FriendInviteReq;
import com.backend.api.global.websocket.dto.response.FriendInviteRes;
import com.fasterxml.jackson.core.JsonProcessingException;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("/api/multi")
@RequiredArgsConstructor
@Log4j2
@Tag(name = "멀티게임 소켓", description = "멀티게임 소켓 관련 API")
public class MultiGameSocketController {

	private final SimpMessageSendingOperations template;
	private final MultiGameSocketService multiGameSocketService;
	private final RedisTemplate<String, Object> redisTemplate;

	@PostMapping("/invite")
	@Operation(summary = "멀티게임 친구 초대", description = "멀티게임 모드에서 친구를 초대합니다.")
	public ResponseEntity<BaseResponse<String>> inviteFriendMultiGame(
		@AuthenticationPrincipal CustomUserDetails userDetails, @RequestBody FriendInviteReq friendInviteReq) {
		log.info("멀티게임 친구 초대 {} ", friendInviteReq);
		FriendInviteRes friendInviteRes = multiGameSocketService.inviteFriend(friendInviteReq, userDetails.getId());
		template.convertAndSend("/api/sub/" + friendInviteRes.receiverId(),
			new SocketBaseDtoRes<>(SocketType.INVITE, friendInviteRes));
		return BaseResponse.success(
			SuccessCode.SELECT_SUCCESS,
			"초대 전송 성공"
		);
	}

	@PostMapping("/ready")
	@Operation(summary = "멀티게임 레디", description = "멀티게임 모드에서 레디 상태를 변경합니다.")
	public ResponseEntity<BaseResponse<Boolean>> readyMultiRoom(@AuthenticationPrincipal CustomUserDetails userDetails,
		@RequestParam Long roomId) throws JsonProcessingException {
		log.info("멀티게임 레디 {} ", roomId);
		Boolean readyState = multiGameSocketService.readyMultiRoom(userDetails.getId(), roomId);
		return BaseResponse.success(
			SuccessCode.SELECT_SUCCESS,
			readyState
		);
	}

	@DeleteMapping("/exit")
	@Operation(summary = "멀티게임 대기방 나가기", description = "멀티게임 모드에서 대기방을 나갑니다.")
	public ResponseEntity<BaseResponse<String>> exitMultiRoom(@AuthenticationPrincipal CustomUserDetails userDetails,
		@RequestParam Long roomId) throws JsonProcessingException {
		log.info("멀티게임 나가기 {} ", roomId);
		multiGameSocketService.exitMultiRoom(userDetails, roomId);
		return BaseResponse.success(
			SuccessCode.SELECT_SUCCESS,
			"나가기 성공"
		);
	}
}
