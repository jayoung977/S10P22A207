package com.backend.api.domain.multi.entity;

import static lombok.AccessLevel.PROTECTED;

import com.backend.api.domain.multi.dto.response.MultiTradeListDto;
import java.util.ArrayList;
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
    private List<MultiTradeListDto> tradeList = new ArrayList<>();
    @Setter
    private Integer stockAmount = 0;
    private String roomTitle;
    private Integer password;
    private Boolean isOpen;
    private Long cash;
    private Long initial;
    private Long totalPurchaseAmount = 0L;
    private Integer unrealizedProfit = 0;
    private Integer profit = 0;
    private Integer day = 1;
    private Long totalAsset;
    private Integer averagePrice = 0; // 일반 주식 평균가
    private Integer shortAveragePrice = 0; // 공매도 주식 평균가
    private Integer shortStockAmount = 0;

    // 혹시 몰라 추가함
    private Long socketId;
    private Integer round;

    @Builder
    public MultiGame(Long multiGameLogId, Long memberId, Long firstDayStockChartId, List<MultiTradeListDto> tradeList, Integer stockAmount, String roomTitle, Integer password, Boolean isOpen,
        Long cash,
        Long initial, Long totalPurchaseAmount, Integer unrealizedProfit, Integer profit, Integer day, Long totalAsset, Integer averagePrice, Integer shortAveragePrice, Integer shortStockAmount,
        Long socketId, Integer round) {
        this.multiGameLogId = multiGameLogId;
        this.memberId = memberId;
        this.firstDayStockChartId = firstDayStockChartId;
        this.tradeList = tradeList;
        this.stockAmount = stockAmount;
        this.roomTitle = roomTitle;
        this.password = password;
        this.isOpen = isOpen;
        this.cash = cash;
        this.initial = initial;
        this.totalPurchaseAmount = totalPurchaseAmount;
        this.unrealizedProfit = unrealizedProfit;
        this.profit = profit;
        this.day = day;
        this.totalAsset = totalAsset;
        this.averagePrice = averagePrice;
        this.shortAveragePrice = shortAveragePrice;
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

    public void decreaseShortStockAmount(Integer amount) {
        this.shortStockAmount -= amount;
    }

    public void updateAveragePrice(Integer price){
        this.averagePrice = price;
    }

    public void updateShortAveragePrice(Integer price){
        this.shortAveragePrice = price;
    }

}
