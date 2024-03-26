import { create } from "zustand";

type Store = {
  memberId: number | null;
  setMemberId: (value: number | null) => void;
  email: string | null;
  setEmail: (value: string | null) => void;
  nickname: string | null;
  setNickname: (value: string | null) => void;
  birthYear: number | null;
  setBirthYear: (value: number | null) => void;
  gender: string | null;
  setGender: (value: string | null) => void;
  asset: number | null;
  setAsset: (value: number | null) => void;
  rankPoint: number | null;
  setRankPoint: (value: number | null) => void;
  win: number | null;
  setWin: (value: number | null) => void;
  lose: number | null;
  setLose: (value: number | null) => void;
  singleAvgRoi: number | null;
  setSingleAvgRoi: (value: number | null) => void;
  multiAvgRoi: number | null;
  setMultiAvgRoi: (value: number | null) => void;
};

const userStore = create<Store>((set: any) => ({
  memberId: null,
  setMemberId: (value) => set({ memberId: value }),
  email: null,
  setEmail: (value) => set({ email: value }),
  nickname: "null",
  setNickname: (value) => set({ nickname: value }),
  birthYear: null,
  setBirthYear: (value) => set({ birthYear: value }),
  gender: null,
  setGender: (value) => set({ gender: value }),
  asset: null,
  setAsset: (value) => set({ asset: value }),
  rankPoint: null,
  setRankPoint: (value) => set({ rankPoint: value }),
  win: null,
  setWin: (value) => set({ win: value }),
  lose: null,
  setLose: (value) => set({ lose: value }),
  singleAvgRoi: null,
  setSingleAvgRoi: (value) => set({ singleAvgRoi: value }),
  multiAvgRoi: null,
  setMultiAvgRoi: (value) => set({ multiAvgRoi: value }),
}));

export default userStore;
