package com.backend.api.domain.single.repository;

import com.backend.api.domain.single.entity.SingleGameLog;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SingleGameLogRepository extends JpaRepository<SingleGameLog, Long> {

    List<SingleGameLog> findAllByMember_IdOrderByIdDesc(Long loginUserId);
}
