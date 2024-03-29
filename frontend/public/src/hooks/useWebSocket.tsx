// useWebSocket.ts
import { useEffect, useRef } from "react";
import { CompatClient, Stomp } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import { useParams } from "next/navigation";
import multigameStore from "../stores/multi/MultiGameStore";
import Swal from "sweetalert2";
import socketStore from "../stores/websocket/socketStore";

export const useWebSocket = () => {
  const params = useParams<{ room_id: string }>();
  const client = useRef<CompatClient>({} as CompatClient);
  const room_id: string = params.room_id;
  const { sendMessage, setSendMessage, receiveMessage, setReceiveMessage } =
    multigameStore();
  const { setClientObject, clientObject } = socketStore();

  useEffect(() => {
    client.current = Stomp.over(() => {
      const sock = new SockJS("https://j10a207.p.ssafy.io/ws");
      return sock;
    });
    Swal.fire("웹소켓 연결 됨");
    setClientObject(client);
    return () => {
      if (client.current) {
        client.current.disconnect();
        Swal.fire("웹소켓 연결 안됨");
      }
    };
  }, []);
};
