package com.backend.api.domain.fund.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.backend.api.domain.fund.entity.Fund;
import com.backend.api.domain.fund.entity.FundMember;
import com.backend.api.domain.fund.entity.type.FundStatus;
import com.backend.api.domain.fund.repository.FundRepository;
import com.backend.api.domain.member.entity.Member;
import com.backend.api.domain.member.repository.MemberRepository;
import com.backend.api.domain.notice.entity.Notice;
import com.backend.api.domain.notice.service.NotificationService;
import com.backend.api.domain.notice.type.AlarmType;
import com.backend.api.global.common.code.ErrorCode;
import com.backend.api.global.exception.BaseExceptionHandler;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;

@Log4j2
@Service
@RequiredArgsConstructor
public class FundAndMemberService {
	private final FundRepository fundRepository;
	private final MemberRepository memberRepository;
	private final SimpMessageSendingOperations template;
	private final NotificationService noticeService;
	private final double FEE = 0.01;

	@Transactional
	public void closeFund(Long loginUserId, Long fundId) {
		Fund fund = fundRepository.findById(fundId)
			.orElseThrow(() -> new BaseExceptionHandler(ErrorCode.NOT_FOUND_FUND));
		if (fund.getStatus() == FundStatus.CLOSED) {
			throw new BaseExceptionHandler(ErrorCode.CLOSED_FUND_EXCEPTION);
		}
		if (fund.getManager().getId() != loginUserId) {
			throw new BaseExceptionHandler(ErrorCode.UNAUTHORIZED_USER_EXCEPTION);
		}
		fund.updateFundStatus(FundStatus.CLOSED);
		memberRepository.saveAll(distributeProfit(fund, calculateProfitRate(fund)));
		fundRepository.save(fund);
		// 펀드 종료 알림
		log.info("펀드 종료: {}", fund.getFundName());
		for (Member member : fund.getFundMemberList().stream().map(FundMember::getMember).toList()) {
			log.info("펀드 종료 알림: {}", member.getNickname());
			template.convertAndSend("/api/sub/" + member.getId(), "펀드가 종료되었습니다.");
			Notice notice = Notice.builder()
				.member(member)
				.sender(fund.getManager().getNickname())
				.isRead(false)
				.alarmType(AlarmType.FUNDCLOSED)
				.content(fund.getFundName()+"펀드가 종료되었습니다.")
				.build();
			noticeService.createNotification(notice);
		}
	}

	private double calculateProfitRate(Fund fund) {
		double profitRate =((double)fund.getFundAsset() / (double)fund.getStartAsset() - 1);
		return Math.round(profitRate * 100) / 100.0;
	}

	private List<Member> distributeProfit(Fund fund, double profitRate) {
		log.info("펀드 수익률: {}", profitRate);
		List<FundMember> fundMemberList = fund.getFundMemberList();
		Member manager = fund.getManager();
		List<Member> memberList = new ArrayList<>();
		memberList.add(manager);
		for (FundMember fundMember : fundMemberList) {
			Member member = fundMember.getMember();
			long profit = (long)(fundMember.getInvestmentAmount() * profitRate);
			//수수료 계산
			long fee = Math.abs((long)(profit * FEE));
			profit -= fee;
			log.info("펀드 멤버 {} 펀드 수익 분배: {} 수수료: {}", member.getNickname(), profit, fee);
			member.addAsset(profit + fundMember.getInvestmentAmount());
			memberList.add(member);
			manager.addAsset(fee);
		}
		return memberList;
	}

}
