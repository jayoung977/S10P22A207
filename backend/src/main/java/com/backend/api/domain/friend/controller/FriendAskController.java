package com.backend.api.domain.friend.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.backend.api.domain.friend.dto.request.FriendReq;
import com.backend.api.domain.friend.dto.response.FriendRes;
import com.backend.api.domain.friend.service.FriendAndFriendAskService;
import com.backend.api.domain.friend.service.FriendAskService;
import com.backend.api.global.common.BaseResponse;
import com.backend.api.global.common.code.SuccessCode;
import com.backend.api.global.security.userdetails.CustomUserDetails;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;

@Log4j2
@RestController
@RequestMapping("/api/friend-ask")
@PreAuthorize("hasAnyRole('USER')")
@RequiredArgsConstructor
@Tag(name = "친구 요청", description = "친구 요청 관련 API")
public class FriendAskController {
	private final FriendAskService friendAskService;
	private final FriendAndFriendAskService friendAndFriendAskService;

	@Operation(summary = "보낸 친구 요청 목록 조회")
	@GetMapping("send-list")
	public ResponseEntity<BaseResponse<List<FriendRes>>> getSendFriendAskList(
		@AuthenticationPrincipal CustomUserDetails userDetails) {
		List<FriendRes> friendResList = friendAskService.getSendFriendAskList(userDetails.getId());
		return BaseResponse.success(
			SuccessCode.SELECT_SUCCESS,
			friendResList
		);
	}

	@Operation(summary = "받은 친구 요청 목록 조회")
	@GetMapping("receive-list")
	public ResponseEntity<BaseResponse<List<FriendRes>>> getReceiveFriendAskList(
		@AuthenticationPrincipal CustomUserDetails userDetails) {
		List<FriendRes> friendResList = friendAskService.getReceiveFriendAskList(userDetails.getId());
		return BaseResponse.success(
			SuccessCode.SELECT_SUCCESS,
			friendResList
		);
	}

	@Operation(summary = "친구 요청 보내기")
	@PostMapping("")
	public ResponseEntity<BaseResponse<String>> createFriendAsk(@AuthenticationPrincipal CustomUserDetails userDetails,
		@NotNull @Valid @RequestBody FriendReq friendReq) {
		friendAskService.createFriendAsk(userDetails.getId(), friendReq.nickname());
		return BaseResponse.success(
			SuccessCode.CREATE_SUCCESS,
			"친구 요청을 보냈습니다."
		);
	}

	@Operation(summary = "친구 요청 수락")
	@PostMapping("/accept")
	public ResponseEntity<BaseResponse<String>> acceptFriendAsk(@AuthenticationPrincipal CustomUserDetails userDetails,
		@NotNull @Valid @RequestBody FriendReq friendReq) {
		friendAndFriendAskService.acceptFriendAsk(userDetails.getId(), friendReq.nickname());
		return BaseResponse.success(
			SuccessCode.CREATE_SUCCESS,
			"친구 요청을 수락했습니다."
		);
	}

	@Operation(summary = "친구 요청 거절")
	@DeleteMapping("/reject")
	public ResponseEntity<BaseResponse<String>> rejectFriendAsk(@AuthenticationPrincipal CustomUserDetails userDetails,
		@NotNull @Valid @RequestParam String nickname) {
		friendAskService.rejectFriendAsk(userDetails.getId(), nickname);
		return BaseResponse.success(
			SuccessCode.DELETE_SUCCESS,
			"친구 요청을 거절했습니다."
		);
	}

	@Operation(summary = "친구 요청 취소")
	@DeleteMapping("/cancel")
	public ResponseEntity<BaseResponse<String>> cancelFriendAsk(@AuthenticationPrincipal CustomUserDetails userDetails,
		@NotNull @Valid @RequestParam String nickname) {
		friendAskService.cancelFriendAsk(userDetails.getId(), nickname);
		return BaseResponse.success(
			SuccessCode.DELETE_SUCCESS,
			"친구 요청을 취소했습니다."
		);
	}
}
