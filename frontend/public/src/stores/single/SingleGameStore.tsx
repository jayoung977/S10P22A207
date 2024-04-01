import { create } from "zustand";

// 총 평가 자산
type totalAssetDataType = {
    cash :number,
    resultProfit :number,
    resultRoi :number,
    totalPurchaseAmount :number,
    totalAsset :number,
};

// 보유자산
type assetDataType = {
    stockId :number,
    stockAmount :number,
    unrealizedProfit :number,
    averagePurchasePrice :number,
    profitMargin :any,
}
type assetListDataType = assetDataType[];

// 매매기록
type tradeDataType = {
    stockId :number,
    day :number;
    tradeType :string,
    amount :number,
    price :number,
    profit :number,
}
type tradeListDataType = tradeDataType[];

// 종목별 데이터
type stockChartType = {
    date :string,
    marketPrice :number,
    highPrice :number,
    lowPrice :number,
    endPrice :number,
    tradingVolume :number,
}
type stockDataType = {
    stockId :number,
    stockChartList :stockChartType[];
}
type stockListDataType = stockDataType[];

// 증시
type stockMarketDataType = {

}
type stockMarketListDataType = stockMarketDataType[];

// 오늘 종목별 현황
type todayStockInfoDataType = {
    stockId :number,
    TodayEndPrice :number,
    profitMargin :number,
    volatility :number,
    stockAmount :number,
    unrealizedGain :number,
};

type todayStockInfoListDataType = todayStockInfoDataType[];

// 트렌드
type trendDataType = {

}
type trendListDataType = trendDataType[];

// 시장 정보
type marketInfoDataType = {

}
type marketInfoListDataType = marketInfoDataType[];

// 게임 종료 시 데이터
// 실제 주식 종목
type stockInfoDtoDataType = {
    stockId :number,
    stockName :string,
};
type stockInfoDtoListDataType = stockInfoDtoDataType[];

type singleGameEndInfoDataType = {
    initialAsset :number,
    finalAsset :number,
    netProfit :number,
    profitMargin :number,

    startDate :string,
    endDate :string,

    stockInfoDtoList :stockInfoDtoListDataType,
    singleGameChance :number,
}


type Store = {
    // 해당 게임 log id
    gameIdx :number;
    setGameIdx :(value :number) => void;

    // 현재 턴 상태관리 변수
    turn :number;
    setTurn :(value :number) => void;

    singleGameChance :number;
    setSingleGameChance :(value :number) => void;

    // 총 평가 자산 배열 데이터 상태관리 변수
    totalAssetData :totalAssetDataType | any;
    setTotalAssetData :(value :totalAssetDataType) => void;
    
    // 보유 자산 배열 데이터 상태관리 변수
    assetListData :assetListDataType | any;
    setAssetListData :(value :assetListDataType) => void;

    // 매매 내역 배열 데이터 상태관리 변수
    tradeListData :tradeListDataType | any;
    setTradeListData :(value :tradeListDataType) => void;

    // 10개의 랜덤 종목 주식 배열 데이터 상태관리 변수
    stockListData :stockListDataType | any;
    setStockListData :(value :stockListDataType) => void;

    // 증시 배열 데이터 상태관리 변수
    stockMarketListData :stockMarketListDataType | any;
    setStockMarketListData :(value :stockMarketListDataType) => void;

    todayStockInfoListData :todayStockInfoListDataType | any;
    setTodayStockInfoListData :(value :todayStockInfoListDataType) => void;

    // 트렌드 목록 배열 데이터 상태관리 변수
    trendListData :any;
    setTrendListData :(value :any) => void;

    // 시장 정보 배열 데이터 상태관리 변수
    marketInfoListData :any;
    setMarketInfoListData :(value :any) => void;

    // 현재 선택한 주식 종목 index 상태관리 변수
    selectedStockIndex :number;
    setSelectedStockIndex :(value :number) => void;

    isBuy :boolean;
    setIsBuy :(value :boolean) => void;
    
    isBuySellModalOpen :boolean;
    setIsBuySellModalOpen :(value :boolean) => void;
    
    singleGameEndInfoData :singleGameEndInfoDataType | any;
    setSingleGameEndInfoData :(value :singleGameEndInfoDataType) => void;
    
    isOpenEndModal :boolean;
    setIsOpenEndModal :(value :boolean) => void;

    selectedSecondaryIndicator :number;
    setSelectedSecondaryIndicator : (value :number) => void;

    startDate :any,
    setStartDate :(value :any) => void,
    endDate :any,
    setEndDate :(value :any) => void,

    stocks :number,
    setStocks :(value :number) => void,
};


const SingleGameStore = create<Store>((set: any) => ({

    // 해당 게임 log id
    gameIdx: 0,
    setGameIdx: (value) => set({ gameIdx: value }),

    // 현재 턴 상태관리 변수
    turn: 1,
    setTurn: (value) => set({ turn : value }),

    // 현재 남은 싱글 게임 도전 기회 상태관리 변수
    singleGameChance: 0,
    setSingleGameChance: (value) => set({ singleGameChance : value }),
 
    // 총 평가 자산 배열 데이터 상태관리 변수
    totalAssetData: [],
    setTotalAssetData: (value) => set({ totalAssetData : value }),
    
    // 보유 자산 배열 데이터 상태관리 변수
    assetListData: [],
    setAssetListData: (value) => set({ assetListData : value }),

    // 매매 내역 배열 데이터 상태관리 변수
    tradeListData: [],
    setTradeListData: (value) => set({ tradeListData : value }),

    // 10개의 랜덤 종목 주식 배열 데이터 상태관리 변수
    stockListData: [],
    setStockListData: (value) => set({ stockListData : value }),

    // 증시 배열 데이터 상태관리 변수
    stockMarketListData: [],
    setStockMarketListData: (value) => set({ stockMarketListData : value }),
    
    todayStockInfoListData: [],
    setTodayStockInfoListData :(value) => set({ todayStockInfoListData : value }),
    // 트렌드 목록 배열 데이터 상태관리 변수
    trendListData: [],
    setTrendListData: (value) => set({ trendListData : value }),

    // 시장 정보 배열 데이터 상태관리 변수
    marketInfoListData: [],
    setMarketInfoListData: (value) => set({ marketInfoListData : value }),

    // 현재 선택한 주식 종목 index 상태관리 변수
    selectedStockIndex: 0,
    setSelectedStockIndex: (value) => set({ selectedStockIndex : value }),

    singleGameEndInfoData: [],
    setSingleGameEndInfoData: (value) => set({ singleGameEndInfoData : value }),

    isBuy :false,
    setIsBuy :(value) => set({ isBuy : value }),

    isBuySellModalOpen :false,
    setIsBuySellModalOpen :(value) => set({ isBuySellModalOpen : value }),

    isOpenEndModal :false,
    setIsOpenEndModal :(value) => set({ isOpenEndModal :value }),

    selectedSecondaryIndicator : 1,
    setSelectedSecondaryIndicator :(value) => set({ selectedSecondaryIndicator : value }),


    startDate :null,
    setStartDate :(value) => set({ startDate : value }),
    endDate :null,
    setEndDate :(value) => set({ endDate : value }),

    stocks :0,
    setStocks :(value) => set({ stocks : value }),
}));

export default SingleGameStore;

