package com.backend.api.domain.friend.application;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.backend.api.domain.friend.dao.FriendAskRepository;
import com.backend.api.domain.friend.dto.response.FriendRes;
import com.backend.api.domain.friend.entity.FriendAsk;
import com.backend.api.domain.member.entity.Member;
import com.backend.api.domain.member.repository.MemberRepository;
import com.backend.api.global.common.code.ErrorCode;
import com.backend.api.global.exception.BaseExceptionHandler;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;

@Log4j2
@Service
@RequiredArgsConstructor
public class FriendAskService {
	private final FriendAskRepository friendAskRepository;
	private final MemberRepository memberRepository;

	public List<FriendRes> getSendFriendAskList(Long followerId) {
		List<FriendAsk> friendAskList = friendAskRepository.findBySender_Id(followerId);
		return friendAskList.stream()
			.map(friendAsk ->
				new FriendRes(
					friendAsk.getReceiver().getId(),
					friendAsk.getReceiver().getNickname(),
					friendAsk.getReceiver().getAsset())
			)
			.toList();
	}

	public List<FriendRes> getReceiveFriendAskList(Long followerId) {
		List<FriendAsk> friendAskList = friendAskRepository.findByReceiver_Id(followerId);
		return friendAskList.stream()
			.map(friendAsk ->
				new FriendRes(
					friendAsk.getSender().getId(),
					friendAsk.getSender().getNickname(),
					friendAsk.getSender().getAsset())
			)
			.toList();
	}

	@Transactional
	public void createFriendAsk(Long senderId, String receiverNickname) {
		Member sender = memberRepository.findById(senderId)
			.orElseThrow(() -> new BaseExceptionHandler(ErrorCode.NOT_FOUND_ERROR));
		Member receiver = memberRepository.findByNickname(receiverNickname)
			.orElseThrow(() -> new BaseExceptionHandler(ErrorCode.NOT_FOUND_ERROR));
		friendAskRepository.save(
			FriendAsk.builder()
				.sender(sender)
				.receiver(receiver)
				.build()
		);
	}

	@Transactional
	public void cancelFriendAsk(Long loginUserId, String receiverNickname) {
		Member receiver = memberRepository.findByNickname(receiverNickname)
			.orElseThrow(() -> new BaseExceptionHandler(ErrorCode.NOT_FOUND_ERROR));
		friendAskRepository.deleteFriendAskBySender_IdAndReceiver_Id(loginUserId, receiver.getId());
	}

	@Transactional
	public void rejectFriendAsk(Long loginUserId, String senderNickname) {
		Member sender = memberRepository.findByNickname(senderNickname)
			.orElseThrow(() -> new BaseExceptionHandler(ErrorCode.NOT_FOUND_ERROR));
		friendAskRepository.deleteFriendAskBySender_IdAndReceiver_Id(sender.getId(), loginUserId);
	}

}
