// useWebSocket.ts
import { useEffect, useRef, useState } from "react";
import { CompatClient, Stomp } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import { useParams } from "next/navigation";
import multigameStore from "../stores/multi/MultiGameStore";
import Swal from "sweetalert2";

export const useWebSocket = () => {
  const params = useParams<{ room_id: string }>();
  const client = useRef<CompatClient>({} as CompatClient);
  const room_id: string = params.room_id;
  const { setReceiveMessage, sendMessage, setSendMessage } = multigameStore();

  useEffect(() => {
    client.current = Stomp.over(() => {
      const sock = new SockJS("https://j10a207.p.ssafy.io/ws");
      return sock;
    });

    client.current.connect({}, () => {
      console.log("웹소켓 연결됨");
      client.current.subscribe(`/api/sub/${room_id}`, (message) => {
        const parsedMessage = JSON.parse(message.body);
        setReceiveMessage((prevMessages: any) => [
          ...prevMessages,
          parsedMessage,
        ]);
      });
    });

    return () => {
      if (client.current) {
        client.current.disconnect();
        Swal.fire("웹소켓 연결안됨");
      }
    };
  }, []);

  const sendHandler = (nickname: any) => {
    client.current.send(
      `/api/pub/websocket/message`,
      {},
      JSON.stringify({
        type: "MESSAGE",
        dmRoomId: room_id,
        sender: nickname,
        message: sendMessage,
      })
    );
    setSendMessage("");
  };

  return { sendHandler };
};
