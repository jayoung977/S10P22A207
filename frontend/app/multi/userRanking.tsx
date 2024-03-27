"use client";

import ProfileModal from "./profileModal";
import multigameStore from "@/public/src/stores/multi/MultiGameStore";

interface userType {
  memberId: number;
  nickname: string;
  asset: number;
}

export default function UserRanking({ user }: { user: userType }) {
  const { lobbyModal, setLobbyModal } = multigameStore();

  return (
    <div
      className={`grid grid-cols-12 border rounded-md p-2 hover:cursor-pointer`}
    >
      <div
        className="col-span-7 test-left"
        onClick={() => {
          setLobbyModal("false");
          
        }}
      >
        <span>{user.nickname}</span>
      </div>
      <ProfileModal />
    </div>
  );
}
