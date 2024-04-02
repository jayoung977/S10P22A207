package com.backend.api.domain.notice.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.backend.api.domain.member.repository.MemberRepository;
import com.backend.api.domain.notice.dto.NotificationResponseDto;
import com.backend.api.domain.notice.entity.Notice;
import com.backend.api.domain.notice.repository.NotificationRepository;
import com.backend.api.global.common.code.ErrorCode;
import com.backend.api.global.exception.BaseExceptionHandler;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequiredArgsConstructor
@Service
public class NotificationService {

	private final NotificationRepository notificationRepository;
	private final MemberRepository memberRepository;

	@Transactional
	public List<NotificationResponseDto> getNotificationList(Long memberId) {
		List<Notice> noticeList = notificationRepository.findByMember_IdOrderByIdDesc(memberId);
		// 알림을 읽음으로 변경
		noticeList.forEach(notice -> {
			notice.setRead(true);
		});
		return notificationRepository.findByMember_IdOrderByIdDesc(memberId)
			.stream().map(NotificationResponseDto::to)
			.toList();
	}

	public Long getUnreadNotificationCount(Long memberId) {
		log.info("안읽은 알림 개수 조회");
		return notificationRepository.countByMember_IdAndIsReadFalse(memberId);
	}

	@Transactional
	public void createNotification(Notice notice) {
		log.info("알림 Type : {}", notice.getAlarmType());
		log.info("알림을 저장합니다.");
		notificationRepository.save(notice);
		log.info("알림 저장 완료");
	}

	@Transactional
	public void deleteNotification(Long noticeId, Long loginUserId) {
		Notice notice = notificationRepository.findById(noticeId).orElseThrow(
			() -> new BaseExceptionHandler(ErrorCode.NOT_FOUND_ERROR)
		);
		if (!notice.getMember().getId().equals(loginUserId)) {
			throw new BaseExceptionHandler(ErrorCode.FORBIDDEN_ERROR);
		}
		notificationRepository.delete(notice);
	}
}
