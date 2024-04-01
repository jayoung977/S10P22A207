package com.backend.api.domain.fund.controller;

import com.backend.api.domain.fund.dto.request.*;
import com.backend.api.domain.fund.dto.response.*;
import com.backend.api.domain.fund.service.FundAndFundMemberService;
import com.backend.api.domain.fund.service.FundAndMemberService;
import com.backend.api.domain.fund.service.FundService;
import com.backend.api.global.common.BaseResponse;
import com.backend.api.global.common.code.SuccessCode;
import com.backend.api.global.security.userdetails.CustomUserDetails;
import io.swagger.v3.oas.annotations.Operation;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Log4j2
@RestController
@RequestMapping("/api/fund")
@PreAuthorize("hasAnyRole('USER')")
@RequiredArgsConstructor
public class FundController {
	private final FundService fundService;
	private final FundAndFundMemberService fundAndFundMemberService;
	private final FundAndMemberService fundAndMemberService;

	@Operation(summary = "펀드 전체 목록 조회",tags = {"펀드"})
	@GetMapping("/list")
	public ResponseEntity<BaseResponse<List<FundRes>>> getAllFunds() {
		List<FundRes> fundResList = fundService.getAllFunds();
		return BaseResponse.success(
			SuccessCode.SELECT_SUCCESS,
			fundResList
		);
	}

	@Operation(summary = "운영중인 펀드 전체 목록 조회",tags = {"펀드"})
	@GetMapping("/running-list")
	public ResponseEntity<BaseResponse<List<FundRes>>> getRunningFunds() {
		List<FundRes> fundResList = fundService.getRunningFunds();
		return BaseResponse.success(
			SuccessCode.SELECT_SUCCESS,
			fundResList
		);
	}

	@Operation(summary = "모집중인 펀드 전체 목록 조회",tags = {"펀드"})
	@GetMapping("/recruiting-list")
	public ResponseEntity<BaseResponse<List<FundRes>>> getRecruitingFunds() {
		List<FundRes> fundResList = fundService.getRecruitingFunds();
		return BaseResponse.success(
			SuccessCode.SELECT_SUCCESS,
			fundResList
		);
	}

	@Operation(summary = "내가 운영중인 펀드 목록 조회",tags = {"펀드"})
	@GetMapping("/managing-list")
	public ResponseEntity<BaseResponse<List<FundRes>>> getMyManagingFunds(@AuthenticationPrincipal CustomUserDetails userDetails) {
		List<FundRes> fundResList = fundService.getManagingFunds(userDetails.getId());
		return BaseResponse.success(
			SuccessCode.SELECT_SUCCESS,
			fundResList
		);
	}

	@Operation(summary = "다른사람 운영중인 펀드 목록 조회",tags = {"펀드"})
	@GetMapping("/other-managing-list")
	public ResponseEntity<BaseResponse<List<FundRes>>> getManagingFunds(@RequestParam Long managerId) {
		List<FundRes> fundResList = fundService.getManagingFunds(managerId);
		return BaseResponse.success(
			SuccessCode.SELECT_SUCCESS,
			fundResList
		);
	}

	@Operation(summary = "내가 가입한 펀드 목록 조회",tags = {"펀드"})
	@GetMapping("/investing-list")
	public ResponseEntity<BaseResponse<List<FundRes>>> getMyInvestingFunds(@AuthenticationPrincipal CustomUserDetails userDetails) {
		List<FundRes> fundResList = fundService.getInvestingFunds(userDetails.getId());
		return BaseResponse.success(
			SuccessCode.SELECT_SUCCESS,
			fundResList
		);
	}

	@Operation(summary = "다른사람 가입한 펀드 목록 조회",tags = {"펀드"})
	@GetMapping("/other-investing-list")
	public ResponseEntity<BaseResponse<List<FundRes>>> getInvestingFunds(@RequestParam Long memberId){
		List<FundRes> fundResList = fundService.getInvestingFunds(memberId);
		return BaseResponse.success(
			SuccessCode.SELECT_SUCCESS,
			fundResList
		);
	}

	@Operation(summary = "내가 가입한 펀드 중 종료된 펀드 목록 조회",tags = {"펀드"})
	@GetMapping("/investing-closed-list")
	public ResponseEntity<BaseResponse<List<FundRes>>> getMyClosedInvestingFunds(@AuthenticationPrincipal CustomUserDetails userDetails) {
		List<FundRes> fundResList = fundService.getClosedInvestingFunds(userDetails.getId());
		return BaseResponse.success(
			SuccessCode.SELECT_SUCCESS,
			fundResList
		);
	}

	@Operation(summary = "다른사람 가입한 펀드 중 종료된 펀드 목록 조회",tags = {"펀드"})
	@GetMapping("/other-investing-closed-list")
	public ResponseEntity<BaseResponse<List<FundRes>>> getClosedInvestingFunds(@RequestParam Long memberId) {
		List<FundRes> fundResList = fundService.getClosedInvestingFunds(memberId);
		return BaseResponse.success(
			SuccessCode.SELECT_SUCCESS,
			fundResList
		);
	}

	@Operation(summary = "펀드 상세 조회",tags = {"펀드"})
	@GetMapping("/fund-detail")
	public ResponseEntity<BaseResponse<FundDetailRes>> getFundDetail(@NotNull @Valid @RequestParam Long fundId) {
		FundDetailRes fundDetailRes = fundService.getFundDetail(fundId);
		return BaseResponse.success(
			SuccessCode.SELECT_SUCCESS,
			fundDetailRes
		);
	}

