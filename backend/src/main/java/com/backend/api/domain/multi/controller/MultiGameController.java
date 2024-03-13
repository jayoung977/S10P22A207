package com.backend.api.domain.multi.controller;

import com.backend.api.domain.multi.service.MultiGameService;
import com.backend.api.global.common.BaseResponse;
import com.backend.api.global.common.code.SuccessCode;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/multi")
@RequiredArgsConstructor
public class MultiGameController {

    private final MultiGameService multiGameService;

    @GetMapping
    @Operation(summary = "멀티게임 불러오기", description = "멀티게임 모드를 선택하면 현재 생성되어있는 방을 가져옵니다.", tags = { "멀티게임" })
    public ResponseEntity<BaseResponse<String>> getMultiGameRooms(){
        //TODO: 웹소켓에서 가져오기
        return BaseResponse.success(SuccessCode.SELECT_SUCCESS,"보냈어용");
    }
}
