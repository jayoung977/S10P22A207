import { CompatClient } from "@stomp/stompjs";
import { create } from "zustand";

export interface ParticipantsType {
  memberId: number;
  nickname: string;
  gameRoi: number;
  rankPoint: number;
  win: number;
  lose: number;
  asset: number;
  currentRank: number;
}

interface MultiGameStockIdsType {
  firstDayStockChartId: number;
  stockId: number;
}

interface WebSocketStore {
  clientObject: any;
  setClientObject: (client: any) => void;
  receiveMessages: any;
  setReceiveMessages: (receiveMessages: any) => void;
  addReceiveMessages: (receiveMessages: any) => void;
  deleteReceiveMessages: () => void;
  receiveAlarm: any;
  setReceiveAlarm: (receiveAlarm: any) => void;
  roomInfo: any;
  setRoomInfo: (roomInfo: any) => void;
  hostId: number;
  setHostId: (hostId: number) => void;
  participants: ParticipantsType[];
  setParticipants: (participants: ParticipantsType[]) => void;
  roomId: number;
  setRoomId: (roomId: number) => void;
  roomTitle: string;
  setRoomTitle: (roomTitle: string) => void;
  readyState: { [key: number]: boolean };
  setReadyState: (readyState: { [key: number]: boolean }) => void;
  maxRoundNumber: number,
  setMaxRoundNumber: (maxRoundNumber: number) => void;
  gameId: number,
  setGameId: (gameId: number) => void;
  roundNumber:number,
  setRoundNumber: (roundNumber: number) => void;
  multiGameStockIds: MultiGameStockIdsType[],
  setMultiGameStockIds: (multiGameStockIds: MultiGameStockIdsType[]) => void;
  day: number,
  setDay: (day: number) => void;
}

const socketStore = create<WebSocketStore>((set) => ({
  clientObject: null,
  setClientObject: (value) => set({ clientObject: value }),
  receiveMessages: [],
  setReceiveMessages: (value) => set({ receiveMessages: value }),
  addReceiveMessages: (value: any) =>
    set((state) => ({
      receiveMessages: [...state.receiveMessages, value],
    })),
  deleteReceiveMessages: () =>
    set((state) => ({
      receiveMessages: [],
    })),
  receiveAlarm: false,
  setReceiveAlarm: (value) => set({ receiveAlarm: value }),
  roomInfo: [],
  setRoomInfo: (value) => set({ roomInfo: value }),
  hostId: 0,
  setHostId: (value) => set({ hostId: value }),
  participants: [],
  setParticipants: (value) => set({ participants: value }),
  roomId: 0,
  setRoomId: (value) => set({ roomId: value }),
  roomTitle: "",
  setRoomTitle: (value) => set({ roomTitle: value }),
  readyState: {},
  setReadyState: (value) => set({ readyState: value }),
  maxRoundNumber: 0,
  setMaxRoundNumber: (value) => set({ maxRoundNumber: value }),
  gameId: 0,
  setGameId: (value) => set({ gameId: value }),
  roundNumber:1,
  setRoundNumber:(value) => set({ roundNumber: value }),
  day: 1,
  setDay:(value) => set({ day: value }),
  multiGameStockIds: [],
  setMultiGameStockIds:(value) => set({ multiGameStockIds: value }),
  // ---buy
  // cash: 0, 
  // cash:(value) => set({ day: value }),
  // price: 0,
  // price:(value) => set({ price: value }),
  // amount: 0,
  // amount:(value) => set({ amount: value }),
  // fee: 0, 
  // fee:(value) => set({ fee: value }),
  // profit: 0,
  // profit:(value) => set({ profit: value }),
  // totalAsset: 10000000,
  // totalAsset:(value) => set({ totalAsset: value }),
  // tradeList: [],
  // tradeList:(value) => set({ tradeList: value }),

  // nextDay
  // initialAsset: 0,
  // setInitialAsset: (value) => set({ initialAsset: value }),
  // totalAsset: 0,
  // setTotalAsset: (value) => set({ totalAsset: value }),
  // profitMargin: 0,
  // setProfitMargin: (value) => set({ profitMargin: value }),
  // unrealizedGain: 0,
  // setUnrealizedGain:(value) => set({ unrealizedGain: value }),
  // cash: 0,
  // setCash:(value) => set({ cash: value }),
  // stockAmount: 0,
  // setStockAmount:(value) => set({ stockAmount: value }),
  // shortStockAmount: 0,
  // setShortStockAmount:(value) => set({ shortStockAmount: value }),
  // totalPurchaseAmount: 0,
  // setTotalPurchaseAmount:(value) => set({ totalPurchaseAmount: value }),
  // averagePrice: 0,
  // setAveragePrice:(value) => set({ averagePrice: value }),
  // shortAveragePrice: 0,
  // setShortAveragePrice:(value) => set({ shortAveragePrice: value }),
  // todayEndPrice: 0,
  // setTodayEndPrice:(value) => set({ todayEndPrice: value }),
  // stockValue: 0,
  // setStockValue:(value) => set({ stockValue: value }),

}));

export default socketStore;
