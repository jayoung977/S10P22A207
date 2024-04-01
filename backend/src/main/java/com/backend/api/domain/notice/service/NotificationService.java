package com.backend.api.domain.notice.service;

import com.backend.api.domain.member.entity.Member;
import com.backend.api.domain.member.repository.MemberRepository;
import com.backend.api.domain.notice.dto.NotificationRequestDto;
import com.backend.api.domain.notice.dto.NotificationResponseDto;
import com.backend.api.domain.notice.entity.Notice;
import com.backend.api.domain.notice.repository.NotificationRepository;
import com.backend.api.domain.notice.type.AlarmType;
import com.backend.api.global.common.code.ErrorCode;
import com.backend.api.global.exception.BaseExceptionHandler;

import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@RequiredArgsConstructor
@Service
public class NotificationService {

    private final NotificationRepository notificationRepository;
    private final MemberRepository memberRepository;
    public List<NotificationResponseDto> getNotificationList(Long memberId) {
        return notificationRepository.findByMember_Id(memberId)
            .stream().map(NotificationResponseDto::to)
            .toList();
    }

    @Transactional
    public void createNotification(Notice notice) {
        log.info("알림 Type : {}", notice.getAlarmType());
        log.info("알림을 저장합니다.");
        notificationRepository.save(notice);
    }
}
