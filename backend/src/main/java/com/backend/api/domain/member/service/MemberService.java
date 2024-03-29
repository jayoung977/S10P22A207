package com.backend.api.domain.member.service;

import com.backend.api.domain.member.dto.request.MemberAdditionalInfoReq;
import com.backend.api.domain.member.dto.response.MemberProfileRes;
import com.backend.api.domain.member.dto.response.MemberSearchRes;
import com.backend.api.domain.member.dto.response.ProfileMultiGameLogRes;
import com.backend.api.domain.member.dto.response.ProfileSingleGameLogRes;
import com.backend.api.domain.member.entity.Member;
import com.backend.api.domain.member.entity.Privilege;
import com.backend.api.domain.member.repository.MemberRepository;
import com.backend.api.domain.member.repository.MultiGamePlayerRepository;
import com.backend.api.domain.multi.entity.MultiGamePlayer;
import com.backend.api.domain.single.entity.SingleGameLog;
import com.backend.api.domain.single.repository.SingleGameLogRepository;
import com.backend.api.global.common.code.ErrorCode;
import com.backend.api.global.exception.BaseExceptionHandler;
import com.backend.api.global.jwt.dto.TokenDto;
import com.backend.api.global.jwt.service.JwtService;
import com.backend.api.global.security.userdetails.CustomUserDetails;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

@Log4j2
@Service
@RequiredArgsConstructor
public class MemberService {
	private final MemberRepository memberRepository;
	private final SingleGameLogRepository singleGameLogRepository;
	private final MultiGamePlayerRepository multiGamePlayerRepository;
	private final JwtService jwtService;

	public boolean existNickname(String nickname) {
		return memberRepository.existsByNickname(nickname);
	}

	@Transactional
	public TokenDto updateMemberInfo(UserDetails userDetails, MemberAdditionalInfoReq memberAdditionalInfoReq) {
		Member member = memberRepository.findMemberByEmail(userDetails.getUsername())
			.orElseThrow(() -> new BaseExceptionHandler(ErrorCode.NOT_FOUND_USER));
		TokenDto tokenDto = createNewToken(userDetails, member);
		member.updateMemberInfo(
			memberAdditionalInfoReq.nickname(),
			Short.valueOf(memberAdditionalInfoReq.birth()),
			memberAdditionalInfoReq.gender()
		);
		return tokenDto;
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

	public List<ProfileSingleGameLogRes> getSingleGameLogs(Long userId) {
		Member findMember = memberRepository.findById(userId)
			.orElseThrow(() -> new BaseExceptionHandler(ErrorCode.NOT_FOUND_USER));
		List<SingleGameLog> singleGameLogList = singleGameLogRepository.findAllByMember_IdOrderByIdDesc(findMember.getId());
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

	public List<ProfileMultiGameLogRes> getMultiGameLogs(Long userId) {
		Member findMember = memberRepository.findById(userId)
			.orElseThrow(() -> new BaseExceptionHandler(ErrorCode.NOT_FOUND_USER));
		List<MultiGamePlayer> multiGamePlayerList = multiGamePlayerRepository.findAllByMember_IdOrderByIdDesc(findMember.getId());
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

	@Transactional(readOnly = true)
	public List<Privilege> checkMemberPrivilege(String userEmail) {
		Member member = memberRepository.findMemberByEmail(userEmail)
			.orElseThrow(() -> new BaseExceptionHandler(ErrorCode.NOT_FOUND_USER));
		return member.getRole();
	}


	private TokenDto createNewToken(UserDetails userDetails, Member member) {
		// 멤버의 권한 수정 Anonymous 삭제하고 User 권한 부여
		Collection<? extends GrantedAuthority> authorities = userDetails.getAuthorities();
		for (GrantedAuthority authority : authorities) {
			if (authority.getAuthority().equals("ROLE_" + Privilege.ANONYMOUS)) {
				member.getRole().remove(Privilege.ANONYMOUS);
				if (!member.getRole().contains(Privilege.USER)) {
					member.getRole().add(Privilege.USER);
				}

				if (userDetails instanceof CustomUserDetails) {
					// ANONYMOUS 권한 제거
					userDetails.getAuthorities().removeIf(auth ->
						auth.getAuthority().equals("ROLE_" + Privilege.ANONYMOUS));

					Collection<GrantedAuthority> newAuth = new ArrayList<>();
					newAuth.add(new SimpleGrantedAuthority(Privilege.USER.name()));
					// USER 권한 추가
					CustomUserDetails user = CustomUserDetails.builder()
						.id(((CustomUserDetails)userDetails).getId())
						.email(userDetails.getUsername())
						.nickname(((CustomUserDetails) userDetails).getNickname())
						.authorities(newAuth)
						.build();

					return new TokenDto(
						jwtService.createAccessToken(user),
						jwtService.createRefreshToken(user)
					);
				}
			}
		}
		return null;
	}
}
