"use client";
import useFetchUserInfo from "@/public/src/hooks/useFetchUserInfo";
import userStore from "@/public/src/stores/user/userStore";
import { useRef, useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import multigameStore from "@/public/src/stores/multi/MultiGameStore";
import socketStore from "@/public/src/stores/websocket/socketStore";
import Swal from "sweetalert2";
import zustand from "zustand";

export default function Chat() {
  useFetchUserInfo();
  const params = useParams<{ room_id: string }>();
  const { nickname, memberId } = userStore();
  const { sendMessage, setSendMessage } = multigameStore();
  const { receiveMessages, setReceiveMessages } = socketStore();
  const room_id: string = params.room_id;
  multigameStore();
  const { clientObject } = socketStore();
  const messageHandler = (message: string) => {
    setSendMessage(message);
  };

  const sendHandler = (nickname: any) => {
    clientObject?.current.send(
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

  const messageContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const scrollToBottom = () => {
      const messagesContainer = messageContainerRef.current;
      if (messagesContainer !== null) {
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
      }
    };

    scrollToBottom();
  }, [receiveMessages]);

  return (
    <div className="col-span-10 border relative">
      <div
        className="h-[calc(25vh)] overflow-auto gap p-2"
        ref={messageContainerRef}
      >
        {receiveMessages.map((item: any, i: any) => {
          return (
            <div key={i}>
              {item.result.sender} : {item.result.message}
            </div>
          );
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
          onKeyDown={(e) => {
            e.key == "Enter" && sendHandler(nickname);
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
