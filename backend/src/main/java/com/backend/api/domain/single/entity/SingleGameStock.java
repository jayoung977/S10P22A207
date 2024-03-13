package com.backend.api.domain.single.entity;

import static jakarta.persistence.FetchType.LAZY;
import static jakarta.persistence.GenerationType.IDENTITY;
import static lombok.AccessLevel.PROTECTED;

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
import lombok.Setter;

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

    // TODO : 평균단가 @Setter 써서 표현해야할듯!
    @NotNull
    @Setter
    private Integer averagePurchasePrice = 0;

    @Builder
    public SingleGameStock(SingleGameLog singleGameLog, Stock stock, Double roi, Integer profit, Integer averagePurchasePrice) {
        this.singleGameLog = singleGameLog;
        this.stock = stock;
        this.roi = roi;
        this.profit = profit;
        this.averagePurchasePrice = averagePurchasePrice;
    }
}
