package com.backend.api.domain.hadoop.dto;

import java.io.Serializable;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class TradeLogDto implements Serializable {

	private String stockCode;

	private String stockName;

	private Integer price; // 주식 가격

	private String date; // 매매 시각 LocalDateTime

	private String tradeType; // 매매타입 BUY, SELL, SHORT

	private Integer amount; // 구매 수량

	private Integer stockQuantity; // 보유수량 구매후 수량?

	private Double roi; // 수익률

	private Long profit; // 수익금
	private Long memberId; // 회원 아이디
	private String memberName; // 회원 이름
}
