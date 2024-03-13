package com.backend.api.domain.fund.entity;

import static jakarta.persistence.FetchType.*;

import com.backend.api.domain.stock.entity.Stock;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class FundStock {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "fund_stock_id")
	private Long id;

	@ManyToOne(fetch = LAZY)
	@JoinColumn(name = "stock_id", referencedColumnName = "stock_id")
	private Stock stock;

	@ManyToOne(fetch = LAZY)
	@JoinColumn(name = "fund_id", referencedColumnName = "fund_id")
	private Fund fund;

	private Long stockAmount = 0L; // 보유 개수
	private Long investmentAmount = 0L; // 투자 금액

	@Builder
	public FundStock(Stock stock, Fund fund, Long stockAmount, Long investmentAmount) {
		this.stock = stock;
		this.fund = fund;
		this.stockAmount = stockAmount;
		this.investmentAmount = investmentAmount;
	}
}
