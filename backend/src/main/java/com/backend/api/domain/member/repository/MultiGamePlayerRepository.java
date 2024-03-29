package com.backend.api.domain.member.repository;

import com.backend.api.domain.multi.entity.MultiGamePlayer;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MultiGamePlayerRepository extends JpaRepository<MultiGamePlayer, Long> {

	List<MultiGamePlayer> findAllByMember_Id(Long loginUserId);

    List<MultiGamePlayer> findAllByMultiGameLog_Id(Long multiGameLogId);
}
