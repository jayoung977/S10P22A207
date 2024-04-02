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
    stockCode :string,
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

type minMaxDateType = {
    date :string,
    value :number,
    stockCode :string,
}


type Store = {
    selectedIndex :number,
    setSelectedIndex :(value :number | any) => void,

    rankMemberList :rankMemberListType | any,
    setRankMemberList :(value :rankMemberListType | any) => void,

    stockChartDataList :any,
    setStockChartDataList :(value :any) => void,
    
    stockInfoDtoList :stockInfoDtoListType | any,
    setStockInfoDtoList :(value :stockInfoDtoListType | any) => void,

    tradeList :tradeListType | any,
    setTradeList :(value :tradeListType | any) => void,

    // 시작 날짜
    startDate :string,
    setStartDate :(value :string) => void,
    // 끝 날짜
    endDate :string,
    setEndDate :(value :string) => void,

    // 등락 count
    positiveCount :number,
    setPositiveCount :(value :number) => void,

    negativeCount :number,
    setNegativeCount :(value :number) => void,

    // 최대 최소 price count
    maxPrice :number,
    setMaxPrice :(value :number) => void,

    minPrice :number,
    setMinPrice :(value :number) => void,

    // startDate ~ endDate
    minPriceDate :minMaxDateType[] | any,
    setMinPriceDate :(value :minMaxDateType[]) => void;

    maxPriceDate :minMaxDateType[] | any,
    setMaxPriceDate :(value :minMaxDateType[]) => void;
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

    startDate : "",
    setStartDate :(value) => set({ startDate : value }),

    endDate : "",
    setEndDate :(value) => set({ endDate : value }),

    positiveCount :0,
    setPositiveCount :(value) => set({ positiveCount : value }),

    negativeCount :0,
    setNegativeCount :(value) => set({ negativeCount : value }),

    maxPrice :0,
    setMaxPrice :(value) => set({ maxPrice : value }),

    minPrice :0,
    setMinPrice :(value) => set({ minPrice : value }),

    minPriceDate :[],
    setMinPriceDate :(value) => set({ minPriceDate : value }),

    maxPriceDate :[],
    setMaxPriceDate :(value) => set({ maxPriceDate : value }),

}));

export default SingleReviewStore;
