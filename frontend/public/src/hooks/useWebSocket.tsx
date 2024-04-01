// useWebSocket.ts
import { useEffect, useRef, useState } from "react";
import { CompatClient, Stomp } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import Swal from "sweetalert2";
import userStore from "../stores/user/userStore";
import socketStore from "../stores/websocket/socketStore";

export const useWebSocket = () => {
  const client = useRef<CompatClient>({} as CompatClient);
  const { setClientObject, clientObject } = socketStore();
  const { memberId, nickname } = userStore();
  const [receiveMessage, setReceiveMessage] = useState<any>([]);
  const [receiveInvitation, setReceiveInvitation] = useState<any>([]);
  const { receiveMessages, setReceiveMessages } = socketStore();
  const { receiveAlarm, setReceiveAlarm } = socketStore();
  useEffect(() => {
    if (memberId) {
      client.current = Stomp.over(() => {
        const sock = new SockJS("https://j10a207.p.ssafy.io/ws");
        return sock;
      });
      Swal.fire(`${nickname}님 환영합니다.`);
      setClientObject(client);

      client.current.connect({}, () => {
        client.current.subscribe(`/api/sub/${memberId}`, (message: any) => {
          const parsedMessage = JSON.parse(message.body);
          console.log(parsedMessage);
          Swal.fire(`${parsedMessage.type} 신호 감지!`);
          if (parsedMessage.type === "MESSAGE") {
            setReceiveMessage((prevReceiveMessage: any) => {
              const copy = [...prevReceiveMessage, parsedMessage];
              setReceiveMessages(copy);
              return copy;
            });
          }
          if (parsedMessage.type === "INVITE") {
            setReceiveAlarm(true);
          }
        });
      });
      return () => {
        if (client.current) {
          client.current.disconnect();
          Swal.fire("서버와의 연결이 끊어졌습니다.");
        }
      };
    }
  }, [memberId]);
};
