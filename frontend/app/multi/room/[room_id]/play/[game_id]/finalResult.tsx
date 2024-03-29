"use client";
import Image from "next/image";
import ProfileImage from "@/public/src/assets/images/profile-person-image.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown, faCaretUp } from "@fortawesome/free-solid-svg-icons";
import FinalUser from "./finalUser";
import { useRouter } from "next/navigation";
import RoundResult from "./roundResult";
import { useState } from "react";

export default function FinalResult({ isOpen, onClose }: any) {
  const router = useRouter();
  const [isRound, setIsRound] = useState(false);

  if (!isOpen) return null;

  return (
    <div className="fixed -translate-x-1/2 translate-y-1/5 z-50 h-4/5 w-3/4 inset-0 left-1/2 border-4 bg-big-1 rounded-md grid grid-cols-8 gap-2">
      {isRound == true ? (
        <div className="col-span-7 grid grid-rows-6 gap-2">
          <RoundResult isOpen={isRound} />
        </div>
      ) : (
        <div className="col-span-7 grid grid-rows-6 gap-2 m-2">
          <div className="row-span-1 bg-background-1 grid grid-cols-12 border rounded-md items-center">
            <div className="col-span-2 justify-center items-center m-2">
              <Image
                src={ProfileImage}
                alt="Profile-image"
                width={60}
                height={60}
              />
            </div>
            <div className="col-span-1 justify-items-center">
              <div className="bg-yellow-300 m-1 p-1 rounded-md text-gray-700 text-center">
                1등
              </div>
            </div>
            <div className="col-span-5 justify-items-center text-lg text-center">
              <div>새삼문득이용수가대단하네</div>
              <div className="flex items-center justify-around">
                <div className="text-red-500">541,000,000 (+400%)</div>
              </div>
            </div>
            <div className="col-span-4 text-center gap-2">
              <div>랭킹 포인트: 1992점</div>
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
          <div className="row-span-5 rounded-md bg-background-1">
            <div className="text-xl m-2">최종순위</div>
            <div
              className="px-4 overflow-auto"
              style={{ height: "calc(48vh)" }}
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
      )}

      <div className="col-span-1 flex flex-col justify-end my-2">
      <div>
          <button
            onClick={() => {
              setIsRound(true);
            }}
            className="border py-1 px-4 m-2 rounded-md text-white text-2xl font-bold bg-blue-500 hover:bg-small-1"
          >
            1라운드
          </button>
        </div>
        <div>
          <button
            onClick={() => {
              setIsRound(true);
            }}
            className="border py-1 px-4 m-2 rounded-md text-white text-2xl font-bold bg-blue-500 hover:bg-small-1"
          >
            2라운드
          </button>
        </div>
        <div>
          <button
            onClick={() => {
              setIsRound(true);
            }}
            className="border py-1 px-4 m-2 rounded-md text-white text-2xl font-bold bg-blue-500 hover:bg-small-1"
          >
            3라운드
          </button>
        </div>
        <div>
          <button
            onClick={() => {
              setIsRound(false);
            }}
            className="border py-1 px-2 m-2 rounded-md text-white text-2xl font-bold bg-small-3 hover:bg-red-500"
          >
            최종결과
          </button>
        </div>
        <div>
          <button
            onClick={() => {
              onclose;
              router.push("/multi");
            }}
            className="border py-1 px-5 m-2 text-2xl rounded-md text-textColor-1 font-bold bg-button-2 hover:bg-gray-300"
          >
            나가기{" "}
          </button>
        </div>
      </div>
    </div>
  );
}
