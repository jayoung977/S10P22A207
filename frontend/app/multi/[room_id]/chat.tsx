import useFetchUserInfo from "@/public/src/hooks/useFetchUserInfo";
import userStore from "@/public/src/stores/user/userStore";
import { CompatClient, Stomp } from "@stomp/stompjs";
import { useRef, useState } from "react";
import SockJS from "sockjs-client";

export default function Chat() {
  useFetchUserInfo();
  const { nickname } = userStore();
  const [sendMessage, setSendMessage] = useState("");
  const [receiveMessage, setReceiveMessage] = useState([]);
  const client = useRef<CompatClient>({} as CompatClient);

  const connectHandler = () => {
    client.current = Stomp.over(() => {
      const sock = new SockJS("https://j10a207.p.ssafy.io/ws");
      return sock;
    });
    client.current.connect(
      {
        // 여기에서 유효성 검증을 위해 header를 넣어줄 수 있음.
        // ex)
        Authorization: sessionStorage.getItem("accessToken"),
      },
      () => {
        // callback 함수 설정, 대부분 여기에 sub 함수 씀
        client.current.subscribe(
          // `/백엔드와 협의한 api주소/{구독하고 싶은 방의 id}`,
          "https://j10a207.p.ssafy.io/ws",
          (message) => {
            setReceiveMessage(JSON.parse(message.body));
            console.log(receiveMessage);
          },
          {
            // 여기에도 유효성 검증을 위한 header 넣어 줄 수 있음
            Authorization:
              sessionStorage.getItem("accessToken")?.toString() || "",
          }
        );
        console.log("웹소켓 연결됨");
      }
    );
  };

  const sendHandler = () => {
    client.current.send(
      // "/백엔드와 협의한 api주소",
      "https://j10a207.p.ssafy.io/ws",
      {
        // 여기에서 유효성 검증을 위해 header를 넣어줄 수 있음.
        // ex)
        Authorization: sessionStorage.getItem("accessToken"),
      },
      JSON.stringify({
        type: "TALK",
        roomId: 1,
        sender: nickname,
        message: sendMessage,
      })
    );
  };
  return (
    <div className="col-span-10 border relative">
      <div className="h-[calc(25vh)] overflow-auto gap p-2">
        <div>채팅창임 ㅋㅋㅋ</div>
        <div>채팅창임 ㅋㅋㅋ</div>
        <div>채팅창임 ㅋㅋㅋ</div>
        <div>채팅창임 ㅋㅋㅋ</div>
        <div>채팅창임 ㅋㅋㅋ</div>
        <div>채팅창임 ㅋㅋㅋ</div>
        <div>채팅창임 ㅋㅋㅋ</div>
        <div>채팅창임 ㅋㅋㅋ</div>
        <div>채팅창임 ㅋㅋㅋ</div>
        <div>채팅창임 ㅋㅋㅋ</div>
        <div>채팅창임 ㅋㅋㅋ</div>
        <div>채팅창임 ㅋㅋㅋ</div>
        <div>채팅창임 ㅋㅋㅋ</div>
        <div>채팅창임 ㅋㅋㅋ</div>
        <div>채팅창임 ㅋㅋㅋ</div>
      </div>
      <div className="mt-2 w-full border bg-gray-200 flex justify-between">
        <input className="w-4/5 p-1 m-1" type="text" placeholder="채팅창" />
        <button
          onClick={() => {
            connectHandler();
          }}
          className="bg-green-500 hover:bg-green-400 rounded-md py-1 px-2 text-white m-1"
        >
          채팅 입력
        </button>
      </div>
    </div>
  );
}
