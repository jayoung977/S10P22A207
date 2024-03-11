package com.backend.api.domain.friend.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.backend.api.domain.friend.entity.FriendAsk;

public interface FriendAskRepository extends JpaRepository<FriendAsk, Long> {

	/* 친구 요청 거절, 취소 */
	void deleteFriendAskBySender_IdAndReceiver_Id(Long senderId, Long receiverId);
	boolean existsBySender_IdAndReceiver_Id(Long senderId, Long receiverId);

	List<FriendAsk> findByReceiver_Id(Long receiverId); // 친구 요청 받은 리스트
	List<FriendAsk> findBySender_Id(Long senderId); // 친구 요청 보낸 리스트

}
