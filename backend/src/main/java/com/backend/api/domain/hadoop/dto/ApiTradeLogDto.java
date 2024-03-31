package com.backend.api.domain.hadoop.dto;

import java.io.Serializable;
import java.util.List;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class ApiTradeLogDto implements Serializable {
	List<TradeLogDto> tradeLogList;
}
