package com.backend.api.domain.fund.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.backend.api.domain.fund.dto.request.FundCreateReq;
import com.backend.api.domain.fund.dto.request.FundStartReq;
import com.backend.api.domain.fund.dto.response.FundDetailRes;
import com.backend.api.domain.fund.dto.response.FundMemberRes;
import com.backend.api.domain.fund.dto.response.FundRes;
import com.backend.api.domain.fund.dto.response.FundStockRes;
import com.backend.api.domain.fund.dto.response.FundTradeRes;
import com.backend.api.domain.fund.entity.Fund;
import com.backend.api.domain.fund.entity.FundMember;
import com.backend.api.domain.fund.entity.type.FundStatus;
import com.backend.api.domain.fund.repository.FundMemberRepository;
import com.backend.api.domain.fund.repository.FundRepository;
import com.backend.api.domain.member.entity.Member;
import com.backend.api.domain.member.repository.MemberRepository;
import com.backend.api.global.common.code.ErrorCode;
import com.backend.api.global.common.type.FeeType;
import com.backend.api.global.exception.BaseExceptionHandler;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;

@Log4j2
@Service
@RequiredArgsConstructor
public class FundService {
	private final FundRepository fundRepository;
	private final FundMemberRepository fundMemberRepository;
	private final MemberRepository memberRepository;

	public List<FundRes> getAllFunds() {
		List<Fund> fundList = fundRepository.findAll();
		return getFundRes(fundList);
	}

	public List<FundRes> getRunningFunds() {
		List<Fund> fundList = fundRepository.findALLByStatus(FundStatus.RUNNING);
		return getFundRes(fundList);
	}

	public List<FundRes> getRecruitingFunds() {
		List<Fund> fundList = fundRepository.findALLByStatus(FundStatus.RECRUITING);
		return getFundRes(fundList);
	}

	public List<FundRes> getManagingFunds(Long managerId) {
		List<Fund> fundList = fundRepository.findAllByManager_Id(managerId);
		return getFundRes(fundList);
	}

	public FundDetailRes getFundDetail(Long fundId) {
		Fund fund = fundRepository.findById(fundId)
			.orElseThrow(() -> new IllegalArgumentException("해당 펀드가 존재하지 않습니다."));
		return new FundDetailRes(
			fund.getId(),
			fund.getFundName(),
			fund.getIndustry(),
			fund.getManager().getNickname(),
			fund.getMinimumAmount(),
			fund.getTargetAmount(),
			fund.getFundAsset(),
			fund.getFundMemberList().stream().map(fundMember -> new FundMemberRes(
				fundMember.getMember().getId(),
				fundMember.getMember().getNickname(),
				fundMember.getInvestmentAmount()
			)).toList(),
			fund.getCapacity(),
			fund.getStatus().toString(),
			fund.getFeeType().toString(),
			fund.getPeriod(),
			0.0,//TODO: 수익률 계산
			fund.getFundStockList().stream().map(fundStock -> new FundStockRes(
				fundStock.getStock().getId(),
				fundStock.getStock().getStockName(),
				fundStock.getStockAmount(),
				fundStock.getInvestmentAmount(),
				0.0//TODO: 수익률 계산
			)).toList(),
			fund.getFundTradeList().stream().map(fundTrade -> new FundTradeRes(
				fundTrade.getId(),
				fundTrade.getFund().getId(),
				fundTrade.getStock().getStockName(),
				fundTrade.getTradeAmount(),
				fundTrade.getTradePrice(),
				fundTrade.getTradeType().toString(),
				fundTrade.getTradeDate().toString(),
				0.0,//TODO: 수익률 계산
				0L//TODO: 수익금 계산
			)).toList()
		);
	}

