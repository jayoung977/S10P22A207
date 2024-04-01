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
public class MaxMinPriceDto implements Serializable {
	private String stockCode;
	private String minPriceDate;
	private Integer maxPrice;
	private String maxPriceDate;
	private Integer minPrice;

}