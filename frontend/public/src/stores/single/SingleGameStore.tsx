import { create } from "zustand";


// 1. left side bar

// 총 평가 자산
type totalAssetDataType = {
    totalAssessedAssets: number,    // 총 평가 자산
    cashOnHand: number,             // 보유 현금
    totalValuationdPL: number,      // 총 평가 손익
    totalPurchaseAmount: number,    // 총 매입 금액
    totalAssessedAmount: number,    // 총 평가 금액
}

// 보유 자산
type assetHeldDataType = {
    stock: string,              // 종목명 
    valuationPL: number,        // 평가 손익 
    availableForSale: number,   // 매도가능(해당 종목 보유 수)
    profitMargin: number,       // 손익률
    averagePrice: number,       // 평균 단가   
}
// 매매 내역
type saleHistoryDataType = {
    stock: string,          // 종목명
    saleType: string,       // 매매 유형
    price: number,          // 가격
    quantity: number,       // 수량
}

// 2. main

// 종목별 일별 주식 데이터
type stockDataType = {
    date: string,   // 날짜(YYYY-MM-DD)
    open: number,   // 시가
    high: number,   // 고가
    low: number,    // 저가
    close: number,  // 종가
    volume: number, // 거래량
}
// 종목별 주식 데이터
type stockListDataType = stockDataType[];

// 증가 데이터
type stockMarketType = {
    date: string,   // 날짜(YYYY-MM-DD)
    kospi: number,  // 코스피
    kosdaq: number, // 코스닥
    nasdaq: number, // 나스닥
    SSEC: number,   // 상해 증시
}

// 3. right side bar

// 현재 턴
type turnType = number;

// 매수|매도 모달창
type isOpenSaleModalType = boolean;
// 싱글 게임 끝 모달창
type isOpenEndModalType = boolean;


// 트렌드
type trendType = string;
// 날짜별 트렌드 
type dateTrendType = {
    date: string,
    trendList: trendType[],
}

// 시장 정보
type marketInfoType = {
    name: string,           // 이름
    price: number,          // 가격
}

type dateMarketInfoType = {
    date: string,
    marketInfo: marketInfoType[];
}

type Store = {
    // 총 평가 자산 상태관리 변수
    totalAssetData :totalAssetDataType | null;
    setTotalAssetData :(value :totalAssetDataType) => void;
    
    // 보유 자산 상태관리 변수
    assetHeldListData :assetHeldDataType[] | [];
    setAssetHeldListData :(value :assetHeldDataType[]) => void;

    // 매매 내역 상태관리 변수
    saleHistoryListData :saleHistoryDataType[] | [];
    setSaleHistoryListData :(value :saleHistoryDataType[]) => void;

    // 10개의 랜덤 종목 주식 데이터 상태관리 변수
    randomStockListData :stockListDataType[] | [];
    setRandomStockListData :(value :stockListDataType[]) => void;

    // 날짜별 증가 상태관리 변수
    stockMarketListData :stockMarketType[] | [];
    setStockMarketListData :(value :stockMarketType[]) => void;

    // 현재 턴 상태관리 변수
    turn :number;
    setTurn :(value :number) => void;

    isOpenSaleModal :isOpenSaleModalType;
    setIsOpenSaleModal :(value :isOpenSaleModalType) => void;

    isOpenEndModal :isOpenEndModalType;
    setIsOpenEndModal :(value :isOpenEndModalType) => void;

    // 트렌드 목록 상태관리 변수
    trendList :dateTrendType[] | [];
    setTrendList :(value :dateTrendType[]) => void;

    // 시장 정보 상태관리 변수
    marketInfoList :dateMarketInfoType[] | [];
    setMarketInfoList :(value :dateMarketInfoType[]) => void;

};


const SingleGameStore = create<Store>((set: any) => ({
    // 총 평가 자산 상태관리 변수
    totalAssetData: null,
    setTotalAssetData: (value) => set({ totalAssetData: value }),
    
    // 보유 자산 상태관리 변수
    assetHeldListData: [],
    setAssetHeldListData: (value) => set({ assetHeldListData: value }),

    // 매매 내역 상태관리 변수
    saleHistoryListData: [],
    setSaleHistoryListData: (value) => set({ saleHistoryListData: value }),

    // 10개의 랜덤 종목 주식 데이터 상태관리 변수
    randomStockListData: [],
    setRandomStockListData: (value :any) => set({ randomStockListData: value }),

    // 날짜별 증가 상태관리 변수
    stockMarketListData: [],
    setStockMarketListData: (value) => set({ stockMarketListData: value }),

    // 현재 턴 상태관리 변수
    turn: 1,
    setTurn: (value) => set({ turn: value }),
    
    isOpenSaleModal: false,
    setIsOpenSaleModal: (value) => set({ isOpenSaleModal: value }),

    isOpenEndModal: false,
    setIsOpenEndModal: (value) => set({ isOpenEndModal: value }),
    // 트렌드 목록 상태관리 변수
    trendList: [],
    setTrendList: (value) => set({ trendList: value }),

    // 시장 정보 상태관리 변수
    marketInfoList: [],
    setMarketInfoList: (value) => set({ marketInfoList: value }),
 
}));

export default SingleGameStore;

