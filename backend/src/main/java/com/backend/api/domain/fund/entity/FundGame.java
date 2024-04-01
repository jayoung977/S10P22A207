package com.backend.api.domain.fund.entity;


import com.backend.api.domain.fund.dto.response.FundTradeListDto;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.HashMap;
import java.util.List;

import static lombok.AccessLevel.PROTECTED;

@Getter
@NoArgsConstructor(access = PROTECTED)
public class FundGame {
    private Long fundId;
    private HashMap<Long, Integer> stocks;
    private List<Long> firstDayChartList;
    private List<FundTradeListDto> tradeList;
    private int[] stockAmount;
    private int[] averagePrice;
    private long cash;
    private long initial;
    private long totalPurchaseAmount; // 총 거래금액.
    private int[] profits; // 각 종목별 이익
    private long[] stockPurchaseAmount; // 각 종목별 매수 금액 총량
    private int day;
    private long totalAsset; // 총 평가 자산


    @Builder
    public FundGame(Long fundId, HashMap<Long, Integer> stocks, List<Long> firstDayChartList, List<FundTradeListDto> tradeList, int[] stockAmount, int[] averagePrice, long cash, long initial, long totalPurchaseAmount, int[] profits, long[] stockPurchaseAmount, int day, long totalAsset) {
        this.fundId = fundId;
        this.stocks = stocks;
        this.firstDayChartList = firstDayChartList;
        this.tradeList = tradeList;
        this.stockAmount = stockAmount;
        this.averagePrice = averagePrice;
        this.cash = cash;
        this.initial = initial;
        this.totalPurchaseAmount = totalPurchaseAmount;
        this.profits = profits;
        this.stockPurchaseAmount = stockPurchaseAmount;
        this.day = day;
        this.totalAsset = totalAsset;
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
    public void updateDay(int day){
        this.day = day;
    }

    public void updateTotalAsset(long totalAsset) {
        this.totalAsset = totalAsset;
    }
}
