import { create } from "zustand";

type Store = {
  accessToken: string;
  setAccessToken: (value: string | null) => void;
};

const userStore = create<Store>((set: any) => ({
  accessToken:
    "eyJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJaaWdldW0iLCJleHAiOjE3MTEwMTEwODIsInN1YiI6Imdvd2drQG5hdmVyLmNvbSIsImlkIjo5LCJQcml2aWxlZ2UiOlsiVVNFUiJdfQ.sBKcnnkk9etigj0f0DaW3Pnm_XipMYEMBFz1ChZmwxw",
  setAccessToken: (value) => set({ accessToken: value }),
}));

export default userStore;
