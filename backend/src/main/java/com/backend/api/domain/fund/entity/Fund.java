package com.backend.api.domain.fund.entity;

import static jakarta.persistence.FetchType.*;
import static jakarta.persistence.GenerationType.*;
import static lombok.AccessLevel.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import com.backend.api.domain.BaseEntity;
import com.backend.api.domain.fund.entity.type.FundStatus;
import com.backend.api.domain.member.entity.Member;
import com.backend.api.domain.type.FeeType;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor(access = PROTECTED)
@Table(name = "fund")
public class Fund extends BaseEntity {
	@Id
	@GeneratedValue(strategy = IDENTITY)
	@Column(name = "fund_id")
	private Long id;

	@ManyToOne(fetch = LAZY)
	@JoinColumn(name = "manager_id", referencedColumnName = "member_id")
	private Member manager;

	@OneToMany(mappedBy = "fund")
	private List<FundMember> fundMemberList = new ArrayList<>();
	@OneToMany(mappedBy = "fund")
	private List<FundTrade> fundTradeList = new ArrayList<>();

	@NotNull
	private String fundName;
	@NotNull
	private Long targetAmount;
	private LocalDateTime startDate;
	@NotNull
	private Short period;
	@NotNull
	private Long capacity;
	@NotNull
	private Long minimumAmount;
	@NotNull
	@Enumerated(EnumType.STRING)
	private FundStatus status;
	@NotNull
	private FeeType feeType;
	private String industry;

	@Builder
	public Fund(Member manager, List<FundMember> fundMemberList, List<FundTrade> fundTradeList, String fundName,
		Long targetAmount, LocalDateTime startDate, Short period, Long capacity, Long minimumAmount, FundStatus status,
		FeeType feeType, String industry) {
		this.manager = manager;
		this.fundMemberList = fundMemberList;
		this.fundTradeList = fundTradeList;
		this.fundName = fundName;
		this.targetAmount = targetAmount;
		this.startDate = startDate;
		this.period = period;
		this.capacity = capacity;
		this.minimumAmount = minimumAmount;
		this.status = status;
		this.feeType = feeType;
		this.industry = industry;
	}
}
