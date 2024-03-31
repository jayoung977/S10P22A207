package com.hadoop.api.domain.stock.service;

import static org.apache.spark.sql.functions.*;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;
import java.util.stream.Collectors;

import org.apache.spark.SparkConf;
import org.apache.spark.api.java.function.MapFunction;
import org.apache.spark.sql.Dataset;
import org.apache.spark.sql.Encoders;
import org.apache.spark.sql.Row;
import org.apache.spark.sql.SaveMode;
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

		String partitionedStockDataPath = stockDataPath + "/partitioned/stockCode="+stockCode;
		Dataset<Row> parquetData = sparkSession.read().parquet(partitionedStockDataPath);
		parquetData.createOrReplaceTempView("stock_data");
		parquetData.printSchema();
		int offset = (page - 1) * pageSize;
		String sql = "SELECT * FROM ( " +
			"    SELECT *, ROW_NUMBER() OVER (ORDER BY date) AS rownum " +
			"    FROM stock_data " +
			") " +
			"WHERE rownum BETWEEN " + (offset + 1) + " AND " + (offset + pageSize);

		Dataset<Row> pagedData = sparkSession.sql(sql);
		Dataset<StockRes> stockResDataset = pagedData.map(
			(MapFunction<Row, StockRes>) row -> StockRes.builder()
				.stockCode(stockCode)
				.stockName(row.getString(7))
				.marketPrice(row.getInt(1))
				.highPrice(row.getInt(2))
				.lowPrice(row.getInt(3))
				.endPrice(row.getInt(4))
				.tradingVolume(row.getLong(5))
				.date(row.getString(0))
				.changeRate(row.getDouble(6))
				.build(),
			Encoders.bean(StockRes.class)
		);
		List<StockRes> stockResList = stockResDataset.collectAsList();

		return stockResList; // 주식 데이터 리스트 반환
	}

	// HDFS에서 주식 데이터를 조회하는 메서드
	public List<MaxMinPriceDto> getMaxMinPrice(String stockCode) {
		String partitionedStockDataPath = stockDataPath + "/partitioned/stockCode="+stockCode;
		Dataset<Row> parquetData = sparkSession.read()
			.parquet(partitionedStockDataPath); // Parquet 파일 읽기
		parquetData.filter(col("lowPrice").notEqual(0)).createOrReplaceTempView("stock_data");

		String sql = "SELECT MIN(lowPrice) AS minPrice, MAX(highPrice) AS maxPrice FROM ( " +
			"    SELECT * " +
			"    FROM stock_data " +
			") ";

		Dataset<Row> pagedData = sparkSession.sql(sql);
		pagedData.show();
		Dataset<MaxMinPriceDto> maxMinPriceDtoDataset = pagedData.map(
			(MapFunction<Row, MaxMinPriceDto>) row -> MaxMinPriceDto.builder()
				.stockCode(stockCode)
				.minPrice(row.getInt(0))
				.maxPrice(row.getInt(1))
				.build(),
			Encoders.bean(MaxMinPriceDto.class)
		);
		List<MaxMinPriceDto> maxMinPriceDto = maxMinPriceDtoDataset.collectAsList();
		return maxMinPriceDto;
	}

	public List<MaxDataDto> getMaxDate(String stockCode, int maxPrice) {
		String partitionedStockDataPath = stockDataPath + "/partitioned/stockCode="+stockCode;
		Dataset<Row> parquetData = sparkSession.read()
			.parquet(partitionedStockDataPath); // Parquet 파일 읽기
		parquetData.createOrReplaceTempView("stock_data");

		String sql = "SELECT date FROM ( " +
			"    SELECT * " +
			"    FROM stock_data " +
			"    WHERE highPrice = "+maxPrice+
			") " +
			" ";

		Dataset<Row> pagedData = sparkSession.sql(sql);
		pagedData.show();
		Dataset<MaxDataDto> maxDataDtoDataset = pagedData.map(
			(MapFunction<Row, MaxDataDto>) row -> MaxDataDto.builder()
				.stockCode(stockCode)
				.date(row.getString(0))
				.build(),
			Encoders.bean(MaxDataDto.class)
		);
		List<MaxDataDto> maxDataDto = maxDataDtoDataset.collectAsList();
		return maxDataDto;
	}

	public List<MinDataDto> getMinDate(String stockCode, int minPrice) {
		String partitionedStockDataPath = stockDataPath + "/partitioned/stockCode="+stockCode;
		Dataset<Row> parquetData = sparkSession.read()
			.parquet(partitionedStockDataPath); // Parquet 파일 읽기
		parquetData.createOrReplaceTempView("stock_data");
		parquetData.printSchema();
		String sql = "SELECT date FROM ( " +
			"    SELECT * " +
			"    FROM stock_data " +
			"    WHERE lowPrice = "+minPrice+
			") " +
			" ";

		Dataset<Row> pagedData = sparkSession.sql(sql);
		pagedData.show();
		Dataset<MinDataDto> minDataDtoDataset = pagedData.map(
			(MapFunction<Row, MinDataDto>) row -> MinDataDto.builder()
				.stockCode(stockCode)
				.date(row.getString(0))
				.build(),
			Encoders.bean(MinDataDto.class)
		);
		List<MinDataDto> minDataDto = minDataDtoDataset.collectAsList();
		return minDataDto;
	}

	public List<ChangeRateCountDto> getChangeRateCount(String stockCode) {
		String partitionedStockDataPath = stockDataPath + "/partitioned/stockCode="+stockCode;
		Dataset<Row> parquetData = sparkSession.read()
			.option("select", "changeRate, stockCode")
			.parquet(partitionedStockDataPath);
		parquetData.createOrReplaceTempView("stock_data");

		String sql = "SELECT SUM(CASE WHEN changeRate > 0 THEN 1 ELSE 0 END) AS positiveCount,"
			+ " SUM(CASE WHEN changeRate < 0 THEN 1 ELSE 0 END) AS negativeCount"
			+ " FROM stock_data ";


		Dataset<Row> pagedData = sparkSession.sql(sql);
		pagedData.show();
		Dataset<ChangeRateCountDto> changeRateCountDtoDataset = pagedData.as(Encoders.bean(ChangeRateCountDto.class));
		List<ChangeRateCountDto> changeRateCountDto = changeRateCountDtoDataset.collectAsList();
		return changeRateCountDto;
	}

	public void partitionParquetByStockCode() {
		// 기존 Parquet 파일을 읽어오기
		Dataset<Row> parquetData = sparkSession.read().parquet(stockDataPath);

		// 파티션 컬럼으로 stockCode 사용하여 새로운 Parquet 파일 저장
		String partitionedStockDataPath = stockDataPath + "/partitioned";
		parquetData.write()
			.partitionBy("stockCode")
			.mode(SaveMode.Overwrite)
			.parquet(partitionedStockDataPath);
	}

}