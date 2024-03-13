package com.backend.api.domain.fund.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.backend.api.domain.fund.entity.FundMember;

public interface FundMemberRepository extends JpaRepository<FundMember, Long> {
	List<FundMember> findAllByMember_Id(Long loginUserId);
	Boolean existsByFund_IdAndMember_Id(Long fundId, Long memberId);
}
