package com.backend.api.domain.fund.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.backend.api.domain.fund.entity.Fund;
import com.backend.api.domain.fund.entity.type.FundStatus;

public interface FundRepository extends JpaRepository<Fund, Long> {
	List<Fund> findALLByStatus(FundStatus status);
	List<Fund> findAllByManager_Id(Long managerId);
	List<Fund> findAllByFundNameContaining(String fundName);
}
