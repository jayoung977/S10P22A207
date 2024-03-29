package com.backend.api.domain.multi.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.backend.api.domain.multi.service.MultiGameInviteService;
import com.backend.api.global.common.BaseResponse;
import com.backend.api.global.common.SocketBaseDtoRes;
import com.backend.api.global.common.code.SuccessCode;
import com.backend.api.global.common.type.SocketType;
import com.backend.api.global.security.userdetails.CustomUserDetails;
import com.backend.api.global.websocket.dto.request.FriendInviteReq;
import com.backend.api.global.websocket.dto.response.FriendInviteRes;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;

@RestController
@RequestMapping("/api/multi")
@RequiredArgsConstructor
@Log4j2
@Tag(name = "멀티게임 친구", description = "멀티게임 친구 관련 API")
public class MultiGameAndFriendController {
	private final SimpMessageSendingOperations template;
	private final MultiGameInviteService multiGameInviteService;


	@PostMapping("/invite")
	@Operation(summary = "멀티게임 친구 초대", description = "멀티게임 모드에서 친구를 초대합니다.")
	public ResponseEntity<BaseResponse<String>> inviteFriendMultiGame(@AuthenticationPrincipal CustomUserDetails userDetails, @RequestBody FriendInviteReq friendInviteReq){
		log.info("멀티게임 친구 초대 {} ", friendInviteReq);
		FriendInviteRes friendInviteRes = multiGameInviteService.inviteFriend(friendInviteReq, userDetails.getId());
		template.convertAndSend("/api/sub/" + friendInviteRes.receiverId(), new SocketBaseDtoRes<>(SocketType.INVITE, friendInviteRes));

		return BaseResponse.success(
			SuccessCode.SELECT_SUCCESS,
			"초대 전송 성공"
		);
	}
}
