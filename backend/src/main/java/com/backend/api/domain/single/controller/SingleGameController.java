package com.backend.api.domain.single.controller;

import com.backend.api.domain.single.dto.request.NextDayRequestDto;
import com.backend.api.domain.single.dto.request.SingleTradeRequestDto;
import com.backend.api.domain.single.dto.response.NextDayResponseDto;
import com.backend.api.domain.single.dto.response.SingleGameCreateResponseDto;
import com.backend.api.domain.single.dto.response.SingleTradeResponseDto;
import com.backend.api.domain.single.service.SingleGameService;
import com.backend.api.global.common.BaseResponse;
import com.backend.api.global.common.code.SuccessCode;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/single")
@RequiredArgsConstructor
public class SingleGameController {

    private final SingleGameService singleGameService;

    @GetMapping
    @Operation(summary = "싱글게임 불러오기", description = "싱글게임 모드를 선택하면 싱글 모드 게임을 가져옵니다.", tags = {"싱글게임"})
    public ResponseEntity<BaseResponse<SingleGameCreateResponseDto>> getSingleGame() {

        //TODO: 게임 데이터를 불러와야 한다. 300일의 데이터를 가져오고, 지금 현재 어디에 있는지 알려줘야 한다.
        SingleGameCreateResponseDto responseDto = singleGameService.createGame();
        return BaseResponse.success(SuccessCode.SELECT_SUCCESS, responseDto);
    }

    @PostMapping("/sell")
    @Operation(summary = "싱글 - 매도", description = "싱글게임 내에서 매도 하면 해당 종목을 팝니다.", tags = {"싱글게임"})
    public ResponseEntity<BaseResponse<SingleTradeResponseDto>> sellStock(@RequestBody SingleTradeRequestDto dto) {

        return BaseResponse.success(SuccessCode.SELL_SUCCESS, singleGameService.sell(dto));
    }

    @PostMapping("/buy")
    @Operation(summary = "싱글 - 매수", description = "싱글게임 내에서 매수 하면 해당 종목을 삽니다.", tags = {"싱글게임"})
    public ResponseEntity<BaseResponse<SingleTradeResponseDto>> buyStock(@RequestBody SingleTradeRequestDto dto) {
        return BaseResponse.success(SuccessCode.BUY_SUCCESS, singleGameService.buy(dto));
    }

    @GetMapping("/tomorrow")
    @Operation(summary = "싱글 - 하루 경과", description = "싱글게임 내에서 하루가 지나면 경과를 보여줍니다.", tags = {"싱글게임"})
    public ResponseEntity<BaseResponse<NextDayResponseDto>> getTomorrow(@RequestBody NextDayRequestDto dto) {

        return BaseResponse.success(SuccessCode.CHECK_SUCCESS, singleGameService.getTomorrow(dto));
    }
}

