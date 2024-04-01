import { create } from "zustand";

// 랭커 목록
type rankMemberDtoType = {
    memberId :number,
    nickname :string,
    singleGameStockId :number,
    roi :number,
}
type rankMemberDtoListType = rankMemberDtoType[];

type rankMemberType = {
    stockId :number,
    rankMemberDtoList :rankMemberDtoListType,
}

type rankMemberListType = rankMemberType[];

// 주식 데이터 목록
type stockChartType = {
    date :string,
    marketPrice :number,
    highPrice :number,
    lowPrice :number,
    endPrice :number,
    tradingVolume :number,
}

type stockChartListType = stockChartType[];

type stockChartDataType = {
    stockId :number,
    stockChartList :stockChartListType;
}
type stockChartDataListType = stockChartDataType[];

// 실제 주식 이름 목록
type stockInfoDtoType = {
    stockId :number,
    stockName :string,
}
type stockInfoDtoListType = stockInfoDtoType[];

// 매매 내역 목록
type singleLogTradeDtoType = {
    date :string,
    tradeType :string,
    price :number,
    amount :number,
    profit :number,
}
type singleLogTradeDtoListType = singleLogTradeDtoType[];
type tradeType = {
    stockId :number,
    singleLogTradeDtoList :singleLogTradeDtoListType,
}
type tradeListType = tradeType[];

type Store = {
    selectedIndex :number | any;
    setSelectedIndex :(value :number | any) => void;

    rankMemberList :rankMemberListType | any;
    setRankMemberList :(value :rankMemberListType | any) => void;

    stockChartDataList :any;
    setStockChartDataList :(value :any) => void;
    
    stockInfoDtoList :stockInfoDtoListType | any;
    setStockInfoDtoList :(value :stockInfoDtoListType | any) => void;

    tradeList :tradeListType | any;
    setTradeList :(value :tradeListType | any) => void;
};

const SingleReviewStore = create<Store>((set: any) => ({
    selectedIndex: 0,
    setSelectedIndex: (value) => set({ selectedIndex : value }),
    
    rankMemberList: [],
    setRankMemberList: (value) => set({ rankMemberList : value }),

    stockChartDataList :[],
    setStockChartDataList :(value) => set({ stockChartDataList : value }),

    stockInfoDtoList: [],
    setStockInfoDtoList: (value) => set({ stockInfoDtoList : value }),

    tradeList: [],
    setTradeList :(value) => set({ tradeList : value }),
}));

export default SingleReviewStore;
