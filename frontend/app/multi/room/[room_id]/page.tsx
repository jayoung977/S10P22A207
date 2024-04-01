"use client";
import ChartImage from "./chartImage";
import Chat from "./chat";
import RoomInfo from "./roomInfo";
import FriendSearch from "./friendSearch";
import GameRule from "./gameRule";
import Header from "./header";
import GameMembers from "./GameMembers";
import { QueryClient, QueryClientProvider } from "react-query";
import socketStore from "@/public/src/stores/websocket/socketStore";
import { useEffect } from "react";

const queryClient = new QueryClient();

export default function page() {
  const { roomInfo, setRoomInfo } = socketStore();
  // 이후 세션에서 받아올 로그인 사용자 데이터 이거 userStore에 담아놨어~~~~~~~~~~~~~~
  useEffect(()=>{
    console.log(roomInfo)
  }, [roomInfo])
  return (
    <QueryClientProvider client={queryClient}>
      <div className="grid grid-rows-12 h-screen border-separate">
        <Header />
        <div className="row-start-2 row-end-13 grid grid-cols-12 border">
          <aside className="col-span-3 grid grid-rows-6 text-center">
            <RoomInfo />
            <FriendSearch />
            <GameRule />
          </aside>
          <main className="col-span-6 grid grid-rows-8">
            <div className="row-span-5">
              <ChartImage />
            </div>
            <div className="border grid grid-cols-12 row-span-4">
              <Chat />
              <div className="col-span-2 text-white text-center"></div>
            </div>
          </main>
          <GameMembers />
        </div>
      </div>
    </QueryClientProvider>
  );
}
