package com.backend.api.domain.fund.repository;

import com.backend.api.domain.fund.entity.FundStock;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface FundStockRepository extends JpaRepository<FundStock, Long> {
    Optional<FundStock> findByFund_IdAndStock_Id(Long fundId, Long stockId);
}
