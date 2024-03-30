package com.backend.api.domain.hadoop.dto;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class TradeLogResponseDto {
	private int status;
	private String message;
	private List<TradeLogDto> result;
}