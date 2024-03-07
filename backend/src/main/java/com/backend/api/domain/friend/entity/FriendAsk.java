package com.backend.api.domain.friend.entity;

import static jakarta.persistence.FetchType.*;
import static jakarta.persistence.GenerationType.*;
import static lombok.AccessLevel.*;

import com.backend.api.domain.BaseEntity;
import com.backend.api.domain.member.entity.Member;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor(access = PROTECTED)
@Table(name = "friend_ask")
public class FriendAsk extends BaseEntity {
	@Id
	@GeneratedValue(strategy = IDENTITY)
	@Column(name = "friend_ask_id")
	private Long id;

	@ManyToOne(fetch = LAZY)
	@JoinColumn(name = "sender", referencedColumnName = "member_id")
	private Member sender;
	@ManyToOne(fetch = LAZY)
	@JoinColumn(name = "receiver", referencedColumnName = "member_id")
	private Member receiver;

	@Builder
	public FriendAsk(Member sender, Member receiver) {
		this.sender = sender;
		this.receiver = receiver;
	}

}
