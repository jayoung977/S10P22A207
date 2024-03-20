package com.backend.api.domain.stock.repository;

import com.backend.api.domain.stock.entity.Stock;
import com.backend.api.domain.stock.entity.StockChart;
import java.time.LocalDateTime;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface StockChartRepository extends JpaRepository<StockChart, Long>, StockChartRepositoryCustom  {

    @Query("SELECT DISTINCT s.stock.stockCode FROM StockChart s WHERE s.date BETWEEN :startDateTime AND :endDateTime")
    List<String> findDistinctStockCodeByDateBetween(LocalDateTime startDateTime, LocalDateTime endDateTime);

    List<StockChart> findRandomStocksInRange(LocalDateTime startDate, LocalDateTime endDate, List<String> stockIds);
    List<StockChart> findByIdBetween(Long startId, Long endId);
    List<StockChart> findAllByStock(Stock stock);
}
