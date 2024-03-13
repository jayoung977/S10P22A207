package com.backend.api.domain.single.entity;


import java.util.HashMap;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SingleGame {
    private String id;
    private HashMap<Long, Integer> stocks;
    private int[] stockAmount;
    private long cash;
    private long initial;

    public SingleGame(String id, HashMap<Long, Integer> stocks, int[] stockAmount,long cash, long initial) {
        this.id = id;
        this.stocks = stocks;
        this.stockAmount = stockAmount;
        this.cash = cash;
        this.initial = initial;
    }
}
