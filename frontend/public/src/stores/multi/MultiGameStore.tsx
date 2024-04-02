import { create } from "zustand";

type Store = {
  toggleTab: string;
  setToggleTab: (value: string) => void;
  searchFriend: string;
  setSearchFriend: (value: string) => void;
  receiveMessage: any;
  setReceiveMessage: (value: any) => void;
  sendMessage: string;
  setSendMessage: (value: string) => void;
  lobbyModal: boolean;
  setLobbyModal: (value: boolean) => void;
  userId: number;
  setUserId: (value: number) => void;
  pageNumber: number;
  setPageNumber: (value: number) => void;
  isWaiting: boolean;
  setIsWaiting: (value: boolean) => void;
};

export interface MultiGameRoomInfoList {
  roomId: number;
  roomTitle: string;
  roundNumber: number;
  participantsIds: number[];
  isOpen: boolean;
  password: number;
}

export interface ResultType {
  multiWaitRoomInfoList: MultiGameRoomInfoList[];
  multiGameRoomInfoList: MultiGameRoomInfoList[];
  totalGameRoomCounts: number;
  totalWaitRoomCounts: number;
}
export interface MultiRoomInfo {
  result: ResultType;
}

const multigameStore = create<Store>((set: any) => ({
  toggleTab: "all",
  setToggleTab: (value) => set({ toggleTab: value }),
  searchFriend: "",
  setSearchFriend: (value) => set({ searchFriend: value }),
  receiveMessage: [],
  setReceiveMessage: (value) => set({ receiveMessage: value }),
  sendMessage: "",
  setSendMessage: (value) => set({ sendMessage: value }),
  lobbyModal: false,
  setLobbyModal: (value) => set({ lobbyModal: value }),
  userId: 0,
  setUserId: (value) => set({ userId: value }),
  pageNumber: 1,
  setPageNumber: (value) => set({ pageNumber: value }),
  isWaiting: false,
  setIsWaiting: (value) => set({ isWaiting: value }),
}));

export default multigameStore;
