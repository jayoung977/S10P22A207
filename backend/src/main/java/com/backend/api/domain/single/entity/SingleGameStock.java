package com.backend.api.domain.single.entity;

import com.backend.api.domain.BaseEntity;
import com.backend.api.domain.stock.entity.Stock;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import static jakarta.persistence.FetchType.LAZY;
import static jakarta.persistence.GenerationType.IDENTITY;
import static lombok.AccessLevel.PROTECTED;

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
    private Double roi = 0D;

    @NotNull
    private Integer profit = 0;

    @NotNull
    private Integer averagePurchasePrice = 0;

    @Builder
    public SingleGameStock(SingleGameLog singleGameLog, Stock stock, Double roi, Integer profit, Integer averagePurchasePrice) {
        this.singleGameLog = singleGameLog;
        this.stock = stock;
        this.roi = roi;
        this.profit = profit;
        this.averagePurchasePrice = averagePurchasePrice;
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
