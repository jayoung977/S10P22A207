package com.backend.api.domain.fund.repository;

import com.backend.api.domain.fund.entity.FundTrade;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FundTradeRepository extends JpaRepository<FundTrade, Long> {
}
