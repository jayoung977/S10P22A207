package com.hadoop.api.domain.stock.dto;

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
public class MaxMinPriceDto implements Serializable {
	private String stockCode;
	private Integer maxPrice;
	private Integer minPrice;

}