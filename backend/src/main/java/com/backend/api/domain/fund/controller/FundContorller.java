package com.backend.api.domain.fund.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.backend.api.domain.fund.dto.request.FundCloseReq;
import com.backend.api.domain.fund.dto.request.FundCreateReq;
import com.backend.api.domain.fund.dto.request.FundRegisterReq;
import com.backend.api.domain.fund.dto.request.FundStartReq;
import com.backend.api.domain.fund.dto.response.FundDetailRes;
import com.backend.api.domain.fund.dto.response.FundRes;
import com.backend.api.domain.fund.service.FundAndFundMemberService;
import com.backend.api.domain.fund.service.FundAndMemberService;
import com.backend.api.domain.fund.service.FundService;
import com.backend.api.global.common.BaseResponse;
import com.backend.api.global.common.code.SuccessCode;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;

@Log4j2
@RestController
@RequestMapping("/api/fund")
@PreAuthorize("hasAnyRole('USER')")
@RequiredArgsConstructor
@Tag(name = "펀드", description = "펀드 관련 API")
public class FundContorller {
	private final FundService fundService;
	private final FundAndFundMemberService fundAndFundMemberService;
	private final FundAndMemberService fundAndMemberService;

	@Operation(summary = "펀드 전체 목록 조회")
	@GetMapping("/list")
	public ResponseEntity<BaseResponse<List<FundRes>>> getAllFunds() {
		List<FundRes> fundResList = fundService.getAllFunds();
		return BaseResponse.success(
			SuccessCode.SELECT_SUCCESS,
			fundResList
		);
	}

	@Operation(summary = "운영중인 펀드 전체 목록 조회")
	@GetMapping("/running-list")
	public ResponseEntity<BaseResponse<List<FundRes>>> getRunningFunds() {
		List<FundRes> fundResList = fundService.getRunningFunds();
		return BaseResponse.success(
			SuccessCode.SELECT_SUCCESS,
			fundResList
		);
	}

	@Operation(summary = "모집중인 펀드 전체 목록 조회")
	@GetMapping("/recruiting-list")
	public ResponseEntity<BaseResponse<List<FundRes>>> getRecruitingFunds() {
		List<FundRes> fundResList = fundService.getRecruitingFunds();
		return BaseResponse.success(
			SuccessCode.SELECT_SUCCESS,
			fundResList
		);
	}
	//TODO: loginUserId -> @AuthenticationPrincipal UserDetails userDetails

	@Operation(summary = "내가 운영중인 펀드 목록 조회")
	@GetMapping("/managing-list")
	public ResponseEntity<BaseResponse<List<FundRes>>> getManagingFunds(Long loginUserId) {
		List<FundRes> fundResList = fundService.getManagingFunds(loginUserId);
		return BaseResponse.success(
			SuccessCode.SELECT_SUCCESS,
			fundResList
		);
	}

	@Operation(summary = "내가 가입한 펀드 목록 조회")
	@GetMapping("/investing-list")
	public ResponseEntity<BaseResponse<List<FundRes>>> getInvestingFunds(Long loginUserId) {
		List<FundRes> fundResList = fundService.getInvestingFunds(loginUserId);
		return BaseResponse.success(
			SuccessCode.SELECT_SUCCESS,
			fundResList
		);
	}

	@Operation(summary = "내가 가입한 펀드 중 종료된 펀드 목록 조회")
	@GetMapping("/investing-closed-list")
	public ResponseEntity<BaseResponse<List<FundRes>>> getClosedInvestingFunds(Long loginUserId) {
		List<FundRes> fundResList = fundService.getClosedInvestingFunds(loginUserId);
		return BaseResponse.success(
			SuccessCode.SELECT_SUCCESS,
			fundResList
		);
	}

	@Operation(summary = "펀드 상세 조회")
	@GetMapping("/fund-detail")
	public ResponseEntity<BaseResponse<FundDetailRes>> getFundDetail(Long fundId) {
		FundDetailRes fundDetailRes = fundService.getFundDetail(fundId);
		return BaseResponse.success(
			SuccessCode.SELECT_SUCCESS,
			fundDetailRes
		);
	}

	@Operation(summary = "펀드 검색")
	@GetMapping("/search")
	public ResponseEntity<BaseResponse<String>> searchFund(@Valid @NotNull @RequestParam String fundName) {
		fundService.searchFund(fundName);
		return BaseResponse.success(
			SuccessCode.SELECT_SUCCESS,
			"펀드 검색 성공"
		);
	}

	//TODO: loginUserId -> @AuthenticationPrincipal UserDetails userDetails
	@Operation(summary = "펀드 개설")
	@PostMapping("/open")
	public ResponseEntity<BaseResponse<String>> createFund(Long loginUserId,
		@Valid @NotNull @RequestBody FundCreateReq fundCreateReq) {
		fundService.createFund(loginUserId, fundCreateReq);
		return BaseResponse.success(
			SuccessCode.CREATE_SUCCESS,
			"펀드 개설 성공"
		);
	}

	//TODO: loginUserId -> @AuthenticationPrincipal UserDetails userDetails
	@Operation(summary = "펀드 종료")
	@PutMapping("/close")
	public ResponseEntity<BaseResponse<String>> closeFund(Long loginUserId,
		@Valid @NotNull @RequestBody FundCloseReq fundCloseReq) {
		fundAndMemberService.closeFund(loginUserId, fundCloseReq.fundId());
		return BaseResponse.success(
			SuccessCode.UPDATE_SUCCESS,
			"펀드 종료 성공"
		);
	}

	@Operation(summary = "펀드 가입")
	@PostMapping("/register")
	public ResponseEntity<BaseResponse<String>> registerFund(Long loginUserId, @Valid @NotNull @RequestBody
	FundRegisterReq fundRegisterReq) {
		fundAndFundMemberService.registerFund(loginUserId, fundRegisterReq);
		return BaseResponse.success(
			SuccessCode.UPDATE_SUCCESS,
			"펀드 가입 성공"
		);
	}

	@Operation(summary = "펀드 시작")
	@PutMapping("/start")
	public ResponseEntity<BaseResponse<String>> startFund(Long loginUserId, @Valid @NotNull @RequestBody
	FundStartReq fundStartReq) {
		fundService.startFund(loginUserId, fundStartReq);
		return BaseResponse.success(
			SuccessCode.UPDATE_SUCCESS,
			"펀드 시작 성공"
		);
	}


}
