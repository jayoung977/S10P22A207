package com.backend.api.domain.friend.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.backend.api.domain.friend.dto.response.FriendCursorRes;
import com.backend.api.domain.friend.dto.response.FriendRes;
import com.backend.api.domain.friend.service.FriendService;
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
@RequestMapping("/api/friend")
@PreAuthorize("hasAnyRole('USER')")
@RequiredArgsConstructor
@Tag(name = "친구", description = "친구 관련 API")
public class FriendController {
	private final FriendService friendService;

	@Operation(summary = "친구 전체 목록 조회")
	@GetMapping("/list")
	public ResponseEntity<BaseResponse<List<FriendRes>>> getAllFriends(@AuthenticationPrincipal CustomUserDetails userDetails) {
		List<FriendRes> friendResList = friendService.getAllFriends(userDetails.getId());
		return BaseResponse.success(
			SuccessCode.SELECT_SUCCESS,
			friendResList
		);
	}

	@Operation(summary = "친구 목록 조회 커서 기반 페이징")
	@GetMapping("/cursor")
	public ResponseEntity<BaseResponse<FriendCursorRes>> getAllFriendsWithCursor(@AuthenticationPrincipal CustomUserDetails userDetails,
		@Valid @NotNull @RequestParam(name = "cursor") Long cursor) {
		FriendCursorRes friendCursorRes = friendService.getFriendsWithCursor(userDetails.getId(), cursor);
		return BaseResponse.success(
			SuccessCode.SELECT_SUCCESS,
			friendCursorRes
		);
	}

	@Operation(summary = "친구 검색")
	@GetMapping("/search")
	public ResponseEntity<BaseResponse<List<FriendRes>>> searchFriends(@AuthenticationPrincipal CustomUserDetails userDetails,
		@Valid @NotNull @RequestParam(name = "nickname") String nickname) {
		List<FriendRes> friendResList = friendService.searchFriends(userDetails.getId(), nickname);
		return BaseResponse.success(
			SuccessCode.SELECT_SUCCESS,
			friendResList
		);
	}

	@Operation(summary = "친구 삭제")
	@DeleteMapping("/delete")
	public ResponseEntity<BaseResponse<String>> deleteFriend(@AuthenticationPrincipal CustomUserDetails userDetails,
		@Valid @NotNull @RequestParam(name = "followingId") Long followingId) {
		friendService.deleteFriend(userDetails.getId(), followingId);
		return BaseResponse.success(
			SuccessCode.DELETE_SUCCESS,
			"친구 삭제 성공"
		);
	}

	@Operation(summary = "친구 확인")
	@GetMapping("/check-friend")
	public ResponseEntity<BaseResponse<Boolean>> checkFriend(@AuthenticationPrincipal CustomUserDetails userDetails,
		@Valid @NotNull @RequestParam(name = "followingId") Long followingId) {
		var result = friendService.checkFriend(userDetails.getId(), followingId);
		return BaseResponse.success(
			SuccessCode.DELETE_SUCCESS,
			result
		);
	}
}
