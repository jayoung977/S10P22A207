package com.backend.api.domain.stock.entity;

import static jakarta.persistence.GenerationType.IDENTITY;
import static lombok.AccessLevel.PROTECTED;

import com.backend.api.domain.fund.entity.FundStock;
import com.backend.api.domain.fund.entity.FundTrade;
import com.backend.api.domain.single.entity.SingleGameStock;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.validation.constraints.NotNull;
import java.util.ArrayList;
import java.util.List;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Entity
@Getter
@ToString
@NoArgsConstructor(access = PROTECTED)
public class Stock {

	@Id
	@GeneratedValue(strategy = IDENTITY)
	@Column(name = "stock_id")
	private Long id;
	@NotNull
	@Column(name = "stock_code", unique = true)// 외래키 지정
	private String stockCode;
	@NotNull
	private String stockName;
	@OneToMany(mappedBy = "stock")
	private List<FundStock> fundStockList = new ArrayList<>();
	@OneToMany(mappedBy = "stock")
	private List<SingleGameStock> singleGameStockList = new ArrayList<>();
	@OneToMany(mappedBy = "stock")
	private List<FundTrade> fundTradeList = new ArrayList<>();
	@OneToMany(mappedBy = "stock")
	private List<StockChart> stockCharts = new ArrayList<>();

	@Builder
	public Stock(List<FundStock> fundStockList, List<SingleGameStock> singleGameStockList,
		List<FundTrade> fundTradeList, List<StockChart> stockCharts, String stockCode, String stockName) {
		this.fundStockList = fundStockList;
		this.singleGameStockList = singleGameStockList;
		this.stockCharts = stockCharts;
		this.stockCode = stockCode;
		this.stockName = stockName;
		this.fundTradeList = fundTradeList;
	}
}
