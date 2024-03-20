package com.backend.api.domain.stock.repository;

import com.backend.api.domain.stock.entity.Stock;
import com.backend.api.domain.stock.entity.StockChart;
import io.lettuce.core.dynamic.annotation.Param;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface StockChartRepository extends JpaRepository<StockChart, Long>, StockChartRepositoryCustom  {
    @Query("SELECT sc FROM StockChart sc WHERE DATE(sc.date) = :date")
    Page<StockChart> findByDate(@Param("date") LocalDate date, Pageable pageable);

    @Query("SELECT DISTINCT s.stock.stockCode FROM StockChart s WHERE s.date BETWEEN :startDateTime AND :endDateTime")
    List<String> findDistinctStockCodeByDateBetween(LocalDateTime startDateTime, LocalDateTime endDateTime);

    List<StockChart> findRandomStocksInRange(LocalDateTime startDate, LocalDateTime endDate, List<String> stockIds);
    List<StockChart> findByIdBetween(Long startId, Long endId);
    List<StockChart> findAllByStock(Stock stock);
}
