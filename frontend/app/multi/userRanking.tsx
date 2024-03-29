"use client";

import { useState } from "react";
import ProfileModal from "./profileModal";
import multigameStore from "@/public/src/stores/multi/MultiGameStore";
import { QueryClient, QueryClientProvider } from "react-query";
import { userType } from "./FriendUserRankingList";


export default function UserRanking({ user }: { user: userType }) {
  const { lobbyModal, setLobbyModal, userId, setUserId } = multigameStore();
  const queryClient = new QueryClient();
  
  
  return (
   <QueryClientProvider client={queryClient}>
    <div
      className={`grid grid-cols-1 border rounded-md p-2 hover:cursor-pointer`}
    >
      <div
        className="flex justify-between test-left"
        onClick={() => {
          setLobbyModal(true);
          setUserId(user.memberId)
        }}
      >
        <span>{user.nickname}</span>
        <span>{user.asset?.toLocaleString()}원</span>
      </div>
      {lobbyModal && <ProfileModal />}
    </div>
   </QueryClientProvider> 
  );
}
