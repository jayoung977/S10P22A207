import { create } from "zustand";

type Store = {
  toggleButton: string;
  setToggleButton: (value: string) => void;
};

const profileStore = create<Store>((set: any) => ({
  toggleButton: "single",
  setToggleButton: (value) => set({ toggleButton: value }),
}));

export default profileStore;
