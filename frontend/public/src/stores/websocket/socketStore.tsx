import { CompatClient } from "@stomp/stompjs";
import { create } from "zustand";

interface WebSocketStore {
  clientObject: any;
  setClientObject: (client: any) => void;
}

const socketStore = create<WebSocketStore>((set) => ({
  clientObject: null,
  setClientObject: (clientObject) => set({ clientObject }),
}));

export default socketStore;
