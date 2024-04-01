package com.backend.api.domain.fund.entity;

import com.backend.api.domain.BaseEntity;
import com.backend.api.domain.fund.entity.type.FundStatus;
import com.backend.api.domain.member.entity.Member;
import com.backend.api.global.common.type.FeeType;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import static jakarta.persistence.FetchType.LAZY;
import static jakarta.persistence.GenerationType.IDENTITY;
import static lombok.AccessLevel.PROTECTED;

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
	@OneToMany(mappedBy = "fund")
	private List<FundStock> fundStockList = new ArrayList<>();

	@NotNull
	private String fundName;
	@NotNull
	private Long targetAmount;
	@NotNull
	private Long fundAsset = 0L; // 전체 펀드 자산
	private Long startAsset = 0L; // 펀드 투자 시작 시 자산 펀드 시작 시 한번 갱신
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
	@Enumerated(EnumType.STRING)
	private FeeType feeType;
	private String industry;

	@Builder
	public Fund(Member manager, List<FundMember> fundMemberList, List<FundTrade> fundTradeList,
		List<FundStock> fundStockList, String fundName, Long targetAmount, Long fundAsset, Long startAsset,
		LocalDateTime startDate, Short period, Long capacity, Long minimumAmount, FundStatus status, FeeType feeType,
		String industry) {
		this.manager = manager;
		this.fundMemberList = fundMemberList;
		this.fundTradeList = fundTradeList;
		this.fundStockList = fundStockList;
		this.fundName = fundName;
		this.targetAmount = targetAmount;
		this.fundAsset = fundAsset;
		this.startAsset = startAsset;
		this.startDate = startDate;
		this.period = period;
		this.capacity = capacity;
		this.minimumAmount = minimumAmount;
		this.status = status;
		this.feeType = feeType;
		this.industry = industry;
	}

	public void updateFundStatus(FundStatus status) {
		this.status = status;
	}
	public void updateFundAsset(Long investmentAmount) {
		this.fundAsset += investmentAmount;
	}

	public void updateFundStart(){
		this.startAsset = this.fundAsset;
		this.startDate = LocalDateTime.now();
	}
	public Double calRoi(){
		if(this.startAsset == 0) return 0D;
		return 100.0 * (this.fundAsset - this.startAsset) / this.startAsset;
	}

	public void updateFinalFundAsset(long totalAsset) {
		this.fundAsset = totalAsset;
	}
}
