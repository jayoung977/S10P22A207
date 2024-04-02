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
  firstDayStockId: number;
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
  roomNumber:number,
  setRoomNumber: (roomNumber: number) => void;
  multiGameStockIds: MultiGameStockIdsType[],
  setMultiGameStockIds: (multiGameStockIds: MultiGameStockIdsType[]) => void;
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
  roomNumber:0,
  setRoomNumber:(value) => set({ roomNumber: value }),
  multiGameStockIds: [],
  setMultiGameStockIds:(value) => set({ multiGameStockIds: value }),
}));

export default socketStore;
