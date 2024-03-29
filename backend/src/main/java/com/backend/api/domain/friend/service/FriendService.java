package com.backend.api.domain.friend.service;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.backend.api.domain.friend.dto.response.FriendCursorRes;
import com.backend.api.domain.friend.dto.response.FriendRes;
import com.backend.api.domain.friend.entity.Friend;
import com.backend.api.domain.friend.repository.FriendRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;

@Log4j2
@Service
@RequiredArgsConstructor
public class FriendService {
	private final FriendRepository friendRepository;
	private final int PAGE_SIZE = 10;

	public List<FriendRes> getAllFriends(Long followerId) {
		List<Friend> friendList = friendRepository.findByFollower_Id(followerId);
		return friendList.stream()
			.map(friend ->
				new FriendRes(
					friend.getFollowing().getId(),
					friend.getFollowing().getNickname(),
					friend.getFollowing().getAsset())
			)
			.toList();
	}

	public FriendCursorRes getFriendsWithCursor(Long followerId, Long cursor) {
		Pageable pageable = PageRequest.of(0, PAGE_SIZE);
		Page<Friend> friendList = friendRepository.findByFollower_IdAndIdLessThanOrderByIdDesc(followerId, cursor, pageable);
		List<FriendRes> friendResList = friendList.stream()
			.map(friend ->
				new FriendRes(
					friend.getFollowing().getId(),
					friend.getFollowing().getNickname(),
					friend.getFollowing().getAsset())
			).toList();
		return new FriendCursorRes(friendResList,
			!friendResList.isEmpty() ? friendResList.get(friendResList.size() - 1).memberId() : cursor);
	}

	public List<FriendRes> searchFriends(Long followerId, String nickname) {
		List<Friend> friendList = friendRepository.findByFollower_IdAndFollowing_NicknameContaining(followerId, nickname);
		return friendList.stream()
			.map(friend ->
				new FriendRes(
					friend.getFollowing().getId(),
					friend.getFollowing().getNickname(),
					friend.getFollowing().getAsset())
			)
			.toList();
	}

	@Transactional
	public void deleteFriend(Long followerId, Long followingId) {
		friendRepository.deleteFriendByFollower_IdAndFollowing_IdOrFollower_IdAndFollowing_Id(followerId, followingId, followingId, followerId);
	}
}
