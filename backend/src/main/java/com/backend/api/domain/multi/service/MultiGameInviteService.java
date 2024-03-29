package com.backend.api.domain.multi.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.backend.api.domain.member.entity.Member;
import com.backend.api.domain.member.repository.MemberRepository;
import com.backend.api.global.common.code.ErrorCode;
import com.backend.api.global.exception.BaseExceptionHandler;
import com.backend.api.global.websocket.dto.request.FriendInviteReq;
import com.backend.api.global.websocket.dto.response.FriendInviteRes;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;

@Service
@Log4j2
@Transactional
@RequiredArgsConstructor
public class MultiGameInviteService {
	private final MemberRepository memberRepository;

	public FriendInviteRes inviteFriend(FriendInviteReq friendInviteReq, Long loginMemberId){
		Member loginMember = memberRepository.findById(loginMemberId).orElseThrow(
			() -> new BaseExceptionHandler(ErrorCode.NOT_FOUND_USER)
		);
		Member inviteMember = memberRepository.findById(friendInviteReq.receiver()).orElseThrow(
			() -> new BaseExceptionHandler(ErrorCode.NOT_FOUND_USER)
		);

		FriendInviteRes friendInviteRes = new FriendInviteRes(
			friendInviteReq.roomId(),
			loginMember.getNickname(),
			inviteMember.getId()
		);
		log.info("{} 님이 {} 님을 초대했습니다.", loginMember.getNickname(), inviteMember.getNickname());
		return friendInviteRes;
	}
}
