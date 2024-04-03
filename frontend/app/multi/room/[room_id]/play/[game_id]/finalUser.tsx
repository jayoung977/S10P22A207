"use client";
import ProfileImage from "@/public/src/assets/images/profile-image.png";
import useClickSound from "@/public/src/components/clickSound/DefaultClick";
import socketStore from "@/public/src/stores/websocket/socketStore";
import Image from "next/image";
import useGetProfileImage from "@/public/src/hooks/useGetProfileImage";
export default function FinalUser({ player }: any) {
  const playClickSound = useClickSound();

  return (
    <div
      onClick={playClickSound}
      className="row-span-1  border rounded-md p-2 m-1 items-center bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
    >
      <div className="grid grid-cols-12 ">
        <div className="col-span-1">
          <div className="border rounded-md px-2 py-1 ms-2 text-center bg-gray-300">
            {player.rank}
          </div>
        </div>
        <div className=" col-start-3 col-span-2">
          <Image
            src={useGetProfileImage(player.rank * 10000000)}
            alt="profile-image"
            width={60}
            height={60}
            style={{ borderRadius: "50%" }}
          />
        </div>
        <div className="col-span-3">
          <div className="text-lg">{player.nickName}</div>
        </div>
        <div className="col-span-5">
          <div>{player.totalAsset.toLocaleString()}원</div>
        </div>
      </div>
    </div>
  );
}
