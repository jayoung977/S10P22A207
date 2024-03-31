package com.backend.api.domain.hadoop.dto;

import java.io.Serializable;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class StockRes implements Serializable {

	private String stockCode; // 종목코드
	private String stockName; // 종목이름
	private Integer marketPrice; // 시가
	private Integer highPrice; // 고가
	private Integer lowPrice; // 저가
	private Integer endPrice; // 종가
	private Long tradingVolume; // 거래량
	private String date; // 일자
	private Double changeRate; // 등락률
}
