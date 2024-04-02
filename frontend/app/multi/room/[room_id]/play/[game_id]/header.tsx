"use client";
import logo from "@/public/src/assets/images/logo.png"
import Image from "next/image";
import { useState, useEffect } from "react";
import RoundResult from "./roundResult";
import FinalResult from "./finalResult";
import axios from "axios";
import { useParams } from "next/navigation";
import useClickSound from "@/public/src/components/clickSound/DefaultClick";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isGameover, setIsGameover] = useState(false);
  const [turn, setTurn] = useState<number>(0);
  const [round, setRound] = useState<number>(1);
  const params = useParams();
  const roundPercentage = (turn / 50) * 100;
  const allPercentage = ((50 * (round - 1) + turn) / 150) * 100;
  const playClickSound = useClickSound();

  function handleTomorrow (turn: number){
    axios({
      method: 'post',
      url: 'https://j10a207.p.ssafy.io/api/multi/tomorrow',
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`
      },
      data: {
        gameIdx: params.game_id,
        day: turn,
      }
    })
    .then((res)=> {
      console.log(res.data)
    })
    .catch((error)=> {
      console.error(error)
    })
  }

  const handleTradeTurn = (e :KeyboardEvent) => {
    if (e.key === "r") {
      playClickSound();
      handleTomorrow(turn)
      if (round == 3 && turn == 49) {
        console.log("경기 종료");
        setIsGameover(true);
      } else if (turn === 49) {
        setIsOpen(true);
        // 일단 3초로 설정
        setTimeout(() => setIsOpen(false), 30000);
        setRound(round + 1);
        setTurn(0);
      } else {
        setTurn(turn + 1);
      }
    }
  }


  useEffect (() => {
    window.addEventListener('keydown', handleTradeTurn);

    return () => {
        window.removeEventListener("keydown", handleTradeTurn);

    }
  }, [turn])

  return (
    <header className="row-span-1 grid grid-cols-12 border gap-2 items-center">
      <FinalResult
        isOpen={isGameover}
        onClose={() => {
          setIsGameover(false);
        }}
      />
      <RoundResult
        isOpen={isOpen}
        onClose={() => {
          setIsOpen(false);
        }}
      />
      <div className="col-start-2 col-end-3 flex items-center">
        <div className="flex gap-2 items-center">
          <Image
            src={logo}
            alt="Logo"
            className="h-8"
            width={32}
            height={32}
          />
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            지금이니
          </span>
        </div>
      </div>
      <div className="col-start-5 col-end-9 flex justify-center text-xl font-bold">
        <div>이겨보시던지</div>
      </div>
      <div className="col-span-1 flex justify-center font-bold">
        <button
          disabled={turn === 50}
          // turn이 50이면 disabled 속성이 true가 됩니다.
          onClick={() => {
            playClickSound();
            handleTomorrow(turn)
            if (round == 3 && turn == 49) {
              console.log("경기 종료");
              setIsGameover(true);
            } else if (turn === 49) {
              setIsOpen(true);
              setTimeout(() => setIsOpen(false), 30000);
              setRound(round + 1);
              setTurn(0);
            } else {
              setTurn(turn + 1);
            }
          }}
          className={`bg-teal-400 hover:bg-teal-300 px-2 py-1 m-1 text-white rounded-md ${
            turn === 50 ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {" "}
          다음 턴(R)
        </button>
      </div>
      <div className="col-span-1 grid grid-rows-2 gap-0 text-md text-center font-semibold">
        <div>현재 턴</div>
        <div className="w-full h-4  bg-gray-200 rounded-full dark:bg-gray-700">
          <div
            className="bg-red-600 text-xs h-4 font-bold text-white text-center p-0.5 leading-none rounded-full"
            style={{ width: `${roundPercentage}%` }}
          >
            {turn}/50
          </div>
        </div>
      </div>
      <div className="col-span-1 items-center m-1">라운드: {round}/3</div>
      <div className="col-span-1">시간: 150초</div>
    </header>
  );
}
