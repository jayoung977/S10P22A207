"use client";
import Image from "next/image";
import ProfileImage from "@/public/src/assets/images/profile-person-image.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown, faCaretUp } from "@fortawesome/free-solid-svg-icons";
import FinalUser from "./finalUser";
import { useParams, useRouter } from "next/navigation";
import RoundResult from "./roundResult";
import { useState } from "react";
import useClickSound from "@/public/src/components/clickSound/DefaultClick";
import socketStore from "@/public/src/stores/websocket/socketStore";

export default function FinalResult() {
  const router = useRouter();
  const [isRound, setIsRound] = useState(false);
  const playClickSound = useClickSound();
  const params = useParams();
  const { isGameOver, setIsGameOver } = socketStore();
  return (
    <div className="fixed -translate-x-1/2 translate-y-1/5 z-50 h-4/5 w-2/3 inset-0 left-1/2 border-2 bg-big-1 rounded-lg grid grid-rows-8">
      <div className="row-span-1 text-4xl rounded-t-lg text-white text-center p-4 bg-small-3">
        <div>최 종 결 과</div>
      </div>
      <div className="row-span-1 bg-background-1 grid grid-cols-12 border rounded-md items-center">
        <div className="col-start-2 col-span-1 justify-center items-center m-2">
          <Image
            src={ProfileImage}
            alt="Profile-image"
            width={60}
            height={60}
          />
        </div>
        <div className="col-span-1 justify-items-center">
          <div className="bg-yellow-300 m-1 p-1 rounded-md text-gray-700 text-center">
            rank
          </div>
        </div>
        <div className="col-span-5 justify-items-center text-lg text-center">
          <div>nickname</div>
          <div className="flex items-center justify-around">
            <div className="text-red-500">totalAsset (roi)</div>
          </div>
        </div>
        <div className="col-span-4 text-center gap-2">
          <div>랭킹 포인트: rankpoint점</div>
          <div className="flex justify-center items-center gap-2 text-center text-small-3">
            <FontAwesomeIcon
              icon={faCaretUp}
              size="lg"
              style={{ color: "f00000" }}
            />
            +17
          </div>
        </div>
      </div>
      <div className="row-span-7 grid grid-cols-12 gap-2 m-2">
        <div className="col-span-10 ms-2">
          <div className="row-span-5 rounded-md bg-background-1">
            <div
              className="px-4 overflow-auto"
              style={{ height: "calc(52vh)" }}
            >
              <FinalUser />
              <FinalUser />
              <FinalUser />
              <FinalUser />
              <FinalUser />
              <FinalUser />
            </div>
          </div>
        </div>
        <div className="col-span-2 flex flex-col justify-end items-center my-2">
          <div>
            <button
              onClick={() => {
                playClickSound();
                setIsGameOver(!isGameOver);
                router.push(`/multi/room/${params.room_id}`);
              }}
              className="border py-1 px-5 m-2 text-2xl rounded-md font-bold bg-button-1 text-textColor-2 hover:bg-gray-300"
            >
              방으로
            </button>
          </div>
          <div>
            <button
              onClick={() => {
                playClickSound();
                setIsGameOver(!isGameOver);
                router.push("/multi");
              }}
              className="border py-1 px-5 m-2 text-2xl rounded-md text-textColor-1 font-bold bg-button-2 hover:bg-gray-300"
            >
              나가기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
