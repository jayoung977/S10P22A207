package com.backend.api.domain.member.application;

import java.time.format.DateTimeFormatter;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.backend.api.domain.member.dto.request.MemberAdditionalInfoReq;
import com.backend.api.domain.member.dto.response.MemberProfileRes;
import com.backend.api.domain.member.dto.response.MemberSearchRes;
import com.backend.api.domain.member.dto.response.ProfileMultiGameLogRes;
import com.backend.api.domain.member.dto.response.ProfileSingleGameLogRes;
import com.backend.api.domain.member.entity.Member;
import com.backend.api.domain.member.repository.MemberRepository;
import com.backend.api.domain.member.repository.MultiGamePlayerRepository;
import com.backend.api.domain.multi.entity.MultiGamePlayer;
import com.backend.api.domain.single.entity.SingleGameLog;
import com.backend.api.domain.single.repository.SingleGameLogRepository;
import com.backend.api.global.common.code.ErrorCode;
import com.backend.api.global.exception.BaseExceptionHandler;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;

@Log4j2
@Service
@RequiredArgsConstructor
public class MemberService {
	private final MemberRepository memberRepository;
	private final SingleGameLogRepository singleGameLogRepository;
	private final MultiGamePlayerRepository multiGamePlayerRepository;

	public boolean existNickname(String nickname) {
		return memberRepository.existsByNickname(nickname);
	}

	@Transactional
	public void updateMemberInfo(Long loginUserId, MemberAdditionalInfoReq memberAdditionalInfoReq) {
		Member member = memberRepository.findById(loginUserId)
			.orElseThrow(() -> new BaseExceptionHandler(ErrorCode.NOT_FOUND_USER));
		member.updateMemberInfo(
			memberAdditionalInfoReq.nickname(),
			Short.valueOf(memberAdditionalInfoReq.birth()),
			memberAdditionalInfoReq.gender()
		);
	}

	public MemberProfileRes getProfile(Long loginUserId) {
		Member member = memberRepository.findById(loginUserId)
			.orElseThrow(() -> new BaseExceptionHandler(ErrorCode.NOT_FOUND_USER));
		return new MemberProfileRes(
			member.getId(),
			member.getEmail(),
			member.getNickname(),
			member.getBirthYear(),
			member.getGender(),
			member.getAsset(),
			member.getRankPoint(),
			member.getWin(),
			member.getLose(),
			member.getSingleAvgRoi(),
			member.getMultiAvgRoi()
		);
	}

	public List<ProfileSingleGameLogRes> getSingleGameLogs(Long loginUserId) {
		List<SingleGameLog> singleGameLogList = singleGameLogRepository.findAllByMember_Id(loginUserId);
		return singleGameLogList.stream().map(singleGameLog ->
			new ProfileSingleGameLogRes(
				singleGameLog.getId(),
				singleGameLog.getInitialAsset(),
				singleGameLog.getFinalRoi(),
				singleGameLog.getFinalProfit(),
				singleGameLog.getCreatedAt().format(DateTimeFormatter.ofPattern("yyyy년 MM월 dd일"))
			)
		).toList();
	}

	public List<ProfileMultiGameLogRes> getMultiGameLogs(Long loginUserId) {
		List<MultiGamePlayer> multiGamePlayerList = multiGamePlayerRepository.findAllByMember_Id(loginUserId);
		return multiGamePlayerList.stream().map(multiGamePlayer ->
			new ProfileMultiGameLogRes(
				multiGamePlayer.getMultiGameLog().getId(),
				multiGamePlayer.getMultiGameLog().getMultiGamePlayers().size(),
				multiGamePlayer.getFinalRoi(),
				multiGamePlayer.getRanking(),
				multiGamePlayer.getMultiGameLog().getCreatedAt().format(DateTimeFormatter.ofPattern("yyyy년 MM월 dd일"))
			)
		).toList();
	}

	public List<MemberSearchRes> searchMember(String nickname) {
		List<Member> memberList = memberRepository.findAllByNicknameContaining(nickname);
		List<MemberSearchRes> memberSearchResList = memberList.stream().map(member -> new MemberSearchRes(
			member.getId(),
			member.getNickname(),
			member.getAsset()
		)).toList();
		return memberSearchResList;
	}
}
