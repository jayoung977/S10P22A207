package com.backend.api.domain.fund.entity;

import com.backend.api.domain.stock.entity.Stock;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import static jakarta.persistence.FetchType.LAZY;

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
	@NotNull
	private Double roi = 0D;

	@NotNull
	private Integer profit = 0;
	@NotNull
	private Integer averagePurchasePrice = 0;
	@Builder
	public FundStock(Stock stock, Fund fund, Long stockAmount, Long investmentAmount, Double roi, Integer profit, Integer averagePurchasePrice) {
		this.stock = stock;
		this.fund = fund;
		this.stockAmount = stockAmount;
		this.investmentAmount = investmentAmount;
		this.roi = roi;
		this.profit = profit;
		this.averagePurchasePrice = averagePurchasePrice;
	}

	public void updateInvestmentAmount(long investmentAmount) {
		this.investmentAmount = investmentAmount;
	}

	public void updateStockAmount(Long stockAmount) {
		this.stockAmount = stockAmount;
	}
	public void updateAveragePurchasePrice(int averagePurchasePrice) {
		this.averagePurchasePrice = averagePurchasePrice;
	}
	public void updateRoi(double roi) {
		this.roi = roi;
	}

	public void updateProfit(int profit) {
		this.profit = profit;
	}

}
