package com.backend.api.domain.member.dao;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.backend.api.domain.member.entity.Member;

public interface MemberRepository extends JpaRepository<Member, Long> {

	Optional<Member> findByNickname(String nickname);
}
