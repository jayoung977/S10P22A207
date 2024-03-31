package com.hadoop.api.global.config;

import org.apache.spark.SparkConf;
import org.apache.spark.sql.SparkSession;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class SparkConfig {

	@Bean
	public SparkConf sparkConf() {
		return new SparkConf()
			.setAppName("Java Spark")
			.setMaster("local[*]")
			.set("spark.hadoop.fs.defaultFS", "hdfs://namenode:9000");
	}

	@Bean
	public SparkSession sparkSession(SparkConf sparkConf) {
		return SparkSession.builder()
			.config(sparkConf)
			.config("spark.sql.shuffle.partitions", 4)
			.config("spark.default.parallelism", 8)
			.config("spark.driver.memory", "4g")
			.config("spark.executor.memory", "2g")
			.config("spark.sql.adaptive.enabled", "true")
			.getOrCreate();
	}
}