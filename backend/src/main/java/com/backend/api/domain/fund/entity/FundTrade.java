package com.backend.api.domain.fund.entity;

import static jakarta.persistence.FetchType.*;
import static jakarta.persistence.GenerationType.*;
import static lombok.AccessLevel.*;

import java.time.LocalDateTime;

import com.backend.api.domain.stock.entity.Stock;
import com.backend.api.global.common.type.TradeType;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor(access = PROTECTED)
@Table(name = "fund_trade")
public class FundTrade {
	@Id
	@GeneratedValue(strategy = IDENTITY)
	@Column(name = "fund_trade_id")
	private Long id;

	@ManyToOne(fetch = LAZY)
	@JoinColumn(name = "fund_id", referencedColumnName = "fund_id")
	private Fund fund;
	@ManyToOne(fetch = LAZY)
	@JoinColumn(name = "stock_id", referencedColumnName = "stock_id")
	private Stock stock;

	private LocalDateTime tradeDate;
	@Enumerated(EnumType.STRING)
	private TradeType tradeType;
	private Integer tradeAmount;
	private Integer tradePrice;
	private Integer stockQuantity;    // 보유 수량
	private Double roi;    // 수익률
	private Long profit; // 수익금

	@Builder
	public FundTrade(Fund fund, Stock stock, LocalDateTime tradeDate, TradeType tradeType, Integer tradeAmount,
		Integer tradePrice, Integer stockQuantity, Double roi, Long profit) {
		this.fund = fund;
		this.stock = stock;
		this.tradeDate = tradeDate;
		this.tradeType = tradeType;
		this.tradeAmount = tradeAmount;
		this.tradePrice = tradePrice;
		this.stockQuantity = stockQuantity;
		this.roi = roi;
		this.profit = profit;
	}
}
