// useWebSocket.ts
import { useEffect, useRef, useState } from "react";
import { CompatClient, Stomp } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import Swal from "sweetalert2";
import userStore from "../stores/user/userStore";
import socketStore from "../stores/websocket/socketStore";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
export const useWebSocket = () => {
  const params = useParams();
  const client = useRef<CompatClient>({} as CompatClient);
  const { setClientObject, clientObject } = socketStore();
  const { memberId, nickname } = userStore();
  const [receiveMessage, setReceiveMessage] = useState<any>([]);
  const [receiveInvitation, setReceiveInvitation] = useState<any>([]);
  const {
    receiveMessages,
    setReceiveMessages,
    addReceiveMessages,
    deleteReceiveMessages,
    setMaxRoundNumber,
    setRoundNumber,
    setGameId,
    setMultiGameStockIds,
    setDay,
  } = socketStore();

  const { receiveAlarm, setReceiveAlarm, roomInfo, setRoomInfo } =
    socketStore();
  const {
    setHostId,
    setParticipants,
    setRoomId,
    setRoomTitle,
    setReadyState,
    setPlayers,
    setMultiGameLogId,
    setIsGameOver,
  } = socketStore();
  const router = useRouter();
  const fetchAlarmData = async () => {
    try {
      const response = await axios({
        method: "get",
        url: "https://j10a207.p.ssafy.io/api/alarm/unread-notification-count",
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
        },
      });

      // 요청이 성공적으로 완료되면 여기에서 응답을 처리합니다.
      if (Number(response.data.result) > 0) {
        setReceiveAlarm(true);
      }
    } catch (error) {
      // 요청이 실패하면 오류를 처리합니다.
      console.error(error);
      // 오류에 따른 추가적인 처리를 할 수 있습니다.
    }
  };

  useEffect(() => {
    if (memberId) {
      fetchAlarmData();
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
          // Swal.fire(`${parsedMessage.type} 신호 감지!`);
          if (parsedMessage.type === "MESSAGE") {
            addReceiveMessages(parsedMessage);
          }

          if (parsedMessage.type === "EXIT") {
            console.log(parsedMessage);
          }

          if (parsedMessage.type === "ROOMINFO") {
            setHostId(parsedMessage.result.hostId);
            setParticipants(parsedMessage.result.participants);
            setRoomId(parsedMessage.result.roomId);
            setRoomTitle(parsedMessage.result.roomTitle);
            setReadyState(parsedMessage.result.readyState);
            setMaxRoundNumber(parsedMessage.result.maxRoundNumber);
          }

          if (parsedMessage.type === "INVITE") {
            Swal.fire({
              title: "친구 초대",
              text: `${parsedMessage.result.inviterNickname}님이 초대하셨습니다.`,
              icon: "info",
              showCancelButton: true,
              confirmButtonColor: "#3085d6",
              cancelButtonColor: "#d33",
              confirmButtonText: "네",
              cancelButtonText: "아니오",
            }).then((result) => {
              if (result.isConfirmed) {
                Swal.fire({
                  icon: "success",
                });
                axios({
                  url: `https://j10a207.p.ssafy.io/api/multi/${parsedMessage.result.roomId}`,
                  method: "get",
                  headers: {
                    Authorization: `Bearer ${sessionStorage.getItem(
                      "accessToken"
                    )}`,
                  },
                });
                router.push(`/multi/room/${parsedMessage.result.roomId}`);
              }
            });
          }

          if (parsedMessage.type === "FRIENDASK") {
            setReceiveAlarm(true);
          }

          if (parsedMessage.type === "KICKED") {
            router.push(`/multi`);
          }

          if (parsedMessage.type === "START") {
            setGameId(parsedMessage.result.gameId);
            setMultiGameStockIds(parsedMessage.result.multiGameStockIds);
            setRoomId(parsedMessage.result.roomId);
            setDay(1);
            router.push(
              `${parsedMessage.result.roomId}/play/${parsedMessage.result.gameId}`
            );
          }

          if (parsedMessage.type === "MULTIGAMEINFO") {
            setPlayers(parsedMessage.result);
          }

          if (parsedMessage.type === "MULTIRESULT") {
            setIsGameOver(true);
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
