package com.backend.api.domain.single.dto.response;

import com.backend.api.global.common.type.TradeType;
import io.swagger.v3.oas.annotations.media.Schema;
import java.util.List;

@Schema(name = "싱글게임 매매 결과 response Dto", description = "싱글게임 관련 response Dto")
public record SingleTradeResponseDto(
	@Schema(description = "보유 현금")
	long cash,
	@Schema(description = "변동이 있는 주식")
	ChangedStockResponseDto changedStockResponseDto,
	@Schema(description = "매수 or 매도")
	TradeType tradeType,
	@Schema(description = "구매가격")
	int price,
	@Schema(description = "수량")
	int amount,
	@Schema(description = "수수료")
	int fee,
	@Schema(description = "실현 손익")
	long realizedProfit,

	@Schema(description = "그간 매매 내역")
	List<SingleTradeListDto> tradeList
) {

}
