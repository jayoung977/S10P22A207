package com.backend.api.domain.single.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.backend.api.domain.single.entity.SingleGameLog;

public interface SingleGameLogRepository extends JpaRepository<SingleGameLog, Long> {

	List<SingleGameLog> findAllByMember_Id(Long loginUserId);
}
