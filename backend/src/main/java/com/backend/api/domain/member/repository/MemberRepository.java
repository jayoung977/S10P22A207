package com.backend.api.domain.member.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.backend.api.domain.member.entity.Member;

public interface MemberRepository extends JpaRepository<Member, Long> {

	boolean existsByNickname(String nickname);
	Optional<Member> findByNickname(String nickname);
	List<Member> findAllByNicknameContaining(String nickname);

	Optional<Member> findMemberByEmail(String email);
}
