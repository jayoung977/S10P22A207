package com.backend.api.domain.notice.controller;

import com.backend.api.domain.notice.dto.NotificationRequestDto;
import com.backend.api.domain.notice.dto.NotificationResponseDto;
import com.backend.api.domain.notice.service.NotificationService;
import com.backend.api.domain.notice.service.RedisPubService;
import com.backend.api.global.common.BaseResponse;
import com.backend.api.global.common.code.SuccessCode;
import com.backend.api.global.security.userdetails.CustomUserDetails;
import io.swagger.v3.oas.annotations.Operation;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequestMapping("/api/alarm")
@RequiredArgsConstructor
public class AlarmController {
    private final RedisPubService redisPubService;
    private final NotificationService notificationService;

    @Operation(summary = "로그인시 자동 채널 구독", description = "로그인 후 본인 채널과 공지채널을 구독합니다.", tags = {"알림"})
    @GetMapping
    public ResponseEntity<BaseResponse<String>> initialAutoSubScribe(@AuthenticationPrincipal CustomUserDetails userDetails) {
        redisPubService.subscribe("alarm:toAllUser");
        redisPubService.subscribe("alarm:member:" + userDetails.getId());
        redisPubService.setLoginStatus(userDetails.getId());

        return BaseResponse.success(SuccessCode.CREATE_SUCCESS, "자동으로 채널을 구독합니다.");
    }

//    @PreAuthorize("hasAnyRole('ADMIN')")
    @Operation(summary = "공지사항 보내기", description = "공지사항을 입력후 보내면 모든 유저에게 알림이 갑니다.", tags = {"알림"})
    @PostMapping("/notice")
    public ResponseEntity<BaseResponse<String>> noticeAlarm(@RequestBody NotificationRequestDto dto) {

        //메시지 보내기
        redisPubService.sendMessage(dto);
        return BaseResponse.success(SuccessCode.CREATE_SUCCESS, "공지사항 알림을 보냈습니다.");
    }

//    @PreAuthorize("hasAnyRole('USER')")
    @Operation(summary = "게임 초대 보내기", description = "특정 유저에게 게임 초대를 보내면 해당 유저에게 알림이 갑니다.", tags = {"알림"})
    @PostMapping("/invitation")
    public ResponseEntity<BaseResponse<String>> sendInviteGameAlarm(@RequestBody NotificationRequestDto dto) {

        redisPubService.sendMessage(dto);
        return BaseResponse.success(SuccessCode.CREATE_SUCCESS, "게임초대 알림을 보냈습니다.");
    }

    @Operation(summary = "알림 가져오기", description = "자신에게 온 알림 호출", tags = {"알림"})
    @GetMapping("/my-notification")
    public ResponseEntity<BaseResponse<List<NotificationResponseDto>>> getNotificationList(@AuthenticationPrincipal CustomUserDetails userDetails) {
        log.info("알림을 호출합니다.");
        return BaseResponse.success(SuccessCode.SELECT_SUCCESS, notificationService.getNotificationList(userDetails.getId()));
    }
}