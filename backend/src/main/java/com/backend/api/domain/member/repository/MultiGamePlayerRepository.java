package com.backend.api.domain.member.repository;

import com.backend.api.domain.multi.entity.MultiGamePlayer;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MultiGamePlayerRepository extends JpaRepository<MultiGamePlayer, Long> {

	List<MultiGamePlayer> findAllByMultiGameLog_Id(Long multiGameLogId);

	List<MultiGamePlayer> findAllByMember_IdOrderByIdDesc(Long loginUserId);

	Optional<MultiGamePlayer> findByMultiGameLog_IdAndMember_Id(Long multiGameLogId,Long memberId);

}
