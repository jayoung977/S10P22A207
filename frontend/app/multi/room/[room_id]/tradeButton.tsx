"use client";
import { useState, useEffect } from "react";
import TradeModal from "./play/[game_id]/TradeModal";
import useClickSound from "@/public/src/components/clickSound/DefaultClick";
import axios from "axios";
import socketStore from "@/public/src/stores/websocket/socketStore";
export default function TradeButtons() {
  // 거래 모달창 open 여부
  const [isOpenTradeModal, setIsOpenTradeModal] = useState<boolean>(false);
  // 매수 / 매도 / 공매도
  const [tradeType, setTradeType] = useState<string>("");
  const playClickSound = useClickSound();
  const handleTradeTurn = (e: KeyboardEvent) => {
    if (e.key === "q") {
      playClickSound();
      setTradeType("buy");
      setIsOpenTradeModal(true);
    } else if (e.key === "w") {
      playClickSound();
      setTradeType("sell");
      setIsOpenTradeModal(true);
    } else if (e.key === "e") {
      playClickSound();
      setTradeType("shortSell");
      setIsOpenTradeModal(true);
    }
  };


  useEffect(() => {
    window.addEventListener("keydown", handleTradeTurn);

    return () => {
      window.removeEventListener("keydown", handleTradeTurn);
    };
  }, [isOpenTradeModal]);

  return (
    <div className="col-span-2">
      <TradeModal
        tradeType={tradeType}
        isOpen={isOpenTradeModal}
        onClose={() => {
          playClickSound();
          setIsOpenTradeModal(false);
          setTradeType("");
        }}
      />
      <div className="gap-1 grid grid-rows-4">
        <button
          onClick={() => {
            playClickSound();
            setTradeType("buy");
            setIsOpenTradeModal(true);
          }}
          className="border p-1 m-2 rounded-md text-white font-bold bg-red-500 hover:bg-red-400"
        >
          매수 (Q)
        </button>
        <button
          onClick={() => {
            playClickSound();
            setTradeType("sell");
            setIsOpenTradeModal(true);
          }}
          className="border p-1 m-2 rounded-md text-white font-bold bg-blue-500 hover:bg-small-1"
        >
          매도 (W)
        </button>
        <button
          onClick={() => {
            playClickSound();
            setTradeType('short-selling')
            setIsOpenTradeModal(true)
          }}
          className="border p-1 m-2 rounded-md text-white font-bold bg-yellow-500 hover:bg-small-10"
        >
          공매도 (E)
        </button>
        <button
          onClick={()=>{
            playClickSound();
            setTradeType('close-short')
            setIsOpenTradeModal(true)
          }}
         className='border p-1 m-2 rounded-md text-white font-bold bg-small-12 hover:bg-small-12'>공매도 청산
        </button>
      </div>
    </div>
  );
}
