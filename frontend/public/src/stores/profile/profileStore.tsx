import { create } from "zustand";

type FriendRequestType = {
  memberId: number;
  nickname: string;
  assets: number;
  isLogin: boolean;
};
type Store = {
  toggleButton: string;
  setToggleButton: (value: string) => void;
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  friendRequests: FriendRequestType[];
  setFriendRequests: (value: any[]) => void;
};

const profileStore = create<Store>((set: any) => ({
  toggleButton: "single",
  setToggleButton: (value) => set({ toggleButton: value }),
  isOpen: false,
  setIsOpen: (value) => set({ isOpen: value }),
  friendRequests: [],
  setFriendRequests: (value) => set({ friendRequests: value }),
}));

export default profileStore;
