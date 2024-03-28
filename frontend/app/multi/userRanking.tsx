"use client";

import { useState } from "react";
import ProfileModal from "./profileModal";
import multigameStore from "@/public/src/stores/multi/MultiGameStore";
import { QueryClient, QueryClientProvider } from "react-query";


interface userType {
  memberId: number;
  nickname: string;
  asset: number;
}

export default function UserRanking({ user }: { user: userType }) {
  const { lobbyModal, setLobbyModal, userId, setUserId } = multigameStore();
  const queryClient = new QueryClient();
  
  
  return (
   <QueryClientProvider client={queryClient}>
    <div
      className={`grid grid-cols-12 border rounded-md p-2 hover:cursor-pointer`}
    >
      <div
        className="col-span-7 test-left"
        onClick={() => {
          setLobbyModal(true);
          setUserId(user.memberId)
        }}
      >
        <span>{user.nickname}</span>
      </div>
      {lobbyModal && <ProfileModal />}
    </div>
   </QueryClientProvider> 
  );
}
