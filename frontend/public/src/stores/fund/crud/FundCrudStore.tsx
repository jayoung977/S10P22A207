import { create } from "zustand";

type Store = {
  toggleButton: string;
  setToggleButton: (value: string) => void;
}

export interface FundResult {
  fundId: number,
  fundName: string,
  managerNickname: string,
  industry: string,
  minimumAmount: number,
  targetAmount: number,
  fundAsset: number,
  participantCount: number,
  capacity: number,
  status: string,
  feeType: string,
  period: number,
  roi: number,
  startDate: string,
  endDate: string,
}

export interface FundStocks {
  stocksId: number,
  stockName: string,
  stockAmount: number,
  investmentAmount: number,
  roi: number
}

export interface FundTrades {
  fundTradeTd: number,
  fundId: number,
  stockName: string,
  tradeAmount: number,
  tradePrice: number,
  tradeType: string,
  tradeDate: string,
  roi: number,
  profit: number
}

export interface FundMembers {
  memberId: number,
  nickname: string,
  investmentAmount: number
}

export interface FundDetail {
  result: FundDetail
}

export interface FundInfo {
  result: FundResult[]
}

export interface FundDetail extends Omit<FundResult,'participantCount'> {
  fundMembers: FundMembers[],
  fundStocks: FundStocks[],
  fundTrades: FundTrades[],
}



const fundCrudStore = create<Store>((set: any) => ({
  toggleButton: 'recruiting',
  setToggleButton: (value) => 
  set({toggleButton: value})
}));

export default fundCrudStore;