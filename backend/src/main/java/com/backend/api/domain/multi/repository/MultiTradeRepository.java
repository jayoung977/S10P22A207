package com.backend.api.domain.multi.repository;

import com.backend.api.domain.multi.entity.MultiTrade;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MultiTradeRepository extends JpaRepository<MultiTrade, Long> {

    List<MultiTrade> findAllByMultiGameLog_IdAndMemberId(Long multiGameLogId, Long memberId);
}
