package com.backend.api.domain.multi.repository;

import com.backend.api.domain.multi.entity.MultiGameLog;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface MultiGameLogRepository extends JpaRepository<MultiGameLog, Long> {
	@Query("""
		    SELECT mgp.multiGameLog
		    FROM MultiGamePlayer mgp
		    WHERE mgp.member.id = :loginUserId
		""")
	List<MultiGameLog> findAllByMemberId(Long loginUserId);

	List<MultiGameLog> findByGameId(Long gameId);
}
