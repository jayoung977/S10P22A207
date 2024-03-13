package com.backend.api.domain.stock.entity;

import static jakarta.persistence.GenerationType.IDENTITY;
import static lombok.AccessLevel.PROTECTED;

import com.backend.api.domain.BaseEntity;
import com.backend.api.domain.fund.entity.FundStock;
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

@Entity
@Getter
@NoArgsConstructor(access = PROTECTED)
public class Stock extends BaseEntity {

	@Id
	@GeneratedValue(strategy = IDENTITY)
	@Column(name = "stock_id")
	private Long id;

	@OneToMany(mappedBy = "stock")
	List<FundStock> fundStockList = new ArrayList<>();
	@OneToMany(mappedBy = "stock")
	List<SingleGameStock> singleGameStockList = new ArrayList<>();
	@OneToMany(mappedBy = "stock")
	List<StockChart> stockCharts = new ArrayList<>();

	@NotNull
	private String stockCode;
	@NotNull
	private String stockName;

	@Builder
	public Stock(List<FundStock> fundStockList, List<SingleGameStock> singleGameStockList, List<StockChart> stockCharts, String stockCode, String stockName) {
		this.fundStockList = fundStockList;
		this.singleGameStockList = singleGameStockList;
		this.stockCharts = stockCharts;
		this.stockCode = stockCode;
		this.stockName = stockName;
	}
}
