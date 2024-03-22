package com.backend.api.domain.fund.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.backend.api.domain.fund.entity.Fund;
import com.backend.api.domain.fund.entity.type.FundStatus;

public interface FundRepository extends JpaRepository<Fund, Long> {
	List<Fund> findALLByStatusOrderByIdDesc(FundStatus status);
	List<Fund> findAllByManager_IdOrderByIdDesc(Long managerId);
	List<Fund> findAllByFundNameContainingOrderByIdDesc(String fundName);

	boolean existsByFundName(String fundName);
}
