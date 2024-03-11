package com.backend.api.domain.member.api;

import java.text.ParseException;
import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.backend.api.domain.member.application.MemberService;
import com.backend.api.domain.member.dto.request.MemberAdditionalInfoReq;
import com.backend.api.domain.member.dto.response.MemberProfileRes;
import com.backend.api.domain.member.dto.response.MemberSearchRes;
import com.backend.api.domain.member.dto.response.ProfileMultiGameLogRes;
import com.backend.api.domain.member.dto.response.ProfileSingleGameLogRes;
import com.backend.api.global.common.BaseResponse;
import com.backend.api.global.common.code.SuccessCode;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;

@Log4j2
@RestController
@RequestMapping("/api/member")
@RequiredArgsConstructor
@Tag(name = "멤버", description = "멤버 관련 API")
public class MemberController {
	private final MemberService memberService;


	// @PreAuthorize("permitAll()")
	@Operation(
		summary = "닉네임 중복 체크",
		description = "닉네임이 중복될 때 true반환, " +
			"닉네임 중복되지 않을 때 false 반환"
	)
	@GetMapping("/nickname/check")
	public ResponseEntity<BaseResponse<Boolean>> checkNicknameDuplicate(
		@Valid @NotNull @Size(min = 2, max = 16) @RequestParam(name = "nickname") String nickname) {
		var result = memberService.existNickname(nickname);
		return BaseResponse.success(
			SuccessCode.CHECK_SUCCESS,
			result
		);
	}

	//TODO: Long loginUserId -> @AuthenticationPrincipal UserDetails userDetails
	@Operation(summary = "로그인 후 추가 정보 저장")
	// @PreAuthorize("hasAnyRole('ANONYMOUS')")
	@PutMapping("/additional-info")
	public ResponseEntity<BaseResponse<String>> saveAdditionalInfo(
		@Valid @RequestBody MemberAdditionalInfoReq memberAdditionalInfoReq,
		Long loginUserId
	) throws ParseException {
		memberService.updateMemberInfo(loginUserId, memberAdditionalInfoReq);
		return BaseResponse.success(
			SuccessCode.UPDATE_SUCCESS,
			"추가 정보 저장 성공"
		);
	}
	//TODO: Long loginUserId -> @AuthenticationPrincipal UserDetails userDetails
	@Operation(summary = "내 정보 조회")
	@GetMapping("")
	public ResponseEntity<BaseResponse<MemberProfileRes>> getMyProfile(Long loginUserId) {
		MemberProfileRes myProfileMemberRes = memberService.getProfile(loginUserId);
		return BaseResponse.success(
			SuccessCode.SELECT_SUCCESS,
			myProfileMemberRes
		);
	}

	//TODO: Long loginUserId -> @AuthenticationPrincipal UserDetails userDetails
	@Operation(summary = "내 싱글게임 기록 조회")
	@GetMapping("/single-game-log")
	public ResponseEntity<BaseResponse<List<ProfileSingleGameLogRes>>> getMySingleGameLog(Long loginUserId) {
		List<ProfileSingleGameLogRes> ProfileSingleGameLogResList = memberService.getSingleGameLogs(loginUserId);
		return BaseResponse.success(
			SuccessCode.SELECT_SUCCESS,
			ProfileSingleGameLogResList
		);
	}

	//TODO: Long loginUserId -> @AuthenticationPrincipal UserDetails userDetails
	@Operation(summary = "내 멀티게임 기록 조회")
	@GetMapping("/multi-game-log")
	public ResponseEntity<BaseResponse<List<ProfileMultiGameLogRes>>> getMyMultiGameLog(Long loginUserId) {
		List<ProfileMultiGameLogRes> ProfileMultiGameLogResList = memberService.getMultiGameLogs(loginUserId);
		return BaseResponse.success(
			SuccessCode.SELECT_SUCCESS,
			ProfileMultiGameLogResList
		);
	}

	@Operation(summary = "멤버 검색")
	@GetMapping("/search")
	public ResponseEntity<BaseResponse<List<MemberSearchRes>>> searchMember(String nickname) {
		List<MemberSearchRes> memberSearchResList = memberService.searchMember(nickname);
		return BaseResponse.success(
			SuccessCode.SELECT_SUCCESS,
			memberSearchResList
		);
	}
}
