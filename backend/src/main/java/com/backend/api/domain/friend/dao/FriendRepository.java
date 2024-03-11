package com.backend.api.domain.friend.dao;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import com.backend.api.domain.friend.entity.Friend;
import com.backend.api.domain.member.entity.Member;

public interface FriendRepository extends JpaRepository<Friend, Long> {

	/* 친구 목록 조회 */
	List<Friend> findByFollower_Id(Long followerId);
	Page<Friend> findByFollower_IdAndIdLessThanOrderByIdDesc(Long followerId, Long cursor, Pageable pageable);	// 친구 목록 전체 조회 페이징

	/* 친구 검색 */
	List<Friend> findByFollower_IdAndFollowing_NicknameContaining(Long followerId, String nickname); // 친구 검색
	Page<Friend> findByFollower_IdAndFollowing_NicknameContainingAndIdLessThanOrderByIdDesc(Long followerId, String nickname, Long cursor, Pageable pageable); // 친구 검색 페이징

	/* 친구 삭제 */
	void deleteFriendByFollower_IdAndFollowing_IdOrFollower_IdAndFollowing_Id(Long followerId1, Long followingId1, Long followingId2, Long followerId2); // 양방향 삭제

	Boolean existsByFollowerAndFollowing(Member follower, Member following);
}
