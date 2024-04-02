package com.backend.api.domain.multi.entity;

import static jakarta.persistence.FetchType.*;
import static jakarta.persistence.GenerationType.*;
import static lombok.AccessLevel.*;

import java.time.LocalDateTime;

import com.backend.api.domain.BaseEntity;
import com.backend.api.domain.stock.entity.Stock;
import com.backend.api.global.common.type.TradeType;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Entity
@Table(name = "multi_trade")
@NoArgsConstructor(access = PROTECTED)
public class MultiTrade extends BaseEntity {

    @Id
    @GeneratedValue(strategy = IDENTITY)
    @Column(name = "multi_trade_id")
    private Long id;

    @ManyToOne(fetch = LAZY)
    private MultiGameLog multiGameLog;

    @ManyToOne(fetch = LAZY)
    private Stock stock;

    @NotNull
    private Long memberId;

    @NotNull
    private int day; // 거래 시각

    @NotNull
    @Enumerated(EnumType.STRING)
    private TradeType tradeType; // 매매타입

    @NotNull
    private Integer amount; // 구매 수량

    @NotNull
    private Integer price;

    @NotNull
    private Integer stockQuantity; // 보유수량

    private Double roi; // 수익률

    @NotNull
    private Integer round;

    @Builder
    public MultiTrade(MultiGameLog multiGameLog, Stock stock, Long memberId, int day, TradeType tradeType, Integer amount, Integer price, Integer stockQuantity, Double roi,
        Integer round) {
        this.multiGameLog = multiGameLog;
        this.stock = stock;
        this.memberId = memberId;
        this.day = day;
        this.tradeType = tradeType;
        this.amount = amount;
        this.price = price;
        this.stockQuantity = stockQuantity;
        this.roi = roi;
        this.round = round;
    }
}
