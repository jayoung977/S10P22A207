package com.backend.api.domain.multi.controller;

import com.backend.api.domain.member.entity.Member;
import com.backend.api.domain.member.repository.MemberRepository;
import com.backend.api.domain.multi.dto.MultiGameResultRequestDto;
import com.backend.api.domain.multi.dto.request.MultiGameRoomCreateRequestDto;
import com.backend.api.domain.multi.dto.request.MultiGameStartRequestDto;
import com.backend.api.domain.multi.dto.request.MultiNextDayRequestDto;
import com.backend.api.domain.multi.dto.request.MultiTradeRequestDto;
import com.backend.api.domain.multi.dto.response.MultiGameFinalResultDto;
import com.backend.api.domain.multi.dto.response.MultiGameResultDto;
import com.backend.api.domain.multi.dto.response.MultiGameRoomCreateResponseDto;
import com.backend.api.domain.multi.dto.response.MultiGameRoomEnterResponseDto;
import com.backend.api.domain.multi.dto.response.MultiGameRoomsResponseDto;
import com.backend.api.domain.multi.dto.response.MultiGameStartResponseDto;
import com.backend.api.domain.multi.dto.response.MultiLogResponseDto;
import com.backend.api.domain.multi.dto.response.MultiNextDayResponseDto;
import com.backend.api.domain.multi.dto.response.MultiTradeResponseDto;
import com.backend.api.domain.multi.service.MultiGameService;
import com.backend.api.domain.multi.service.MultiGameSocketService;
import com.backend.api.domain.multi.service.MultiGameSubResultRequestDto;
import com.backend.api.domain.multi.service.MultiGameSocketService;
import com.backend.api.global.common.BaseResponse;
import com.backend.api.global.common.code.ErrorCode;
import com.backend.api.global.common.code.SuccessCode;
import com.backend.api.global.exception.BaseExceptionHandler;
import com.backend.api.global.security.userdetails.CustomUserDetails;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.JsonProcessingException;

import io.swagger.v3.oas.annotations.Operation;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/multi")
@RequiredArgsConstructor
public class MultiGameController {

    private final MultiGameService multiGameService;
    private final MemberRepository memberRepository;
    private final MultiGameSocketService multiGameSocketService;

    @GetMapping("")
    @Operation(summary = "멀티게임 대기실 불러오기", description = "멀티게임 모드를 선택하면 현재 생성되어있는 방 리스트를 불러옵니다.", tags = { "멀티게임" })
    public ResponseEntity<BaseResponse<MultiGameRoomsResponseDto>> getMultiGameRooms(@RequestParam int pageNumber){
        return BaseResponse.success(SuccessCode.SELECT_SUCCESS, multiGameService.getMultiGameRooms(pageNumber));
    }

    @GetMapping("/{roomId}")
    @Operation(summary = "멀티게임 입장하기", description = "특정 멀티게임방 입장을 요청하면 해당 방으로 들어갑니다.", tags = {"멀티게임"})
    public ResponseEntity<BaseResponse<MultiGameRoomEnterResponseDto>> enterMultiGameRoom(@AuthenticationPrincipal CustomUserDetails userDetails, @PathVariable Long roomId) throws
        JsonProcessingException {
        Member member = memberRepository.findById(userDetails.getId()).orElseThrow(
            () -> new BaseExceptionHandler(ErrorCode.NOT_FOUND_USER)
        );
        MultiGameRoomEnterResponseDto dto = new MultiGameRoomEnterResponseDto(userDetails.getId(), member.getNickname());
       multiGameSocketService.enterMultiWaitingRoom(userDetails, roomId, userDetails.getNickname());
        return BaseResponse.success(SuccessCode.SELECT_SUCCESS, dto);
    }

    @PostMapping("/create-room")
    @Operation(summary = "멀티게임 만들기", description = "멀티게임 방을 만듭니다.", tags = {"멀티게임"})
    public ResponseEntity<BaseResponse<MultiGameRoomCreateResponseDto>> createMultiGameRoom(@AuthenticationPrincipal CustomUserDetails userDetails, @RequestBody MultiGameRoomCreateRequestDto dto) throws
        JsonProcessingException {

        return BaseResponse.success(SuccessCode.SELECT_SUCCESS, multiGameService.createMultiGameRoom(userDetails.getId(), dto));
    }

    @PostMapping("/start-game")
    @Operation(summary = "멀티게임 시작하기 처음시작.", description = "멀티게임을 시작합니다.", tags = {"멀티게임"})
    public ResponseEntity<BaseResponse<MultiGameStartResponseDto>> startMultiGame(@AuthenticationPrincipal CustomUserDetails userDetails, @RequestBody MultiGameStartRequestDto dto) {

        return BaseResponse.success(SuccessCode.SELECT_SUCCESS, multiGameService.startMultiGame(userDetails.getId(), dto));
    }