	public List<FundRes> getInvestingFunds(Long loginUserId) {
		List<FundRes> fundResList = fundMemberRepository.findAllByMember_Id(loginUserId).stream()
			.filter(fundMember -> fundMember.getFund().getStatus() != FundStatus.CLOSED)
			.map(FundMember::getFund)
			.map(fund -> new FundRes(
				fund.getId(),
				fund.getFundName(),
				fund.getIndustry(),
				fund.getManager().getNickname(),
				fund.getMinimumAmount(),
				fund.getTargetAmount(),
				fund.getFundAsset(),
				fund.getFundMemberList().size(),
				fund.getCapacity(),
				fund.getStatus().toString(),
				fund.getFeeType().toString(),
				fund.getPeriod(),
				0.0//TODO: 수익률 계산
			))
			.toList();
		return fundResList;
	}

	public List<FundRes> getClosedInvestingFunds(Long loginUserId) {
		// fund status 가 closed 인 것만 가져오기
		List<FundRes> fundResList = fundMemberRepository.findAllByMember_Id(loginUserId).stream()
			.filter(fundMember -> fundMember.getFund().getStatus() == FundStatus.CLOSED)
			.map(FundMember::getFund)
			.map(fund -> new FundRes(
				fund.getId(),
				fund.getFundName(),
				fund.getIndustry(),
				fund.getManager().getNickname(),
				fund.getMinimumAmount(),
				fund.getTargetAmount(),
				fund.getFundAsset(),
				fund.getFundMemberList().size(),
				fund.getCapacity(),
				fund.getStatus().toString(),
				fund.getFeeType().toString(),
				fund.getPeriod(),
				0.0//TODO: 수익률 계산
			))
			.toList();
		return fundResList;
	}

	private List<FundRes> getFundRes(List<Fund> fundList) {
		List<FundRes> fundResList = fundList.stream().map(fund -> new FundRes(
			fund.getId(),
			fund.getFundName(),
			fund.getIndustry(),
			fund.getManager().getNickname(),
			fund.getMinimumAmount(),
			fund.getTargetAmount(),
			fund.getFundAsset(),
			fund.getFundMemberList().size(),
			fund.getCapacity(),
			fund.getStatus().toString(),
			fund.getFeeType().toString(),
			fund.getPeriod(),
			0.0//TODO: 수익률 계산
		)).toList();
		return fundResList;
	}

	public List<FundRes> searchFund(String fundName) {
		List<Fund> fundList = fundRepository.findAllByFundNameContaining(fundName);
		return getFundRes(fundList);
	}

	@Transactional
	public Long createFund(Long loginUserId, FundCreateReq fundCreateReq) {
		Member manager = memberRepository.findById(loginUserId)
			.orElseThrow(() -> new BaseExceptionHandler(ErrorCode.NOT_FOUND_USER));
		Fund fund = Fund.builder()
			.manager(manager)
			.fundName(fundCreateReq.fundName())
			.targetAmount(fundCreateReq.targetAmount())
			.fundAsset(0L)
			.startAsset(0L)
			.startDate(null)
			.period(fundCreateReq.period())
			.capacity(fundCreateReq.capacity())
			.minimumAmount(fundCreateReq.minimumAmount())
			.status(FundStatus.RECRUITING)
			.feeType(FeeType.valueOf(fundCreateReq.feeType()))
			.industry(fundCreateReq.industry())
			.build();
		fundRepository.save(fund);
		return fund.getId();
	}

	@Transactional
	public Long startFund(Long loginUserId, FundStartReq fundStartReq){
		Fund fund = fundRepository.findById(fundStartReq.fundId())
			.orElseThrow(() -> new BaseExceptionHandler(ErrorCode.NOT_FOUND_FUND));
		/* 예외 처리 */
		if(fund.getManager().getId() != loginUserId){
			throw new BaseExceptionHandler(ErrorCode.UNAUTHORIZED_USER_EXCEPTION);
		}
		if(fund.getStatus() != FundStatus.RECRUITING){
			throw new BaseExceptionHandler(ErrorCode.NOT_RECRUITING_FUND);
		}
		if(fund.getFundAsset() < fund.getTargetAmount()){
			throw new BaseExceptionHandler(ErrorCode.NOT_ENOUGH_ASSET);
		}
		fund.updateFundStatus(FundStatus.RUNNING);
		fund.updateFundStart();
		fundRepository.save(fund);
		return fund.getId();
	}

}
