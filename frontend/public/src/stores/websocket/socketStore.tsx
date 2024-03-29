import { CompatClient } from "@stomp/stompjs";
import { create } from "zustand";

interface WebSocketStore {
  clientObject: any;
  setClientObject: (client: any) => void;
  receiveMessage: any;
  setReceiveMessage: (receiveMessage: any) => void;
}

const socketStore = create<WebSocketStore>((set) => ({
  clientObject: null,
  setClientObject: (clientObject) => set({ clientObject }),
  receiveMessage: [],
  setReceiveMessage: (receiveMessage) => set({ receiveMessage }),
}));

export default socketStore;
