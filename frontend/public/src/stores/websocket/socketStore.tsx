import { CompatClient } from "@stomp/stompjs";
import { create } from "zustand";

interface WebSocketStore {
  clientObject: any;
  setClientObject: (client: any) => void;
  receiveMessage2: any;
  setReceiveMessage2: (receiveMessage: any) => void;
}

const socketStore = create<WebSocketStore>((set) => ({
  clientObject: null,
  setClientObject: (value) => set({ clientObject: value }),
  receiveMessage2: [],
  setReceiveMessage2: (value) => set({ receiveMessage2: value }),
}));

export default socketStore;
