package com.backend.api.domain.member.entity;

import com.backend.api.domain.BaseEntity;
import com.backend.api.domain.community.entity.Community;
import com.backend.api.domain.friend.entity.Friend;
import com.backend.api.domain.member.entity.type.GenderType;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

import static jakarta.persistence.GenerationType.IDENTITY;
import static lombok.AccessLevel.PROTECTED;

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
	@Column(length = 100)
	private String email;

	@NotNull
	@Column(length = 100)
	private String nickname;

	private Short birthYear; //null값 사용하므로 Wrapper Class 사용

	@Enumerated(EnumType.STRING)
	private GenderType gender;

	@NotNull
	private Long asset = 10000000L;
	
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

	@OneToMany(mappedBy = "following")
	private List<Friend> followings = new ArrayList<>();

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


	@Builder
	public Member(Long id, String email, String nickname, Short birthYear, GenderType gender, Long asset, Integer rankPoint, Integer win, Integer lose, Double singleAvgRoi, Double multiAvgRoi, List<Notice> notices, List<Friend> followers, List<Friend> followings, List<FriendAsk> receivers, List<FriendAsk> senders, List<Fund> funds, List<FundMember> fundMembers, List<Community> communities, List<MultiGameLog> multiGameLogs, List<SingleGameLog> singleGameLogs) {
		this.id = id;
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
		this.followings = followings;
		this.receivers = receivers;
		this.senders = senders;
		this.funds = funds;
		this.fundMembers = fundMembers;
		this.communities = communities;
		this.multiGameLogs = multiGameLogs;
		this.singleGameLogs = singleGameLogs;
	}
}
