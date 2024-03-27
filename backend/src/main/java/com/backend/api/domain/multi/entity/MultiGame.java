package com.backend.api.domain.multi.entity;

import static lombok.AccessLevel.PROTECTED;

import com.backend.api.domain.multi.dto.MultiTradeListDto;
import java.util.List;
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
    private List<MultiTradeListDto> tradeList;
    @Setter
    private Integer stockAmount;
    private Long cash;
    private Long initial;
    private Long totalPurchaseAmount; //
    private Integer unrealizedProfit;
    private Integer profit;
    private Integer day;
    private Long totalAsset;
    private Integer averagePrice;
    private Integer shortStockAmount;

    // 혹시 몰라 추가함
    private Long socketId;
    private Integer round;

    @Builder
    public MultiGame(Long multiGameLogId, Long memberId, Long firstDayStockChartId, List<MultiTradeListDto> tradeList, Integer stockAmount, Long cash, Long initial, Long totalPurchaseAmount,
        Integer unrealizedProfit, Integer profit, Integer day, Long totalAsset, Integer averagePrice, Integer shortStockAmount, Long socketId, Integer round) {
        this.multiGameLogId = multiGameLogId;
        this.memberId = memberId;
        this.firstDayStockChartId = firstDayStockChartId;
        this.tradeList = tradeList;
        this.stockAmount = stockAmount;
        this.cash = cash;
        this.initial = initial;
        this.totalPurchaseAmount = totalPurchaseAmount;
        this.unrealizedProfit = unrealizedProfit;
        this.profit = profit;
        this.day = day;
        this.totalAsset = totalAsset;
        this.averagePrice = averagePrice;
        this.shortStockAmount = shortStockAmount;
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
        this.profit += (int)profit;
    }

    public void updateTotalAsset(long totalAsset) {
        this.totalAsset = totalAsset;
    }

    public void increaseStockAmount(Integer stockAmount) {
        this.stockAmount += stockAmount;
    }

    public void increaseShortStockAmount(Integer amount) {
        this.shortStockAmount += amount;
    }

    public void updateDay(int day) {
        this.day = day;
    }

    public void addPurchaseAmount(long cash) {
        this.totalPurchaseAmount += cash;
    }
}
