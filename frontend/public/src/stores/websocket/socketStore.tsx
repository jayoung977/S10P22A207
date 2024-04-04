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

interface TradeListType {
  amount: number;
  day: number;
  price: number;
  profit: number;
  round: number;
  stockId: number;
  tradeType: String;
}

interface PlayersType {
  nickName: string;
  day: number;
  rank: number;
  totalAsset: number;
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
  maxRoundNumber: number;
  setMaxRoundNumber: (maxRoundNumber: number) => void;
  gameId: number;
  setGameId: (gameId: number) => void;
  roundNumber: number;
  setRoundNumber: (roundNumber: number) => void;
  multiGameStockIds: MultiGameStockIdsType[];
  setMultiGameStockIds: (multiGameStockIds: MultiGameStockIdsType[]) => void;
  multiGameLogId: number;
  setMultiGameLogId: (multiGameLogId: number) => void;
  day: number;
  setDay: (day: number) => void;
  averagePrice: number;
  setAveragePrice: (averagePrice: number) => void;
  cash: number;
  setCash: (cash: number) => void;
  initialAsset: number;
  setInitialAsset: (initialAsset: number) => void;
  profitMargin: number;
  setProfitMargin: (profitMargin: number) => void;
  shortAveragePrice: number;
  setShortAveragePrice: (shortAveragePrice: number) => void;
  shortStockAmount: number;
  setShortStockAmount: (shortStockAmount: number) => void;
  stockAmount: number;
  setStockAmount: (stockAmount: number) => void;
  stockValue: number;
  setStockValue: (stockValue: number) => void;
  todayEndPrice: number;
  setTodayEndPrice: (todayEndPrice: number) => void;
  totalAsset: number;
  setTotalAsset: (totalAsset: number) => void;
  totalPurchaseAmount: number;
  setTotalPurchaseAmount: (totalPurchaseAmount: number) => void;
  tradeList: TradeListType[];
  setTradeList: (tradeList: TradeListType[]) => void;
  unrealizedGain: number;
  setUnrealizedGain: (unrealizedGain: number) => void;
  players: PlayersType[];
  setPlayers: (players: PlayersType[]) => void;
  isGameOver: boolean;
  setIsGameOver: (isGameOver: boolean) => void;
  resultNumberCount: number;
  setResultNumberCount: (resultNumberCount: number) => void;
  incrementresultNumberCount: () => void;
  sortPlayersByTotalAsset: () => void;
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
  roundNumber: 1,
  setRoundNumber: (value) => set({ roundNumber: value }),
  day: 1,
  setDay: (value) => set({ day: value }),
  multiGameStockIds: [],
  setMultiGameStockIds: (value) => set({ multiGameStockIds: value }),
  averagePrice: 0,
  setAveragePrice: (value) => set({ averagePrice: value }),
  cash: 10000000,
  setCash: (value) => set({ cash: value }),
  initialAsset: 10000000,
  setInitialAsset: (value) => set({ initialAsset: value }),
  profitMargin: 0,
  setProfitMargin: (value) => set({ profitMargin: value }),
  shortAveragePrice: 0,
  setShortAveragePrice: (value) => set({ shortAveragePrice: value }),
  shortStockAmount: 0,
  setShortStockAmount: (value) => set({ shortStockAmount: value }),
  stockAmount: 0,
  setStockAmount: (value) => set({ stockAmount: value }),
  stockValue: 0,
  setStockValue: (value) => set({ stockValue: value }),
  todayEndPrice: 0,
  setTodayEndPrice: (value) => set({ todayEndPrice: value }),
  totalAsset: 10000000,
  setTotalAsset: (value) => set({ totalAsset: value }),
  totalPurchaseAmount: 0,
  setTotalPurchaseAmount: (value) => set({ totalPurchaseAmount: value }),
  tradeList: [],
  setTradeList: (value) => set({ tradeList: value }),
  unrealizedGain: 0,
  setUnrealizedGain: (value) => set({ unrealizedGain: value }),
  players: [],
  setPlayers: (value) => set({ players: value }),
  sortPlayersByTotalAsset: () =>
    set((state) => ({
      players: [...state.players].sort((a, b) => b.totalAsset - a.totalAsset),
    })),
  multiGameLogId: 0,
  setMultiGameLogId: (value) => set({ multiGameLogId: value }),
  isGameOver: false,
  setIsGameOver: (value) => set({ isGameOver: value }),
  resultNumberCount: 0,
  setResultNumberCount: (value) => set({ resultNumberCount: value }),
  incrementresultNumberCount: () =>
    set((state) => ({ resultNumberCount: state.resultNumberCount + 1 })),
}));

export default socketStore;
