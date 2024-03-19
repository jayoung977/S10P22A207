package com.backend.api.domain.fund.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.backend.api.domain.fund.dto.request.FundRegisterReq;
import com.backend.api.domain.fund.entity.Fund;
import com.backend.api.domain.fund.entity.FundMember;
import com.backend.api.domain.fund.entity.type.FundStatus;
import com.backend.api.domain.fund.repository.FundMemberRepository;
import com.backend.api.domain.fund.repository.FundRepository;
import com.backend.api.domain.member.entity.Member;
import com.backend.api.domain.member.repository.MemberRepository;
import com.backend.api.global.common.code.ErrorCode;
import com.backend.api.global.exception.BaseExceptionHandler;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;

@Log4j2
@Service
@RequiredArgsConstructor
public class FundAndFundMemberService {
	private final FundRepository fundRepository;
	private final FundMemberRepository fundMemberRepository;
	private final MemberRepository memberRepository;

	@Transactional
	public Long registerFund(Long loginUserId, FundRegisterReq fundRegisterReq) {
		Fund fund = fundRepository.findById(fundRegisterReq.fundId())
			.orElseThrow(() -> new BaseExceptionHandler(ErrorCode.NOT_FOUND_FUND));
		Member member = memberRepository.findById(loginUserId)
			.orElseThrow(() -> new BaseExceptionHandler(ErrorCode.NOT_FOUND_USER));
		//예외 처리
		if(member.getAsset() < fundRegisterReq.investmentAmount()) {
			throw new BaseExceptionHandler(ErrorCode.NOT_ENOUGH_ASSET);
		}
		if (fundRegisterReq.investmentAmount() < fund.getMinimumAmount()) {
			throw new BaseExceptionHandler(ErrorCode.MINIMUM_AMOUNT_EXCEPTION);
		}
		if (fund.getStatus() != FundStatus.RECRUITING) {
			throw new BaseExceptionHandler(ErrorCode.NOT_RECRUITING_FUND);
		}
		if (fund.getFundMemberList().size() >= fund.getCapacity()) {
			throw new BaseExceptionHandler(ErrorCode.FULL_CAPACITY_EXCEPTION);
		}
		if (fundMemberRepository.existsByFund_IdAndMember_Id(fundRegisterReq.fundId(), loginUserId)) {
			throw new BaseExceptionHandler(ErrorCode.ALREADY_REGISTERED_FUND);
		}
		log.info("펀드 가입 요청: {}", fundRegisterReq.toString());
		FundMember fundMember = FundMember.builder()
			.fund(fund)
			.member(member)
			.investmentAmount(fundRegisterReq.investmentAmount())
			.build();
		fundMemberRepository.save(fundMember);
		fund.updateFundAsset(fundRegisterReq.investmentAmount());
		fundRepository.save(fund);
		member.addAsset(-fundRegisterReq.investmentAmount());
		memberRepository.save(member);
		return fund.getId();
	}
}
