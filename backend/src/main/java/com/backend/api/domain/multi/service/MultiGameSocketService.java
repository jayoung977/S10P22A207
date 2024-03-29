package com.backend.api.domain.multi.service;

import com.backend.api.domain.member.entity.Member;
import com.backend.api.domain.member.repository.MemberRepository;
import com.backend.api.domain.multi.entity.MultiWaitingRoom;
import com.backend.api.global.common.SocketBaseDtoRes;
import com.backend.api.global.common.code.ErrorCode;
import com.backend.api.global.common.type.SocketType;
import com.backend.api.global.exception.BaseExceptionHandler;
import com.backend.api.global.security.userdetails.CustomUserDetails;
import com.backend.api.global.websocket.dto.request.FriendInviteReq;
import com.backend.api.global.websocket.dto.request.WebSocketMessageReq;
import com.backend.api.global.websocket.dto.response.FriendInviteRes;
import com.backend.api.global.websocket.dto.response.MultiGameReadyRes;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Log4j2
@Transactional
@RequiredArgsConstructor
public class MultiGameSocketService {
	private final MemberRepository memberRepository;
	private final RedisTemplate<String, Object> redisTemplate;
	private final SimpMessageSendingOperations template;
	private final ObjectMapper objectMapper;

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

	public MultiWaitingRoom getMultiWaitingRoom(Long roomId) throws JsonProcessingException {
		log.info("멀티대기방을 가져옵니다 getMultiWaitingRoom");
		String pattern = "multiGame:" + roomId; // 채팅방의 key multiGame:roomId
		log.info("pattern: {}", pattern);
		String jsonStr = objectMapper.writeValueAsString(redisTemplate.opsForValue().get(pattern)); // 채팅방의 정보를 가져옴
		log.info("jsonStr: {}", jsonStr);
		MultiWaitingRoom multiWaitingRoom = objectMapper.readValue(jsonStr, MultiWaitingRoom.class); // 채팅방의 정보를 객체로 변환
		return multiWaitingRoom;
	}

	public void sendMessageToMultiWaitingRoom(Long roomId, SocketBaseDtoRes<?> socketBaseDtoRes) throws JsonProcessingException {
		MultiWaitingRoom multiWaitingRoom = getMultiWaitingRoom(roomId);
		for(Long memberId : multiWaitingRoom.getParticipantIds()) { // 채팅방에 있는 모든 유저에게 메시지 전송
			log.info("메시지 전송 대상: {}", memberId);
			template.convertAndSend("/api/sub/" + memberId, socketBaseDtoRes);
			log.info("socketBaseDtoRes : {}", socketBaseDtoRes);
		}
		log.info("메시지 전송 완료");
	}

	public void enterMultiWaitingRoom(CustomUserDetails userDetails, Long roomId, String nickName) throws JsonProcessingException {
		log.info("멀티게임 대기방 입장 {} 님이 {} 방에 입장합니다.", userDetails.getId(), roomId);
		// 웹소켓에 연결시키는 과정
		checkStatus(userDetails); // 내가 방에 입장해 있는지 확인
		MultiWaitingRoom multiWaitingRoom = getMultiWaitingRoom(roomId);
		multiWaitingRoom.getParticipantIds().add(userDetails.getId());	// 참가자 목록에 추가
		multiWaitingRoom.getReadyState().put(userDetails.getId(), false); // 레디 상태 false로 초기화
		redisTemplate.opsForValue().set("multiGame:" + roomId, multiWaitingRoom);
		// 입장 메시지 전송
		sendMessageToMultiWaitingRoom(roomId, new SocketBaseDtoRes<>(SocketType.MESSAGE, new WebSocketMessageReq(roomId, nickName, nickName+"님이 입장했습니다.")));
		redisTemplate.opsForValue().set(userDetails.getEmail(), roomId); // 내가 방에 입장했다는 정보 저장
	}

	public boolean readyMultiRoom(Long memberId, Long roomId) throws JsonProcessingException {
		MultiWaitingRoom multiWaitingRoom = getMultiWaitingRoom(roomId);
		Boolean readyState = multiWaitingRoom.getReadyState().get(memberId);
		log.info("멤버 {} 레디 상태 변경 전: {}", memberId, readyState);
		multiWaitingRoom.getReadyState().put(memberId, !readyState);
		redisTemplate.opsForValue().set("multiGame:" + roomId, multiWaitingRoom);
		log.info("멤버 {} 레디 상태 변경 후: {}", memberId, !readyState);
		MultiGameReadyRes multiGameReadyRes = new MultiGameReadyRes(
			roomId,
			!readyState,
			memberId
		);
		sendMessageToMultiWaitingRoom(roomId, new SocketBaseDtoRes<>(SocketType.READY, multiGameReadyRes));
		return !readyState;
	}

	public void exitMultiRoom(CustomUserDetails userDetails, Long roomId) throws JsonProcessingException {
		log.info("멀티게임 대기방 퇴장 {} 님이 {} 방을 나갑니다.", userDetails.getId(), roomId);
		MultiWaitingRoom multiWaitingRoom = getMultiWaitingRoom(roomId);
		log.info("멀티게임 대기방의 참가자에서 제거합니다");
		multiWaitingRoom.getParticipantIds().remove(userDetails.getId());
		log.info("멀티게임 대기방의 레디 상태에서 제거합니다");
		multiWaitingRoom.getReadyState().remove(userDetails.getId());
		redisTemplate.opsForValue().set("multiGame:" + roomId, multiWaitingRoom);
		log.info("멀티게임 대기방 입장상태를 제거합니다");
		redisTemplate.opsForValue().getAndDelete(userDetails.getEmail());
		sendMessageToMultiWaitingRoom(roomId, new SocketBaseDtoRes<>(SocketType.MESSAGE, new WebSocketMessageReq(roomId, "시스템", "방을 나가셨습니다.")));
		if(multiWaitingRoom.getParticipantIds().isEmpty()) {
			log.info("멀티게임 대기방이 비어있어 삭제합니다");
			redisTemplate.delete("multiGame:" + roomId);
		}
	}
	/* 내가 입장한 방이 있다면 멀티게임 대기방에서 나가기 */
	public void checkStatus(CustomUserDetails userDetails) throws JsonProcessingException {
		if(redisTemplate.hasKey(userDetails.getEmail())) { // 내가 방에 입장해 있는지 확인
			Object existingRoodId = redisTemplate.opsForValue().get(userDetails.getEmail()); // 어떤 방에 있는지 가져옴
			exitMultiRoom(userDetails, Long.valueOf((Integer)existingRoodId)); // 방 나가기
		}
	}
}
