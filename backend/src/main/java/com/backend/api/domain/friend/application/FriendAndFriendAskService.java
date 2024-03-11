package com.backend.api.domain.friend.application;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.backend.api.domain.friend.dao.FriendAskRepository;
import com.backend.api.domain.friend.dao.FriendRepository;
import com.backend.api.domain.friend.entity.Friend;
import com.backend.api.domain.member.dao.MemberRepository;
import com.backend.api.domain.member.entity.Member;
import com.backend.api.global.common.code.ErrorCode;
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
	}
}
