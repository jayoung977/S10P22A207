package com.backend.api.domain.multi.controller;

import com.backend.api.domain.multi.dto.MultiGameRoomsResponseDto;
import com.backend.api.domain.multi.service.MultiGameService;
import com.backend.api.global.common.BaseResponse;
import com.backend.api.global.common.code.SuccessCode;
import com.backend.api.global.security.userdetails.CustomUserDetails;
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

    @GetMapping("")
    @Operation(summary = "멀티게임 대기실 불러오기", description = "멀티게임 모드를 선택하면 현재 생성되어있는 방 리스트를 불러옵니다.", tags = { "멀티게임" })
    public ResponseEntity<BaseResponse<List<MultiGameRoomsResponseDto>>> getMultiGameRooms(@RequestParam int pageNumber, @RequestParam int pageSize){
        return BaseResponse.success(SuccessCode.SELECT_SUCCESS,multiGameService.getMultiGameRooms(pageNumber, pageSize));
    }
    @GetMapping("/{roomId}")
    @Operation(summary = "멀티게임 입장하기", description = "특정 멀티게임방 입장을 요청하면 해당 방으로 들어갑니다.", tags = { "멀티게임" })
    public ResponseEntity<BaseResponse<String>> enterMultiGameRoom(@AuthenticationPrincipal CustomUserDetails userDetails, @PathVariable String roomId){
        multiGameService.enterMultiGameRoom(userDetails.getId(), roomId);
        return BaseResponse.success(SuccessCode.SELECT_SUCCESS,"보냈어용");
    }

    @GetMapping("/create-room")
    @Operation(summary = "멀티게임 만들기", description = "멀티게임 방을 만듭니다.", tags = { "멀티게임" })
    public ResponseEntity<BaseResponse<MultiGameRoomCreateResponseDto>> createMultiGameRoom(@AuthenticationPrincipal CustomUserDetails userDetails){
        MultiGameRoomCreateResponseDto multiGameRoom = multiGameService.createMultiGameRoom(userDetails.getId());
        return BaseResponse.success(SuccessCode.SELECT_SUCCESS,"보냈어용");
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


    @PostMapping("/tomorrow")
    @Operation(summary = "멀티 - 하루 경과", description = "멀티게임 내에서 하루가 지나면 경과를 보여줍니다.", tags = {"멀티게임"})
    public ResponseEntity<BaseResponse<MultiDayResponseDto>> getTomorrow(@RequestBody MultiNextDayRequestDto dto, @AuthenticationPrincipal CustomUserDetails userDetails) {

        return BaseResponse.success(SuccessCode.CHECK_SUCCESS, multiGameService.getTomorrow(dto, userDetails.getId()));
    }
}
