package com.backend.api.domain.stock.repository;

import com.backend.api.domain.stock.entity.StockChart;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public interface StockChartRepository extends JpaRepository<StockChart, Long>, StockChartRepositoryCustom  {

    @Query("SELECT DISTINCT s.stock.stockCode FROM StockChart s WHERE s.date BETWEEN :startDateTime AND :endDateTime")
    List<String> findDistinctStockCodeByDateBetween(@Param("startDateTime") LocalDateTime startDateTime, @Param("endDateTime")LocalDateTime endDateTime);

    List<StockChart> findRandomStocksInRange(LocalDateTime startDate, LocalDateTime endDate, List<String> stockIds);
    List<StockChart> findByIdBetween(Long startId, Long endId);
    Optional<StockChart> findByStock_StockCodeAndDateBetween(String stockCode, LocalDateTime startDateTime, LocalDateTime localDateTime);

    Optional<StockChart> findByStock_IdAndDate(Long stockId, LocalDateTime startDate);
}
