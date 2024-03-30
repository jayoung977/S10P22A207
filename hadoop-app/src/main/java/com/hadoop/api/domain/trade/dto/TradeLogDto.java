package com.hadoop.api.domain.trade.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import scala.Serializable;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TradeLogDto implements Serializable {

	private String stockCode;
	private String stockName;
	private Integer price;
	private String date;
	private String tradeType;
	private Integer amount;
	private Integer stockQuantity;
	private Double roi;
	private Long profit;
	private Long memberId;
	private String memberName;
}