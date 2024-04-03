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
    // 시작 날짜
    startDate :string, 
    setStartDate :(value :string) => void,
    
    // 시작 날짜
    endDate :string, 
    setEndDate :(value :string) => void,

    // 멀티 게임 종목 코드
    stockCode :string,
    setStockCode :(value :string) => void,
    
    // 해당 멀티 게임 종목 이름
    stockName :string,
    setStockName :(value :string) => void,

    // 해당 차트의 주식 정보
    stockChartDtoList :any,
    setStockChartDtoList :(value :any) => void,
    
    // 내 매매 기록
    multiLogTradeDtoList :any,
    setMultiLogTradeDtoList :(value :any) => void,

    // 타 게임 참가 유저 정보
    multiLogMemberDtoList :any,
    setMultiLogMemberDtoList :(value :any) => void,
    
    // 토글로 보여줄 매매 기록들
    selectedTradeList :any,
    setSelectedTradeList :(value :any) => void, 
};

const MultiReviewStore = create<Store>((set: any) => ({
    // 시작 날짜
    startDate :"", 
    setStartDate :(value) => set({ startDate : value }),
    
    // 시작 날짜
    endDate :"", 
    setEndDate :(value) => set({ endDate : value }),

    stockCode : '',
    setStockCode :(value) => set({ stockCode :value }),
    
    stockName: '',
    setStockName: (value) => set({ stockName : value }),

    stockChartDtoList: [],
    setStockChartDtoList: (value) => set({ stockChartDtoList : value }),

    multiLogTradeDtoList :[],
    setMultiLogTradeDtoList :(value) => set({ multiLogTradeDtoList : value }),
    
    multiLogMemberDtoList: [],
    setMultiLogMemberDtoList: (value) => set({ multiLogMemberDtoList : value }),

    selectedTradeList: [],
    setSelectedTradeList :(value) => set({ selectedTradeList : value }),
}));

export default MultiReviewStore;
// selectedTradeList에 담기는 형태
// 