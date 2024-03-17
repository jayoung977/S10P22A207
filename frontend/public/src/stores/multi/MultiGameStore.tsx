import { create } from "zustand";

type Store = {
  toggleTab: string;
  setToggleTab: (value: string) => void;
}

const multigameStore = create<Store>((set: any) => ({
  toggleTab: 'all',
  setToggleTab: (value) => 
  set({toggleTab: value})
}));

export default multigameStore;