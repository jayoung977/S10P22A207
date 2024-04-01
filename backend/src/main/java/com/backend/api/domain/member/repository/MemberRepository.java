package com.backend.api.domain.member.repository;

import com.backend.api.domain.member.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface MemberRepository extends JpaRepository<Member, Long> {

	boolean existsByNickname(String nickname);
	Optional<Member> findByNickname(String nickname);
	List<Member> findAllByNicknameContaining(String nickname);

	Optional<Member> findMemberByEmail(String email);

    List<Member> findAllByOrderByAssetDesc();
}
