import { create } from "zustand";

type Store = {
  toggleButton: string;
  setToggleButton: (value: string) => void;
}

const fundCrudStore = create<Store>((set: any) => ({
  toggleButton: 'recruiting',
  setToggleButton: (value) => 
  set({toggleButton: value})
}));

export default fundCrudStore;