    @PostMapping("/sell")
    @Operation(summary = "멀티 - 매도", description = "멀티게임 내에서 매도 하면 해당 종목을 팝니다.", tags = {"멀티게임"})
    public ResponseEntity<BaseResponse<MultiTradeResponseDto>> sellStock(@RequestBody MultiTradeRequestDto dto, @AuthenticationPrincipal CustomUserDetails userDetails) {
        return BaseResponse.success(SuccessCode.SELL_SUCCESS, multiGameService.sell(dto, userDetails.getId()));
    }

    @PostMapping("/buy")
    @Operation(summary = "멀티 - 매수", description = "멀티게임 내에서 매수 하면 해당 종목을 삽니다.", tags = {"멀티게임"})
    public ResponseEntity<BaseResponse<MultiTradeResponseDto>> buyStock(@RequestBody MultiTradeRequestDto dto, @AuthenticationPrincipal CustomUserDetails userDetails) {
        return BaseResponse.success(SuccessCode.BUY_SUCCESS, multiGameService.buy(dto, userDetails.getId()));
    }


    @PostMapping("/short-selling")
    @Operation(summary = "멀티 - 공매도", description = "멀티게임 내에서 공매도 하면 해당 종목을 갖고 있다고 표현합니다.", tags = {"멀티게임"})
    public ResponseEntity<BaseResponse<MultiTradeResponseDto>> shortStock(@RequestBody MultiTradeRequestDto dto, @AuthenticationPrincipal CustomUserDetails userDetails) {
        return BaseResponse.success(SuccessCode.BUY_SUCCESS, multiGameService.shortSelling(dto, userDetails.getId()));
    }
    @PostMapping("/close-short")
    @Operation(summary = "멀티 - 공매도 청산", description = "멀티게임 내에서 공매도 물량을 청산하면 해당 종목을 청산합니다.", tags = {"멀티게임"})
    public ResponseEntity<BaseResponse<MultiTradeResponseDto>> closeShortPosition(@RequestBody MultiTradeRequestDto dto, @AuthenticationPrincipal CustomUserDetails userDetails) {
        return BaseResponse.success(SuccessCode.BUY_SUCCESS, multiGameService.closeShortPosition(dto, userDetails.getId()));
    }


    @PostMapping("/tomorrow")
    @Operation(summary = "멀티 - 하루 경과", description = "멀티게임 내에서 하루가 지나면 경과를 보여줍니다.", tags = {"멀티게임"})
    public ResponseEntity<BaseResponse<MultiNextDayResponseDto>> getTomorrow(@RequestBody MultiNextDayRequestDto dto, @AuthenticationPrincipal CustomUserDetails userDetails) {
        return BaseResponse.success(SuccessCode.CHECK_SUCCESS, multiGameService.getTomorrow(dto, userDetails.getId()));
    }

    @GetMapping("/final-result")
    @Operation(summary = "멀티 - 최종 결과", description = "멀티게임이 끝나면 모든 결과를 보내줍니다.", tags = {"멀티게임"})
    public ResponseEntity<BaseResponse<MultiGameFinalResultDto>> getFinalResult(@RequestBody MultiGameResultRequestDto dto, @AuthenticationPrincipal CustomUserDetails userDetails) {
        return BaseResponse.success(SuccessCode.CHECK_SUCCESS, multiGameService.getFinalResult(dto));
    }

    @GetMapping("/round-result")
    @Operation(summary = "멀티 - 라운드 결과", description = "멀티게임 특정 라운드가 끝나면 결과를 보내줍니다.", tags = {"멀티게임"})
    public ResponseEntity<BaseResponse<List<MultiGameResultDto>>> getSubResult(@RequestBody MultiGameSubResultRequestDto dto, @AuthenticationPrincipal CustomUserDetails userDetails) {
        return BaseResponse.success(SuccessCode.CHECK_SUCCESS, multiGameService.getSubResult(dto));
    }

    @GetMapping("/log")
    @Operation(summary = "멀티게임 복기", description = "멀티기록을 선택하면 해당 싱글게임기록을 가져옵니다.", tags = {"멀티게임"})
    public ResponseEntity<BaseResponse<MultiLogResponseDto>> getMultiGameLog(@RequestParam(name = "multiGameLogId") Long multiGameLogId, @AuthenticationPrincipal CustomUserDetails userDetails) {
        MultiLogResponseDto responseDto = multiGameService.getMultiGameLog(multiGameLogId, userDetails.getId());
        return BaseResponse.success(SuccessCode.SELECT_SUCCESS, responseDto);
    }
}
