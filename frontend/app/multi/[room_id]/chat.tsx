import useFetchUserInfo from "@/public/src/hooks/useFetchUserInfo";
import userStore from "@/public/src/stores/user/userStore";
import { CompatClient, Stomp } from "@stomp/stompjs";
import { useEffect, useRef, useState } from "react";
import SockJS from "sockjs-client";
import { useParams } from "next/navigation";

interface Message {
  sender: string;
  content: string;
}

export default function Chat() {
  useFetchUserInfo();
  const params = useParams<{ room_id: string }>();
  const room_id: string = params.room_id;
  const { nickname } = userStore();
  const [sendMessage, setSendMessage] = useState("");
  const [receiveMessage, setReceiveMessage] = useState([]);
  const client = useRef<CompatClient>({} as CompatClient);

  const messageHandler = (message: string) => {
    setSendMessage(message);
  };

  useEffect(() => {
    client.current = Stomp.over(() => {
      const sock = new SockJS("https://j10a207.p.ssafy.io/ws");
      return sock;
    });

    client.current.connect({}, () => {
      console.log("웹소켓 연결됨");
      client.current.subscribe(
        `/multi/${room_id}/chat/subscribe`,
        (message) => {
          const parsedMessage = JSON.parse(message.body);
          setReceiveMessage((prevMessages: Message[]): any => [
            ...prevMessages,
            parsedMessage,
          ]);
        }
      );
    });
  }, []);

  const sendHandler = () => {
    client.current.send(
      `/multi/${room_id}/chat/publish`,
      {},
      JSON.stringify({
        type: "chat",
        sender: nickname,
        content: sendMessage,
      })
    );
    setSendMessage("");
  };

  return (
    <div className="col-span-10 border relative">
      <div className="h-[calc(25vh)] overflow-auto gap p-2">
        {receiveMessage.map((item, i) => {
          return <div>{item}</div>;
        })}
      </div>
      <div className="mt-2 w-full border bg-gray-200 flex justify-between">
        <input
          className="w-4/5 p-1 m-1"
          type="text"
          placeholder="채팅창"
          value={sendMessage}
          onChange={(e) => {
            messageHandler(e.target.value);
          }}
        />
        <button
          className="bg-green-500 hover:bg-green-400 rounded-md py-1 px-2 text-white m-1"
          onClick={() => {
            sendHandler();
          }}
        >
          채팅 입력
        </button>
      </div>
    </div>
  );
}
