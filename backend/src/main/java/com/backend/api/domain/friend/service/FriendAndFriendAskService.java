package com.backend.api.domain.friend.service;

import java.util.List;

import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.backend.api.domain.friend.dto.response.FriendAcceptNoticeDto;
import com.backend.api.domain.friend.entity.Friend;
import com.backend.api.domain.friend.repository.FriendAskRepository;
import com.backend.api.domain.friend.repository.FriendRepository;
import com.backend.api.domain.member.entity.Member;
import com.backend.api.domain.member.repository.MemberRepository;
import com.backend.api.domain.notice.entity.Notice;
import com.backend.api.domain.notice.service.NotificationService;
import com.backend.api.domain.notice.type.AlarmType;
import com.backend.api.global.common.SocketBaseDtoRes;
import com.backend.api.global.common.code.ErrorCode;
import com.backend.api.global.common.type.SocketType;
import com.backend.api.global.exception.BaseExceptionHandler;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;

@Log4j2
@Service
@RequiredArgsConstructor
public class FriendAndFriendAskService {
	private final FriendRepository friendRepository;
	private final FriendAskRepository friendAskRepository;
	private final MemberRepository memberRepository;
	private final SimpMessageSendingOperations template;
	private final NotificationService notificationService;

	@Transactional
	public void acceptFriendAsk(Long loginUserId, String nickname) {
		Member loginUser = memberRepository.findById(loginUserId)
			.orElseThrow(() -> new BaseExceptionHandler(ErrorCode.NOT_FOUND_ERROR));
		Member sender = memberRepository.findByNickname(nickname)
			.orElseThrow(() -> new BaseExceptionHandler(ErrorCode.NOT_FOUND_ERROR));
		if (!friendAskRepository.existsBySender_IdAndReceiver_Id(sender.getId(), loginUserId)) {
			throw new BaseExceptionHandler(ErrorCode.NOT_FOUND_ERROR);
		}
		Friend friend1 = Friend.builder()
			.follower(loginUser)
			.following(sender)
			.build();
		Friend friend2 = Friend.builder()
			.follower(sender)
			.following(loginUser)
			.build();
		if (friendRepository.existsByFollowerAndFollowing(loginUser, sender) ||
			friendRepository.existsByFollowerAndFollowing(sender, loginUser)) {
			throw new BaseExceptionHandler(ErrorCode.ALREADY_EXIST_FRIEND);
		}
		friendRepository.saveAll(List.of(friend1, friend2));
		friendAskRepository.deleteFriendAskBySender_IdAndReceiver_Id(loginUserId, sender.getId());
		friendAskRepository.deleteFriendAskBySender_IdAndReceiver_Id(sender.getId(), loginUserId);
		// 알림 생성
		log.info("친구 요청 수락 - 소켓 전송");
		FriendAcceptNoticeDto friendAskNoticeDto = new FriendAcceptNoticeDto(
			loginUser.getId(),
			loginUser.getNickname()
		);
		template.convertAndSend("/api/sub" + sender.getId(),  new SocketBaseDtoRes<>(SocketType.FRIENDACCEPT, friendAskNoticeDto));
		log.info("친구 요청 수락 - 알림 생성");
		Notice notice = Notice.builder()
			.member(sender)
			.sender(loginUser.getNickname())
			.content("친구 요청이 수락되었습니다.")
			.isRead(false)
			.alarmType(AlarmType.FRIENDACCEPT)
			.build();
		notificationService.createNotification(notice);
	}
}
