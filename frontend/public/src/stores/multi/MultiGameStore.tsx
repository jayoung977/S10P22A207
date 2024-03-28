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
};

export interface MultiRoom {
  roomNumber: number;
  roundNumber: number;
  participantsIds: number[];
}

export interface MultiRoomInfo {
  result: MultiRoom[];
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
  setUserId: (value) => set({ userId: value}),
  pageNumber: 1,
  setPageNumber: (value) => set({pageNumber: value}),
}));

export default multigameStore;
