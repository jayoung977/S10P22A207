package com.backend.api.domain.stock.entity;

import static jakarta.persistence.GenerationType.*;
import static lombok.AccessLevel.*;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor(access = PROTECTED)
@Table(name = "stock_chart")
public class StockChart {
	@Id
	@GeneratedValue(strategy = IDENTITY)
	@Column(name = "stock_chart_id")
	private Long id;

	@ManyToOne
	@JoinColumn(name = "stock_id", referencedColumnName = "stock_id")
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
	private Integer tradingVolume;
	@NotNull
	private LocalDateTime date;

	public StockChart(Stock stock, Integer marketPrice, Integer highPrice, Integer lowPrice, Integer endPrice,
		Integer tradingVolume, LocalDateTime date) {
		this.stock = stock;
		this.marketPrice = marketPrice;
		this.highPrice = highPrice;
		this.lowPrice = lowPrice;
		this.endPrice = endPrice;
		this.tradingVolume = tradingVolume;
		this.date = date;
	}
}
