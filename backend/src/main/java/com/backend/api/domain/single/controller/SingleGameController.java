package com.backend.api.domain.single.controller;

import com.backend.api.domain.single.dto.request.NextDayRequestDto;
import com.backend.api.domain.single.dto.request.SingleTradeRequestDto;
import com.backend.api.domain.single.dto.response.*;
import com.backend.api.domain.single.service.SingleGameService;
import com.backend.api.global.common.BaseResponse;
import com.backend.api.global.common.code.SuccessCode;
import com.backend.api.global.security.userdetails.CustomUserDetails;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@PreAuthorize("hasAnyRole('USER')")
@RequestMapping("/api/single")
@RequiredArgsConstructor
public class SingleGameController {

    private final SingleGameService singleGameService;

    @GetMapping("/is-existing-single-game")
    @Operation(summary = "진행중인 싱글게임 존재 확인", description = "싱글게임 모드를 선택하면 진행 중인 게임이 있는지 알려줍니다.", tags = {"싱글게임"})
    public ResponseEntity<BaseResponse<ExistingSingleGameResponseDto>> isExistingSingleGame(@AuthenticationPrincipal CustomUserDetails userDetails) {
        return BaseResponse.success(SuccessCode.SELECT_SUCCESS, singleGameService.existSingleGame(userDetails.getId()));
    }

    @GetMapping
    @Operation(summary = "싱글게임 생성 or 불러오기", description = "싱글게임 모드를 선택하면 싱글 모드 게임을 가져옵니다.", tags = {"싱글게임"})
    public ResponseEntity<BaseResponse<SingleGameCreateResponseDto>> getSingleGame(@AuthenticationPrincipal CustomUserDetails userDetails) {
        SingleGameCreateResponseDto responseDto = singleGameService.createGame(userDetails.getId());
        return BaseResponse.success(SuccessCode.SELECT_SUCCESS, responseDto);
    }

    @PostMapping("/sell")
    @Operation(summary = "싱글 - 매도", description = "싱글게임 내에서 매도 하면 해당 종목을 팝니다.", tags = {"싱글게임"})
    public ResponseEntity<BaseResponse<SingleTradeResponseDto>> sellStock(@RequestBody SingleTradeRequestDto dto, @AuthenticationPrincipal CustomUserDetails userDetails) {
        return BaseResponse.success(SuccessCode.SELL_SUCCESS, singleGameService.sell(dto, userDetails.getId()));
    }

    @PostMapping("/buy")
    @Operation(summary = "싱글 - 매수", description = "싱글게임 내에서 매수 하면 해당 종목을 삽니다.", tags = {"싱글게임"})
    public ResponseEntity<BaseResponse<SingleTradeResponseDto>> buyStock(@RequestBody SingleTradeRequestDto dto, @AuthenticationPrincipal CustomUserDetails userDetails) {
        return BaseResponse.success(SuccessCode.BUY_SUCCESS, singleGameService.buy(dto, userDetails.getId()));
    }

    @PostMapping("/tomorrow")
    @Operation(summary = "싱글 - 하루 경과", description = "싱글게임 내에서 하루가 지나면 경과를 보여줍니다.", tags = {"싱글게임"})
    public ResponseEntity<BaseResponse<NextDayResponseDto>> getTomorrow(@RequestBody NextDayRequestDto dto, @AuthenticationPrincipal CustomUserDetails userDetails) {

        return BaseResponse.success(SuccessCode.CHECK_SUCCESS, singleGameService.getTomorrow(dto, userDetails.getId()));
    }
    @GetMapping("/log")
    @Operation(summary = "싱글게임 복기", description = "싱글기록을 선택하면 해당 싱글게임기록을 가져옵니다.", tags = {"싱글게임"})
    public ResponseEntity<BaseResponse<SingleGameLogResponseDto>> getSingleGameLog(@RequestParam(name = "singleGameLogId") Long singleGameLogId) {
        SingleGameLogResponseDto responseDto = singleGameService.getSingleGameLog(singleGameLogId);
        return BaseResponse.success(SuccessCode.SELECT_SUCCESS, responseDto);
    }
    @GetMapping("/log/member")
    @Operation(summary = "싱글게임 종목 중 상위 3위 안에 드는 어떤 멤버의 매매기록 및 해당 주식차트 반환", description = "싱글기록에서 어떤 종목에 상위 3위 유저중 어떤 유저를 선택하면 해당 유저의 매매기록과 해당시점의 주식차트를 가져옵니다.", tags = {"싱글게임"})
    public ResponseEntity<BaseResponse<SingleLogRankMemberLogDto>> getSingleGameRankMemberLog(@RequestParam(name = "singelGameStockId") Long singelGameStockId, @RequestParam(name = "memberId") Long memberId) {
        SingleLogRankMemberLogDto responseDto = singleGameService.getSingleGameRankMemberLog(singelGameStockId, memberId);
        return BaseResponse.success(SuccessCode.SELECT_SUCCESS, responseDto);
    }
}