	@Operation(summary = "펀드 검색",tags = {"펀드"})
	@GetMapping("/search")
	public ResponseEntity<BaseResponse<List<FundRes>>> searchFund(@Valid @NotNull @RequestParam String fundName) {
		List<FundRes> fundResList = fundService.searchFund(fundName);
		return BaseResponse.success(
			SuccessCode.SELECT_SUCCESS,
			fundResList
		);
	}

	@Operation(summary = "펀드 개설",tags = {"펀드"})
	@PostMapping("/open")
	public ResponseEntity<BaseResponse<Long>> createFund(@AuthenticationPrincipal CustomUserDetails userDetails,
		@Valid @NotNull @RequestBody FundCreateReq fundCreateReq) {
		Long createdFundId = fundService.createFund(userDetails.getId(), fundCreateReq);
		return BaseResponse.success(
			SuccessCode.CREATE_SUCCESS,
			createdFundId
		);
	}

	@Operation(summary = "펀드 종료",tags = {"펀드"})
	@PutMapping("/close")
	public ResponseEntity<BaseResponse<String>> closeFund(@AuthenticationPrincipal CustomUserDetails userDetails,
		@Valid @NotNull @RequestBody FundCloseReq fundCloseReq) {
		fundAndMemberService.closeFund(userDetails.getId(), fundCloseReq.fundId());
		return BaseResponse.success(
			SuccessCode.UPDATE_SUCCESS,
			"펀드 종료 성공"
		);
	}

	@Operation(summary = "펀드 가입",tags = {"펀드"})
	@PostMapping("/register")
	public ResponseEntity<BaseResponse<Long>> registerFund(@AuthenticationPrincipal CustomUserDetails userDetails, @Valid @NotNull @RequestBody
	FundRegisterReq fundRegisterReq) {
		Long fundId = fundAndFundMemberService.registerFund(userDetails.getId(), fundRegisterReq);
		return BaseResponse.success(
			SuccessCode.UPDATE_SUCCESS,
			fundId
		);
	}

	@Operation(summary = "펀드 시작",tags = {"펀드"})
	@PutMapping("/start")
	public ResponseEntity<BaseResponse<Long>> startFund(@AuthenticationPrincipal CustomUserDetails userDetails, @Valid @NotNull @RequestBody
	FundStartReq fundStartReq) {
		Long fundId = fundService.startFund(userDetails.getId(), fundStartReq);
		return BaseResponse.success(
			SuccessCode.UPDATE_SUCCESS,
			fundId
		);
	}

	@Operation(
		summary = "펀드 이름 중복 체크",
		description = "펀드 이름이 중복될 때 true반환, " +
			"펀드 이름 중복되지 않을 때 false 반환",
		tags = {"펀드"}
	)
	@GetMapping("/fundname/check")
	public ResponseEntity<BaseResponse<Boolean>> checkFundNameDuplicate(
		@Valid @NotNull @RequestParam(name = "fundName") String fundName) {
		var result = fundService.existsFundname(fundName);
		return BaseResponse.success(
			SuccessCode.CHECK_SUCCESS,
			result
		);
	}

	@GetMapping("/game")
	@Operation(summary = "펀드 게임 생성", description = "펀드게임 하러가기를 선택하면 펀드게임 게임을 가져옵니다.", tags = {"펀드게임"})
	public ResponseEntity<BaseResponse<FundGameCreateResponseDto>> getFundGame(@RequestParam(name = "fundId") Long fundId, @AuthenticationPrincipal CustomUserDetails userDetails) {
		FundGameCreateResponseDto responseDto = fundService.createGame(fundId, userDetails.getId());
		return BaseResponse.success(SuccessCode.SELECT_SUCCESS, responseDto);
	}
	@PostMapping("/game/sell")
	@Operation(summary = "펀드게임 - 매도", description = "펀드게임 내에서 매도 하면 해당 종목을 팝니다.", tags = {"펀드게임"})
	public ResponseEntity<BaseResponse<FundTradeResponseDto>> sellStock(@RequestBody FundTradeRequestDto dto, @AuthenticationPrincipal CustomUserDetails userDetails) {
		return BaseResponse.success(SuccessCode.SELL_SUCCESS, fundService.sell(dto, userDetails.getId()));
	}

	@PostMapping("/game/buy")
	@Operation(summary = "펀드게임 - 매수", description = "펀드게임 내에서 매수 하면 해당 종목을 삽니다.", tags = {"펀드게임"})
	public ResponseEntity<BaseResponse<FundTradeResponseDto>> buyStock(@RequestBody FundTradeRequestDto dto, @AuthenticationPrincipal CustomUserDetails userDetails) {
		return BaseResponse.success(SuccessCode.BUY_SUCCESS, fundService.buy(dto, userDetails.getId()));
	}
	@PostMapping("/game/tomorrow")
	@Operation(summary = "펀드게임 - 하루 경과", description = "펀드게임 내에서 하루가 지나면 경과를 보여줍니다", tags = {"펀드게임"})
	public ResponseEntity<BaseResponse<NextDayResponseDto>> getTomorrow(@RequestBody NextDayRequestDto dto, @AuthenticationPrincipal CustomUserDetails userDetails) {

		return BaseResponse.success(SuccessCode.CHECK_SUCCESS, fundService.getTomorrow(dto, userDetails.getId()));
	}
}
