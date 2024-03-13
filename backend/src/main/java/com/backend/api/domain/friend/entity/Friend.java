package com.backend.api.domain.friend.entity;

import static jakarta.persistence.GenerationType.IDENTITY;
import static lombok.AccessLevel.PROTECTED;

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

@Getter
@Entity
@NoArgsConstructor(access = PROTECTED)
@Table(name = "friend")
public class Friend extends BaseEntity {
	@Id
	@GeneratedValue(strategy = IDENTITY)
	@Column(name = "friend_id")
	private Long id;

	@ManyToOne
	@JoinColumn(name = "follower", referencedColumnName = "member_id")
	private Member follower;
	@ManyToOne
	@JoinColumn(name = "following", referencedColumnName = "member_id")
	private Member following;

	@Builder
	public Friend(Member follower, Member following) {
		this.follower = follower;
		this.following = following;
	}

}
