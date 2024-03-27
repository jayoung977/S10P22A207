// useWebSocket.ts
import { useEffect, useRef } from "react";
import { CompatClient, Stomp } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import { useParams } from "next/navigation";
import multigameStore from "../stores/multi/MultiGameStore";
import Swal from "sweetalert2";

export const useWebSocket = () => {
  const params = useParams<{ room_id: string }>();
  const client = useRef<CompatClient>({} as CompatClient);
  const room_id: string = params.room_id;
  const { sendMessage, setSendMessage, receiveMessage, setReceiveMessage } =
    multigameStore();

  useEffect(() => {
    client.current = Stomp.over(() => {
      const sock = new SockJS("https://j10a207.p.ssafy.io/ws");
      return sock;
    });

    client.current.connect({}, () => {
      // console.log("웹소켓 연결됨");
      client.current.subscribe(`/api/sub/${room_id}`, (message) => {
        const parsedMessage = JSON.parse(message.body);
        const copy = [...receiveMessage];
        copy.push(parsedMessage);
        setReceiveMessage(copy);
        console.log(receiveMessage);
      });
    });

    return () => {
      if (client.current) {
        client.current.disconnect();
        // Swal.fire("웹소켓 연결안됨");
      }
    };
  }, [receiveMessage]);

  const sendHandler = (nickname: any) => {
    client.current.send(
      `/api/pub/websocket/message`,
      {},
      JSON.stringify({
        type: "MESSAGE",
        roomId: room_id,
        sender: nickname,
        message: sendMessage,
      })
    );
    setSendMessage("");
  };

  return { sendHandler };
};
