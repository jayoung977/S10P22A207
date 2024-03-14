package com.backend.api.domain.stock.repository;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.backend.api.domain.stock.entity.Stock;
import com.backend.api.domain.stock.entity.StockChart;

import io.lettuce.core.dynamic.annotation.Param;

public interface StockChartRepository extends JpaRepository<StockChart, Long> {

    @Query(value = "SELECT * FROM stock_chart WHERE DATE(date) = :date", nativeQuery = true)
    List<StockChart> findByDate(@Param("date") LocalDate date);

    List<StockChart> findByIdBetween(Long startId, Long endId);
    List<StockChart> findAllByStock(Stock stock);
}
