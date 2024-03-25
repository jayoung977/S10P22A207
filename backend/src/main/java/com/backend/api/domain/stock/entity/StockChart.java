package com.backend.api.domain.stock.entity;

import static jakarta.persistence.FetchType.LAZY;
import static jakarta.persistence.GenerationType.IDENTITY;
import static lombok.AccessLevel.PROTECTED;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;
import jakarta.validation.constraints.NotNull;
import java.time.LocalDateTime;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor(access = PROTECTED)
@Table(
	name = "stock_chart",
	uniqueConstraints = {
		@UniqueConstraint(
			name = "contstraintName",
			columnNames = {"date", "stock_code"}
		)
	}
)
public class StockChart {

	@Id
	@GeneratedValue(strategy = IDENTITY)
	@Column(name = "stock_chart_id")
	private Long id;

	@ManyToOne(fetch = LAZY)
	@JoinColumn(name = "stock_code", referencedColumnName = "stock_code")
	private Stock stock;

	@NotNull
	private Integer marketPrice;
	@NotNull
	private Integer highPrice;
	@NotNull
	private Integer lowPrice;
	@NotNull
	private Integer endPrice;
	@NotNull
	private Long tradingVolume;
	@NotNull
	private LocalDateTime date;
	private Double changeRate;


	@Builder
	public StockChart(Stock stock, Integer marketPrice, Integer highPrice, Integer lowPrice, Integer endPrice, Long tradingVolume, LocalDateTime date, Double changeRate) {
		this.stock = stock;
		this.marketPrice = marketPrice;
		this.highPrice = highPrice;
		this.lowPrice = lowPrice;
		this.endPrice = endPrice;
		this.tradingVolume = tradingVolume;
		this.date = date;
		this.changeRate = changeRate;
	}
}
