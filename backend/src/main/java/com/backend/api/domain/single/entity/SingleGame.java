package com.backend.api.domain.single.entity;


import static lombok.AccessLevel.PROTECTED;

import java.util.HashMap;
import java.util.List;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = PROTECTED)
public class SingleGame {
    private Long singleGameLogId;
    private HashMap<Long, Integer> stocks;
    private List<Long> firstDayChartList;
    private int[] stockAmount;
    private int[] averagePrice;
    private long cash;
    private long initial;
    private long totalPurchaseAmount;
    private int[] profits; // 각 종목별 이익
    private long[] stockPurchaseAmount; // 각 종목별 매수 금액 총량

    @Builder
    public SingleGame(Long singleGameLogId, HashMap<Long, Integer> stocks, List<Long> firstDayChartList, int[] stockAmount, int[] averagePrice, long cash, long initial, long totalPurchaseAmount,
        int[] profits, long[] stockPurchaseAmount) {
        this.singleGameLogId = singleGameLogId;
        this.stocks = stocks;
        this.firstDayChartList = firstDayChartList;
        this.stockAmount = stockAmount;
        this.averagePrice = averagePrice;
        this.cash = cash;
        this.initial = initial;
        this.totalPurchaseAmount = totalPurchaseAmount;
        this.profits = profits;
        this.stockPurchaseAmount = stockPurchaseAmount;
    }





    public void updateCash(long cash) {
        this.cash = cash;
    }

    public void addTotalPurchaseAmount(long cash) {
        this.totalPurchaseAmount += cash;
    }

    public void addProfit(int idx, int amount) {
        this.profits[idx] += amount;
    }
}
