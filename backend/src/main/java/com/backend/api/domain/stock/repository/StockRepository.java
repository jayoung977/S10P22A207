package com.backend.api.domain.stock.repository;

import com.backend.api.domain.member.entity.Member;
import com.backend.api.domain.stock.entity.Stock;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface StockRepository extends JpaRepository<Stock, Long> {

    Optional<Stock> findByStockCode(String stockCode);

}
