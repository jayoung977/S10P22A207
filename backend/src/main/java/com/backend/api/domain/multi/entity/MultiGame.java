package com.backend.api.domain.multi.entity;

import static lombok.AccessLevel.PROTECTED;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = PROTECTED)
public class MultiGame {
    private Long multiGameLogId;
    private Long memberId;
    private Long firstDayStockChartId;
    private Integer stockAmount;
    private Long cash;
    private Long initial;
    private Long totalPurchaseAmount; //
    private Integer profits;
    private Integer day;
    private Long totalAsset;

    // 혹시 몰라 추가함
    private Long socketId;
    private Integer round;

    @Builder
    public MultiGame(Long multiGameLogId, Long memberId, Long firstDayStockChartId, Integer stockAmount, Long cash, Long initial, Long totalPurchaseAmount, Integer profits, Integer day,
        Long totalAsset,
        Long socketId, Integer round) {
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
        this.socketId = socketId;
        this.round = round;
    }
}
