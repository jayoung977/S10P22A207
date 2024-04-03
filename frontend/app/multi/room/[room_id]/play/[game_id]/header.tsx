"use client";
import logo from "@/public/src/assets/images/logo.png";
import Image from "next/image";
import { useState, useEffect } from "react";
import RoundResult from "./roundResult";
import FinalResult from "./finalResult";
import axios from "axios";
import useClickSound from "@/public/src/components/clickSound/DefaultClick";
import socketStore from "@/public/src/stores/websocket/socketStore";
import multigameStore from "@/public/src/stores/multi/MultiGameStore";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isGameover, setIsGameover] = useState(false);
  const {
    roomTitle,
    maxRoundNumber,
    gameId,
    setDay,
    day,
    setRoundNumber,
    roundNumber,
  } = socketStore();
  const roundPercentage = (day / 50) * 100;
  const playClickSound = useClickSound();

  const [remainingTime, setRemainingTime] = useState(100000); // 초기 남은 시간을 100초(100,000밀리초)로 설정
  const [isDisabled, setIsDisabled] = useState(false);
  useEffect(() => {
    const targetTime = new Date().getTime() + remainingTime; // 타이머 만료 시간 계산

    const interval = setInterval(() => {
      const currentTime = new Date().getTime();
      const remaining = targetTime - currentTime;

      if (remaining <= 0) {
        clearInterval(interval);
        console.log("Countdown finished!");
      } else {
        setRemainingTime(remaining); // 상태 업데이트
      }
    }, 1000); // 1초마다 실행

    return () => clearInterval(interval); // 컴포넌트 언마운트 시 인터벌 정리
  }, []);

  const formatTime = (time: any) => {
    const seconds = Math.floor(time / 1000);
    return `${seconds}초`;
  };

  function handleTomorrow(day: number) {
    axios({
      method: "post",
      url: "https://j10a207.p.ssafy.io/api/multi/tomorrow",
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
      },
      data: {
        gameId: gameId,
        roundNumber: roundNumber,
        day: day,
      }
    })
      .then((res) => {
        console.log("다음턴! : ", res.data);
      })
      .catch((error) => {
        // console.error(error);
      });
  }


  const handleTradeDay = (e: KeyboardEvent) => {
    if (e.key === "r") {
      handleTomorrow(day);
      if (day === 50) {
        setDay(1)
        setRoundNumber(1)
        setIsGameover(true)
        setIsDisabled(true)
      } else {
        setDay(day+1)
      }
      handleTomorrow(day)
      if(day == 51){
        if (roundNumber === maxRoundNumber) {
          console.log("경기 종료");
          setDay(1)
          setRoundNumber(1)
          setIsGameover(true)
          return
        }
        setRoundNumber(roundNumber + 1);
        setDay(1)
        return
      }
      playClickSound();
      setDay(day + 1);
    };
  }

  useEffect(() => {
    window.addEventListener("keydown", handleTradeDay);

    return () => {
      window.removeEventListener("keydown", handleTradeDay);
    };
  }, [day]);

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
          <Image src={logo} alt="Logo" className="h-8" width={32} height={32} />
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            지금이니
          </span>
        </div>
      </div>
      <div className="col-start-5 col-end-9 flex justify-center text-xl font-bold">
        <div>{roomTitle}</div>
      </div>
      <div className="col-span-1 flex justify-center font-bold">
        <button
          disabled={day === 51}
          // day이 50이면 disabled 속성이 true가 됩니다.
          onClick={() => {
            playClickSound();
            handleTomorrow(day)
            //day == 50이면
            if(day === 50){
              setDay(1);
              setIsDisabled(true)
              setIsGameover(true)
            } else {
              setDay(day+1)
            }
          }}
          className={`bg-teal-400 hover:bg-teal-300 px-2 py-1 m-1 text-white rounded-md ${
            day === 51 ? "opacity-50 cursor-not-allowed" : ""
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
            {day}/50
          </div>
        </div>
      </div>
      <div className="col-span-1 items-center m-1">라운드: {roundNumber}/{maxRoundNumber}</div>
      <div className="col-span-1">{formatTime(remainingTime)}</div>
    </header>
  );
}
