package com.backend.api.domain.multi.repository;

import com.backend.api.domain.multi.entity.MultiTrade;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MultiTradeRepository extends JpaRepository<MultiTrade, Long> {

}
