package com.backend.api.domain.fund.entity;

import static jakarta.persistence.FetchType.*;
import static jakarta.persistence.GenerationType.*;
import static lombok.AccessLevel.*;

import com.backend.api.domain.member.entity.Member;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor(access = PROTECTED)
@Table(name = "fund_member")
public class FundMember {
	@Id
	@GeneratedValue(strategy = IDENTITY)
	@Column(name = "fund_member_id")
	private Long id;

	@ManyToOne(fetch = LAZY)
	@JoinColumn(name = "member_id", referencedColumnName = "member_id")
	private Member member;

	@ManyToOne(fetch = LAZY)
	@JoinColumn(name = "fund_id", referencedColumnName = "fund_id")
	private Fund fund;

	@NotNull
	private Long investmentAmount;

	@Builder
	public FundMember(Member member, Fund fund, Long investmentAmount) {
		this.member = member;
		this.fund = fund;
		this.investmentAmount = investmentAmount;
	}
}
