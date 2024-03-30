package com.hadoop.api.domain.stock.service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;

import org.apache.spark.SparkConf;
import org.apache.spark.sql.Dataset;
import org.apache.spark.sql.Encoders;
import org.apache.spark.sql.Row;
import org.apache.spark.sql.SparkSession;
import org.springframework.stereotype.Service;

import com.hadoop.api.domain.stock.dto.StockRes;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class StockService {
	private String stockDataPath = "/zigeum/stock/stock_data.parquet"; // 주식 데이터가 저장된 Parquet 파일 경로

	private final SparkSession sparkSession;

	// HDFS에서 주식 데이터를 조회하는 메서드
	public List<StockRes> getStockData() {
		Dataset<Row> parquetData = sparkSession.read().parquet(stockDataPath); // Parquet 파일 읽기
		parquetData.show(); // 읽어온 데이터 출력

		Dataset<StockRes> stockResDataset = parquetData.as(Encoders.bean(StockRes.class)); // Dataset<Row>를 Dataset<StockRes>로 변환
		List<StockRes> stockResList = stockResDataset.collectAsList(); // Dataset<StockRes>를 List<StockRes>로 변환


		return stockResList; // 주식 데이터 리스트 반환
	}

	// 주식 데이터를 생성하고 HDFS에 저장하는 메서드
	public String createStockData() {
		List<StockRes> stockList = generateStockData(); // 테스트용 주식 데이터 생성
		Dataset<StockRes> stockDataset = sparkSession.createDataset(stockList, Encoders.bean(StockRes.class)); // Dataset<StockRes> 생성

		stockDataset.printSchema(); // 데이터셋 스키마 출력
		stockDataset.show(); // 데이터셋 내용 출력

		stockDataset.write().mode("append").parquet("/zigeum/stock/stock_data.parquet"); // 데이터셋을 Parquet 파일로 저장

		Dataset<Row> parquetData = sparkSession.read().parquet("/zigeum/stock/stock_data.parquet"); // 저장된 Parquet 파일 읽기
		String jsonData = parquetData.toJSON().collectAsList().toString(); // 데이터셋을 JSON 형식으로 변환


		return jsonData; // JSON 형식의 주식 데이터 반환
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