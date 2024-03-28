package com.backend.api.domain.notice.service;

import com.backend.api.domain.notice.dto.NotificationResponseDto;
import com.backend.api.domain.notice.repository.NotificationRepository;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Slf4j
@RequiredArgsConstructor
@Service
public class NotificationService {

    private final NotificationRepository notificationRepository;
    public List<NotificationResponseDto> getNotificationList(Long memberId) {
        return notificationRepository.findByMember_Id(memberId)
            .stream().map(NotificationResponseDto::to)
            .toList();
    }
}
