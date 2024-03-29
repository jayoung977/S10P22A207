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
  const { memberId } = userStore();
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
      Swal.fire("웹소켓 연결 됨");
      setClientObject(client);

      client.current.connect({}, () => {
        console.log("소켓 연결했으니까 알고있어라");
        client.current.subscribe(`/api/sub/${memberId}`, (message: any) => {
          const parsedMessage = JSON.parse(message.body);
          console.log(parsedMessage);
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
          Swal.fire("웹소켓 연결 안됨");
        }
      };
    }
  }, [memberId]);
};
