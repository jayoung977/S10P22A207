package com.hadoop.api.domain.stock.service;

import static org.apache.spark.sql.functions.*;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;
import java.util.stream.Collectors;

import org.apache.spark.SparkConf;
import org.apache.spark.sql.Dataset;
import org.apache.spark.sql.Encoders;
import org.apache.spark.sql.Row;
import org.apache.spark.sql.SparkSession;
import org.springframework.stereotype.Service;

import com.hadoop.api.domain.stock.dto.ChangeRateCountDto;
import com.hadoop.api.domain.stock.dto.MaxDataDto;
import com.hadoop.api.domain.stock.dto.MaxMinPriceDto;
import com.hadoop.api.domain.stock.dto.MinDataDto;
import com.hadoop.api.domain.stock.dto.StockRes;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class StockService {
	private String stockDataPath = "/zigeum/stock/stock_data.parquet"; // 주식 데이터가 저장된 Parquet 파일 경로

	private final SparkSession sparkSession;

	// HDFS에서 주식 데이터를 조회하는 메서드
	public List<StockRes> getStockData(int page, int pageSize, String stockCode) {

		Dataset<Row> parquetData = sparkSession.read().parquet(stockDataPath);
		parquetData.createOrReplaceTempView("stock_data");

		int offset = (page - 1) * pageSize;
		String sql = "SELECT * FROM ( " +
			"    SELECT *, ROW_NUMBER() OVER (ORDER BY date) AS rownum " +
			"    FROM stock_data " +
			"    WHERE stockCode = "+stockCode+
			") " +
			"WHERE rownum BETWEEN " + (offset + 1) + " AND " + (offset + pageSize);

		Dataset<Row> pagedData = sparkSession.sql(sql);
		Dataset<StockRes> stockResDataset = pagedData.as(Encoders.bean(StockRes.class));
		List<StockRes> stockResList = stockResDataset.collectAsList();

		return stockResList; // 주식 데이터 리스트 반환
	}

	// HDFS에서 주식 데이터를 조회하는 메서드
	public List<MaxMinPriceDto> getMaxMinPrice(String stockCode) {

		Dataset<Row> parquetData = sparkSession.read()
			.parquet(stockDataPath); // Parquet 파일 읽기
		parquetData.filter(col("lowPrice").notEqual(0)).createOrReplaceTempView("stock_data");

		String sql = "SELECT stockCode, MIN(lowPrice) AS minPrice, MAX(highPrice) AS maxPrice FROM ( " +
			"    SELECT * " +
			"    FROM stock_data " +
			"    WHERE stockCode = " +stockCode +
			") " +
			"GROUP BY stockCode";

		Dataset<Row> pagedData = sparkSession.sql(sql);
		pagedData.show();
		Dataset<MaxMinPriceDto> maxMinPriceDtoDataset = pagedData.as(Encoders.bean(MaxMinPriceDto.class));
		List<MaxMinPriceDto> maxMinPriceDto = maxMinPriceDtoDataset.collectAsList();
		return maxMinPriceDto;
	}

	public List<MaxDataDto> getMaxDate(String stockCode, int maxPrice) {

		Dataset<Row> parquetData = sparkSession.read()
			.parquet(stockDataPath); // Parquet 파일 읽기
		parquetData.createOrReplaceTempView("stock_data");

		String sql = "SELECT stockCode, date FROM ( " +
			"    SELECT * " +
			"    FROM stock_data " +
			"    WHERE stockCode = " +stockCode +" AND highPrice = "+maxPrice+
			") " +
			" ";

		Dataset<Row> pagedData = sparkSession.sql(sql);
		pagedData.show();
		Dataset<MaxDataDto> maxDataDtoDataset = pagedData.as(Encoders.bean(MaxDataDto.class));
		List<MaxDataDto> maxDataDto = maxDataDtoDataset.collectAsList();
		return maxDataDto;
	}

	public List<MinDataDto> getMinDate(String stockCode, int minPrice) {

		Dataset<Row> parquetData = sparkSession.read()
			.parquet(stockDataPath); // Parquet 파일 읽기
		parquetData.createOrReplaceTempView("stock_data");

		String sql = "SELECT stockCode, date FROM ( " +
			"    SELECT * " +
			"    FROM stock_data " +
			"    WHERE stockCode = " +stockCode +" AND lowPrice = "+minPrice+
			") " +
			" ";

		Dataset<Row> pagedData = sparkSession.sql(sql);
		pagedData.show();
		Dataset<MinDataDto> minDataDtoDataset = pagedData.as(Encoders.bean(MinDataDto.class));
		List<MinDataDto> minDataDto = minDataDtoDataset.collectAsList();
		return minDataDto;
	}

	public List<ChangeRateCountDto> getChangeRateCount(String stockCode) {

		Dataset<Row> parquetData = sparkSession.read()
			.parquet(stockDataPath); // Parquet 파일 읽기
		parquetData.createOrReplaceTempView("stock_data");

		String sql = "SELECT SUM(CASE WHEN changeRate > 0 THEN 1 ELSE 0 END) AS positiveCount,"
			+ " SUM(CASE WHEN changeRate < 0 THEN 1 ELSE 0 END) AS negativeCount"
			+ " FROM stock_data" +
			"    WHERE stockCode = " +stockCode;

		Dataset<Row> pagedData = sparkSession.sql(sql);
		pagedData.show();
		Dataset<ChangeRateCountDto> changeRateCountDtoDataset = pagedData.as(Encoders.bean(ChangeRateCountDto.class));
		List<ChangeRateCountDto> changeRateCountDto = changeRateCountDtoDataset.collectAsList();
		return changeRateCountDto;
	}

	// 주식 데이터를 생성하고 HDFS에 저장하는 메서드
	public List<StockRes> createStockData() {
		List<StockRes> stockList = generateStockData(); // 테스트용 주식 데이터 생성
		Dataset<Row> parquetData = sparkSession.read().parquet(stockDataPath); // Parquet 파일 읽기

		Dataset<StockRes> stockDataset = sparkSession.createDataset(stockList, Encoders.bean(StockRes.class)); // Dataset<StockRes> 생성

		stockDataset.printSchema(); // 데이터셋 스키마 출력
		stockDataset.show(); // 데이터셋 내용 출력

		stockDataset.write().mode("append").parquet("/zigeum/stock/stock_data.parquet"); // 데이터셋을 Parquet 파일로 저장
		List<StockRes> stockResList = stockDataset.collectAsList(); // Dataset<StockRes>를 List<StockRes>로 변환

		return stockResList; // JSON 형식의 주식 데이터 반환
	}

	/* 테스트용 주식 데이터 생성 메서드 */
	private List<StockRes> generateStockData() {
		String date = LocalDate.now().format(java.time.format.DateTimeFormatter.ofPattern("yyyy-MM-dd")); // 현재 날짜 가져오기
		List<StockRes> stockList = new ArrayList<>(); // 주식 데이터를 저장할 리스트
		Random random = new Random(); // 랜덤 값 생성을 위한 Random 객체

		// 예시 주식 데이터 생성
		stockList.add(StockRes.builder()
			.stockCode("AAPL")
			.stockName("Apple Inc.")
			.marketPrice(random.nextInt(1000) + 1000)
			.highPrice(1550)
			.lowPrice(1450)
			.endPrice(1505)
			.tradingVolume(100000L)
			.date(date)
			.changeRate(0.03)
			.build());

		stockList.add(StockRes.builder()
			.stockCode("GOOGL")
			.stockName("Alphabet Inc.")
			.marketPrice(2500)
			.highPrice(2550)
			.lowPrice(2450)
			.endPrice(2510)
			.tradingVolume(80000L)
			.date(date)
			.changeRate(0.02)
			.build());

		stockList.add(StockRes.builder()
			.stockCode("MSFT")
			.stockName("Microsoft Corporation")
			.marketPrice(3000)
			.highPrice(3050)
			.lowPrice(2950)
			.endPrice(3010)
			.tradingVolume(120000L)
			.date(date)
			.changeRate(0.025)
			.build());

		return stockList; // 생성된 주식 데이터 리스트 반환
	}
}