package com.hadoop.api.domain.trade.dto;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.Setter;
import scala.Serializable;

import java.util.List;

@Getter
@Setter
public class ApiTradeLogDto implements Serializable {
	List<TradeLogDto> tradeLogList;

	@JsonCreator
	public ApiTradeLogDto(@JsonProperty("tradeLogList") List<TradeLogDto> tradeLogList) {
		this.tradeLogList = tradeLogList;
	}
}