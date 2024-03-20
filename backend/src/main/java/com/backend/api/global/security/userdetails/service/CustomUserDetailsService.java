package com.backend.api.global.security.userdetails.service;

import java.util.Collection;
import java.util.List;
import java.util.Optional;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

import com.backend.api.domain.member.entity.Member;
import com.backend.api.domain.member.entity.Privilege;
import com.backend.api.domain.member.repository.MemberRepository;
import com.backend.api.global.security.userdetails.CustomUserDetails;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;

@Log4j2
@Component
@Transactional
@RequiredArgsConstructor
public class CustomUserDetailsService implements UserDetailsService {

	private final MemberRepository memberRepository;

	public CustomUserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
		Optional<Member> optionalMember = memberRepository.findMemberByEmail(email);
		Member member = optionalMember.orElseGet(() -> registerMember(email));
		log.info("member : " + member.getEmail());

		return CustomUserDetails.builder()
			.id(member.getId())
			.email(member.getEmail())
			.nickname(member.getNickname())
			.authorities(mapPrivilegeToAuthorities(member))
			.build();
	}

	private Member registerMember(String email) {
		return memberRepository.save(Member.builder()
			.email(email)
			.asset(100_00_000L) // 시작시 초기 자금
			.role(List.of(Privilege.ANONYMOUS))
			.singleGameChance(5)
			.rankPoint(0)
			.win(0)
			.lose(0)
			.singleAvgRoi(0D)
			.multiAvgRoi(0D)
			.build());
	}

	protected Collection<? extends GrantedAuthority> mapPrivilegeToAuthorities(Member member) {
		return AuthorityUtils.createAuthorityList(member.getRole().stream().map(Enum::name).toList());
	}
}