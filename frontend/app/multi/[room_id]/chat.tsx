// Chat.tsx
import useFetchUserInfo from "@/public/src/hooks/useFetchUserInfo";
import userStore from "@/public/src/stores/user/userStore";

import { useWebSocket } from "@/public/src/hooks/useWebSocket";
import multigameStore from "@/public/src/stores/multi/MultiGameStore";
export default function Chat() {
  useFetchUserInfo();
  const { nickname } = userStore();
  const { sendMessage, setSendMessage, receiveMessage } = multigameStore();
  const { sendHandler } = useWebSocket();

  const messageHandler = (message: string) => {
    setSendMessage(message);
  };

  return (
    <div className="col-span-10 border relative">
      <div className="h-[calc(25vh)] overflow-auto gap p-2">
        {receiveMessage.map((item: any, i: any) => {
          return <div key={i}>{item}</div>;
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
            sendHandler(nickname);
          }}
        >
          채팅 입력
        </button>
      </div>
    </div>
  );
}
