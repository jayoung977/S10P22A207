package com.backend.api.domain.stock.repository;

import static com.backend.api.domain.stock.entity.QStockChart.stockChart;

import com.backend.api.domain.stock.entity.StockChart;
import com.querydsl.jpa.impl.JPAQueryFactory;
import jakarta.persistence.EntityManager;
import java.time.LocalDateTime;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class StockChartRepositoryImpl implements StockChartRepositoryCustom {

    @Autowired
    private EntityManager entityManager;

    @Override
    public List<StockChart> findRandomStocksInRange(LocalDateTime startDate, LocalDateTime endDate, List<String> stockIds) {
        JPAQueryFactory queryFactory = new JPAQueryFactory(entityManager);

        return queryFactory.selectFrom(stockChart)
            .where(stockChart.date.between(startDate, endDate)
                .and(stockChart.stock.stockCode.in(stockIds)))
            .limit(10)
            .fetch();
    }
}