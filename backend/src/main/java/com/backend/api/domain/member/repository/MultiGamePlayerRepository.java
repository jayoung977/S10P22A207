package com.backend.api.domain.member.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.backend.api.domain.multi.entity.MultiGamePlayer;

public interface MultiGamePlayerRepository extends JpaRepository<MultiGamePlayer, Long> {

	List<MultiGamePlayer> findAllByMember_Id(Long loginUserId);
}
