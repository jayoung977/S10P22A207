import { CompatClient } from "@stomp/stompjs";
import { create } from "zustand";

interface WebSocketStore {
  clientObject: any;
  setClientObject: (client: any) => void;
  receiveMessages: any;
  setReceiveMessages: (receiveMessages: any) => void;
  receiveAlarm: any;
  setReceiveAlarm: (receiveAlarm: any) => void;
}

const socketStore = create<WebSocketStore>((set) => ({
  clientObject: null,
  setClientObject: (value) => set({ clientObject: value }),
  receiveMessages: [],
  setReceiveMessages: (value) => set({ receiveMessages: value }),
  receiveAlarm: false,
  setReceiveAlarm: (value) => set({ receiveAlarm: value }),
}));

export default socketStore;
