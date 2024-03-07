package com.backend.api.domain.single.entity;

import static jakarta.persistence.FetchType.*;
import static jakarta.persistence.GenerationType.*;
import static lombok.AccessLevel.*;

import com.backend.api.domain.BaseEntity;
import com.backend.api.domain.stock.entity.Stock;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@Table(name = "single_game_stock")
@NoArgsConstructor(access = PROTECTED)
public class SingleGameStock extends BaseEntity {

    @Id
    @GeneratedValue(strategy = IDENTITY)
    @Column(name = "single_game_stock_id")
    private Long id;

    @ManyToOne(fetch = LAZY)
    private SingleGameLog singleGameLog;

    @ManyToOne(fetch = LAZY)
    private Stock stock;

    @NotNull
    private Long stockId;

    @NotNull
    private Double roi;

    @NotNull
    private int profit;

    @Builder
    public SingleGameStock(SingleGameLog singleGameLog, Long stockId, Double roi, int profit) {
        this.singleGameLog = singleGameLog;
        this.stockId = stockId;
        this.roi = roi;
        this.profit = profit;
    }
}
