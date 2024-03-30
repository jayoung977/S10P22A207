package com.hadoop.api.domain.trade.service;

import java.util.List;

import org.apache.spark.SparkConf;
import org.apache.spark.sql.Dataset;
import org.apache.spark.sql.Encoders;
import org.apache.spark.sql.Row;
import org.apache.spark.sql.SparkSession;
import org.springframework.stereotype.Service;

import com.hadoop.api.domain.trade.dto.ApiTradeLogDto;
import com.hadoop.api.domain.trade.dto.TradeLogDto;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class TradeService {
	private String tradeLogPath = "/zigeum/trade/trade_log.parquet"; // 거래 로그 데이터가 저장된 Parquet 파일 경로

	private final SparkSession sparkSession;

	// HDFS에서 거래 로그 데이터를 조회하는 메서드
	public List<TradeLogDto> getTradeLog() {
		Dataset<Row> parquetData = sparkSession.read().parquet(tradeLogPath); // Parquet 파일 읽기
		parquetData.show(); // 읽어온 데이터 출력

		Dataset<TradeLogDto> tradeLogDataset = parquetData.as(
			Encoders.bean(TradeLogDto.class)); // Dataset<Row>를 Dataset<TradeLogDto>로 변환

		return tradeLogDataset.collectAsList(); // Dataset<TradeLogDto>를 List<TradeLogDto>로 변환하여 반환
	}

	// 거래 로그 데이터를 HDFS에 저장하는 메서드
	public void saveTradeLog(ApiTradeLogDto apiTradeLogDto) {
		Dataset<TradeLogDto> stockDataset = sparkSession.createDataset(apiTradeLogDto.getTradeLogList(),
			Encoders.bean(TradeLogDto.class)); // Dataset<TradeLogDto> 생성

		stockDataset.printSchema(); // 데이터셋 스키마 출력
		stockDataset.write().mode("append").parquet(tradeLogPath); // 데이터셋을 Parquet 파일로 저장
		stockDataset.show(); // 데이터셋 내용 출력
	}
}