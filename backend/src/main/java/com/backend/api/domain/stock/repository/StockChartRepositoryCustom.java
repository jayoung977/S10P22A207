package com.backend.api.domain.stock.repository;

import com.backend.api.domain.stock.entity.StockChart;
import java.time.LocalDateTime;
import java.util.List;

public interface StockChartRepositoryCustom {

    List<StockChart> findRandomStocksInRange(LocalDateTime startDate, LocalDateTime endDate, List<String> stockIds);
}
