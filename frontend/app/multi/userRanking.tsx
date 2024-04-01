"use client";

import { useState } from "react";
import ProfileModal from "./profileModal";
import multigameStore from "@/public/src/stores/multi/MultiGameStore";
import { QueryClient, QueryClientProvider } from "react-query";
import { userType } from "./FriendUserRankingList";
import useClickSound from "@/public/src/components/clickSound/DefaultClick";


export default function UserRanking({ user, rank }: { user: userType, rank: number }) {
  const { lobbyModal, setLobbyModal, userId, setUserId } = multigameStore();
  const queryClient = new QueryClient();
  const playClickSound = useClickSound();
  
  return (
   <QueryClientProvider client={queryClient}>
    <div
      className={`grid grid-cols-1 border rounded-md p-2 hover:cursor-pointer`}
    >
      <div
        className="flex justify-between text-left text-sm"
        onClick={() => {
          playClickSound();
          setLobbyModal(true);
          setUserId(user.memberId)
        }}
      >
        <span>{rank+1}위</span>
        <span>{user.nickname}</span>
        <span>{user.asset?.toLocaleString()}원</span>
      </div>
      {lobbyModal && <ProfileModal />}
    </div>
   </QueryClientProvider> 
  );
}
