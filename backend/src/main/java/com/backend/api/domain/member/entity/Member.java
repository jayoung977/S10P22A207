package com.backend.api.domain.member.entity;

import static jakarta.persistence.GenerationType.*;
import static lombok.AccessLevel.*;

import java.util.ArrayList;
import java.util.List;

import com.backend.api.domain.BaseEntity;
import com.backend.api.domain.community.entity.Community;
import com.backend.api.domain.friend.entity.Friend;
import com.backend.api.domain.friend.entity.FriendAsk;
import com.backend.api.domain.fund.entity.Fund;
import com.backend.api.domain.fund.entity.FundMember;
import com.backend.api.domain.member.entity.type.GenderType;
import com.backend.api.domain.multi.entity.MultiGameLog;
import com.backend.api.domain.notice.entity.Notice;
import com.backend.api.domain.single.entity.SingleGameLog;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Entity
@NoArgsConstructor(access = PROTECTED)
@Table(name = "member")
public class Member extends BaseEntity {
	@Id
	@GeneratedValue(strategy = IDENTITY)
	@Column(name = "member_id")
	private Long id;

	@NotNull
	@Column(unique = true, length = 100)
	private String email;

	@NotNull
	@Column(unique = true, length = 100)
	private String nickname;

	private Short birthYear; //null값 사용하므로 Wrapper Class 사용

	@Enumerated(EnumType.STRING)
	private GenderType gender;

	@NotNull
	private Long asset = 10_000_000L;

	@NotNull
	private Integer rankPoint = 0;

	@NotNull
	private Integer win = 0;

	@NotNull
	private Integer lose = 0;

	@NotNull
	private Double singleAvgRoi = 0D;

	@NotNull
	private Double multiAvgRoi = 0D;

	@OneToMany(mappedBy = "member")
	private List<Notice> notices = new ArrayList<>();

	@OneToMany(mappedBy = "follower")
	private List<Friend> followers = new ArrayList<>();

	@OneToMany(mappedBy = "receiver")
	private List<FriendAsk> receivers = new ArrayList<>();

	@OneToMany(mappedBy = "sender")
	private List<FriendAsk> senders = new ArrayList<>();

	@OneToMany(mappedBy = "manager")
	private List<Fund> funds = new ArrayList<>();

	@OneToMany(mappedBy = "member")
	private List<FundMember> fundMembers = new ArrayList<>();

	@OneToMany(mappedBy = "member")
	private List<Community> communities = new ArrayList<>();

	@OneToMany(mappedBy = "member")
	private List<MultiGameLog> multiGameLogs = new ArrayList<>();

	@OneToMany(mappedBy = "member")
	private List<SingleGameLog> singleGameLogs = new ArrayList<>();

	/* Fund */
	@OneToMany(mappedBy = "manager")    // 매니저로 활동하는 펀드 리스트
	private List<Fund> fundList = new ArrayList<>();

	/* Friend */
	@OneToMany(mappedBy = "follower")
	private List<Friend> friendList = new ArrayList<>();    // 내 친구 목록

	/* FriendAsk */
	@OneToMany(mappedBy = "sender")
	private List<FriendAsk> friendAskSendList = new ArrayList<>();  // 내가 친구요청 보낸 목록

	@OneToMany(mappedBy = "receiver")
	private List<FriendAsk> friendAskReceiveList = new ArrayList<>();  // 나에게 온 친구 요청

	@Builder
	public Member(String email, String nickname, Short birthYear, GenderType gender, Long asset, Integer rankPoint,
		Integer win, Integer lose, Double singleAvgRoi, Double multiAvgRoi, List<Notice> notices,
		List<Friend> followers,
		List<FriendAsk> receivers, List<FriendAsk> senders, List<Fund> funds, List<FundMember> fundMembers,
		List<Community> communities, List<MultiGameLog> multiGameLogs, List<SingleGameLog> singleGameLogs,
		List<Fund> fundList, List<Friend> friendList, List<FriendAsk> friendAskSendList,
		List<FriendAsk> friendAskReceiveList) {
		this.email = email;
		this.nickname = nickname;
		this.birthYear = birthYear;
		this.gender = gender;
		this.asset = asset;
		this.rankPoint = rankPoint;
		this.win = win;
		this.lose = lose;
		this.singleAvgRoi = singleAvgRoi;
		this.multiAvgRoi = multiAvgRoi;
		this.notices = notices;
		this.followers = followers;
		this.receivers = receivers;
		this.senders = senders;
		this.funds = funds;
		this.fundMembers = fundMembers;
		this.communities = communities;
		this.multiGameLogs = multiGameLogs;
		this.singleGameLogs = singleGameLogs;
		this.fundList = fundList;
		this.friendList = friendList;
		this.friendAskSendList = friendAskSendList;
		this.friendAskReceiveList = friendAskReceiveList;
	}
}
