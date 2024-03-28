package com.backend.api.domain.multi.entity;

import static lombok.AccessLevel.PROTECTED;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@NoArgsConstructor(access = PROTECTED)
public class MultiGame {
    private Long multiGameLogId;
    private Long memberId;
    private Long firstDayStockChartId;

    @Setter
    private Integer stockAmount;
    private Long cash;
    private Long initial;
    private Long totalPurchaseAmount; //
    private Integer profits;
    private Integer day;
    private Long totalAsset;
    private Integer averagePrice;

    // 혹시 몰라 추가함
    private Long socketId;
    private Integer round;

    @Builder
    public MultiGame(Long multiGameLogId, Long memberId, Long firstDayStockChartId, Integer stockAmount, Long cash, Long initial, Long totalPurchaseAmount, Integer profits, Integer day,
        Long totalAsset,
        Integer averagePrice, Long socketId, Integer round) {
        this.multiGameLogId = multiGameLogId;
        this.memberId = memberId;
        this.firstDayStockChartId = firstDayStockChartId;
        this.stockAmount = stockAmount;
        this.cash = cash;
        this.initial = initial;
        this.totalPurchaseAmount = totalPurchaseAmount;
        this.profits = profits;
        this.day = day;
        this.totalAsset = totalAsset;
        this.averagePrice = averagePrice;
        this.socketId = socketId;
        this.round = round;
    }


    public void decreaseStockAmount(int stockAmount) {
        this.stockAmount -= stockAmount;
    }

    public void updateCash(long cash) {
        this.cash = cash;
    }

    public void addProfit(double profit) {
        this.profits += (int)profit;
    }
}
