import { create } from "zustand";

// 내 매매기록
type multiLogTradeDtoType = {
    date :string,
    tradeType :string,
    amount :number,
    price :number,
}

// 타 사용자 정보
type multiLogMemberDtoType = {
    memberId :number,
    nickname :string,
    roi :number,
    rankPoint :number,
    multiLogTradeDtoList :multiLogTradeDtoType[],
}

type multiLogMemberDtoListType = multiLogMemberDtoType[]

type stockChartDtoType = {
    date :string,
    marketPrice :number,
    highPrice :number,
    lowPrice :number,
    endPrice :number,
    tradingVolume :number
}
type stockChartDtoListType = stockChartDtoType[];

type Store = {
    stockName :string,
    setStockName :(value :string) => void,

    // 해당 차트의 주식 정보
    stockChartDtoList :any,
    setStockChartDtoList :(value :any) => void,

    // 게임 참가 유저 정보
    multiLogMemberDtoList :any,
    setMultiLogMemberDtoList :(value :any) => void,

    // 토글로 보여줄 매매 기록들
    selectedTradeList :any,
    setSelectedTradeList :(value :any) => void, 
    // memberId, nickname, date, price, amount
};

const MultiReviewStore = create<Store>((set: any) => ({

    stockName: '',
    setStockName: (value) => set({ stockName : value }),

    stockChartDtoList: [],
    setStockChartDtoList: (value) => set({ stockChartDtoList : value }),
    
    multiLogMemberDtoList: [],
    setMultiLogMemberDtoList: (value) => set({ multiLogMemberDtoList : value }),

    selectedTradeList: [],
    setSelectedTradeList :(value) => set({ selectedTradeList : value }),
}));

export default MultiReviewStore;
