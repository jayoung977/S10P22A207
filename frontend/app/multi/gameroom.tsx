"use client";
import JoinRoomModal from "./joinRoomModal";
import { useRouter } from "next/navigation";

export default function GameRoom(props: { color: string }) {
  const router = useRouter();
  const { color } = props;
  return (
    <div
      className={`hover:-translate-y-1 transition ease-in-out duration-500 h-auto rounded-md shadow-md text-textColor-2 ${color}`}
    >
      <a href="/multi/1/room" className="block p-2  border rounded-lg shadow">
        <h5 className="mb-1 text-md font-bold tracking-tight">
          파산할 때까지 가보자
        </h5>
        <div className="flex justify-end gap-4 text-sm">
          <div>3라운드</div>
          <div>3명</div>
        </div>
      </a>
      <JoinRoomModal />
    </div>
  );
}
