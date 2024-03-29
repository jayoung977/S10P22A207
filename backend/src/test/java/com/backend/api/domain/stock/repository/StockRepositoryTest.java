package com.backend.api.domain.stock.repository;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

import com.backend.api.domain.stock.entity.Stock;
import com.backend.api.domain.stock.entity.StockChart;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Optional;
import lombok.extern.log4j.Log4j2;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

@Log4j2
@SpringBootTest
class StockRepositoryTest {

    @Autowired
    private StockRepository stockRepository;
    @Autowired
    private StockChartRepository stockChartRepository;

    @BeforeEach
    void setUp() {

    }
    @Test
    @Transactional
    @DisplayName("주식 찾기 테스트")
    void testFindStockByStockCode() {
        // given
        String stockCode = "999999";
        Stock stock = Stock.builder().stockCode(stockCode).stockName("TEST999999").build();
        stockRepository.save(stock);
        // when
        Optional<Stock> findStock = stockRepository.findByStockCode(stockCode);
        // then
        assertTrue(findStock.isPresent());
        assertEquals(findStock.get().getStockCode(), stockCode);
    }

    @Test
    @Transactional
    @DisplayName("주식 차트 찾기 테스트")
    void testFindStockChartByStockCode() {
        // given
        String stockCode = "999999"; // 테스트 주식 코드
        int expected = 5; // 테스트 주식 차트 개수
        Stock stock = Stock.builder().stockCode(stockCode).stockName("TEST999999").stockCharts(new ArrayList<>()).build();
        stockRepository.save(stock);
        log.info(stock.toString());

        // StockChart 생성 및 Stock 엔티티 설정
        for(int i = 0; i < expected; i++) {
            StockChart stockChart = StockChart.builder()
                .stock(stock) // Stock 엔티티 설정
                .marketPrice(1000 + i)
                .highPrice(1100 + i)
                .lowPrice(900 + i)
                .endPrice(1000 + i)
                .tradingVolume(1000 + i)
                .date(LocalDateTime.now().minusDays(i))
                .changeRate(0.1)
                .build();
            stockChartRepository.save(stockChart);
            log.info("stockChart: {} {} ", stockChart.getStock().getStockCode(), stockChart.getStock().getStockName());

        }
        // Stock fs = stockRepository.findByStockCode("060310").get();
        // log.info("@@stockchart: {}",fs.getStockCharts());

        // when
        Optional<Stock> findStock = stockRepository.findByStockCode(stockCode);
        log.info("stock: {} {}", findStock.get().getStockCode(), findStock.get().getStockName());

        // then
        assertTrue(findStock.isPresent());
        assertEquals(expected, findStock.get().getStockCharts().size());
    }

}
