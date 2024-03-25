import { create } from "zustand";

type Store = {
  toggleTab: string;
  setToggleTab: (value: string) => void;
  searchFriend: string;
  setSearchFriend: (value: string) => void;
}

export interface MultiRoom {
  title: string,
  isopened: boolean
  members: number
}

export interface MultiRoomInfo {
  result: MultiRoom[]
}

const multigameStore = create<Store>((set: any) => ({
  toggleTab: 'all',
  setToggleTab: (value) => set({toggleTab: value}),
  searchFriend: '',
  setSearchFriend: (value) => set({searchFriend: value}),
}));

export default multigameStore;