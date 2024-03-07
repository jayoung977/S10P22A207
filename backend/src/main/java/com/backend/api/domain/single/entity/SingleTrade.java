package com.backend.api.domain.single.entity;

import static jakarta.persistence.FetchType.LAZY;
import static jakarta.persistence.GenerationType.IDENTITY;
import static lombok.AccessLevel.PROTECTED;

import com.backend.api.domain.BaseEntity;
import com.backend.api.domain.type.TradeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import java.time.LocalDateTime;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Entity
@Table(name = "single_trade")
@NoArgsConstructor(access = PROTECTED)
public class SingleTrade extends BaseEntity {

    @Id
    @GeneratedValue(strategy = IDENTITY)
    @Column(name = "single_trade_id")
    private Long id;

    @ManyToOne(fetch = LAZY)
    private SingleGameStock singleGameStock;

    @NotNull
    private LocalDateTime date; //매매 시각

    @NotNull
    @Enumerated(EnumType.STRING)
    private TradeType tradeType; // 매매타입

    @NotNull
    private Integer amount; // 구매 수량

    @NotNull
    private Integer price;

    @NotNull
    private Integer stockQuantity; // 보유수량 구매후 수량?

    @NotNull
    private Double roi; // 수익률

    @NotNull
    private Integer profit; // 수익금

    @Builder
    public SingleTrade(SingleGameStock singleGameStock, LocalDateTime date, TradeType tradeType, Integer amount, Integer price, Integer stockQuantity, Double roi, Integer profit) {
        this.singleGameStock = singleGameStock;
        this.date = date;
        this.tradeType = tradeType;
        this.amount = amount;
        this.price = price;
        this.stockQuantity = stockQuantity;
        this.roi = roi;
        this.profit = profit;
    }
}
