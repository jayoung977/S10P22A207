"use client";
import { useState, useEffect } from "react";
import TradeModal from "./play/[game_id]/TradeModal";
import useClickSound from "@/public/src/components/clickSound/DefaultClick";
import multigameStore from "@/public/src/stores/multi/MultiGameStore";
import socketStore from "@/public/src/stores/websocket/socketStore";


export default function TradeButtons() {
  // 거래 모달창 open 여부
  const [isOpenTradeModal, setIsOpenTradeModal] = useState<boolean>(false);
  // 매수 / 매도 / 공매도
  const { tradeType,
          setTradeType,
          tradeStocksAmount,
          setTradeStocksAmount,
          isAvailableTradeStocks,
          setIsAvailableTradeStocks
        } = multigameStore();
  const playClickSound = useClickSound();
  const { cash, stockAmount, shortStockAmount, todayEndPrice } = socketStore();
  const fee = tradeType === 'short-selling' ? 1.0025 : tradeType === 'buy' ? 1.0015 : 1;
  const sellTradeStocks = Number(stockAmount)
  const buyTradeStocks = Math.floor(cash / (todayEndPrice * fee))
  const closeShort = shortStockAmount

  const handleTradeTurn = (e: KeyboardEvent) => {
    if (e.key === "q") {
      playClickSound();
      setTradeStocksAmount(0);
      setTradeType("buy");
      setIsAvailableTradeStocks(buyTradeStocks)
      setIsOpenTradeModal(true);
    } else if (e.key === "w") {
      playClickSound();
      setTradeStocksAmount(0);
      setTradeType("sell");
      setIsAvailableTradeStocks(sellTradeStocks)
      setIsOpenTradeModal(true);
    } else if (e.key === "e") {
      playClickSound();
      setTradeStocksAmount(0);
      setTradeType('short-selling');
      setIsAvailableTradeStocks(buyTradeStocks)
      setIsOpenTradeModal(true);
    } else if (e.key === "c") {
      playClickSound();
      setTradeStocksAmount(0);
      setIsAvailableTradeStocks(closeShort)
      setTradeType("close-short");
      setIsOpenTradeModal(true);
    }
  }


  useEffect(() => {
    window.addEventListener("keydown", handleTradeTurn);

    return () => {
      window.removeEventListener("keydown", handleTradeTurn);
    };
  }, [isOpenTradeModal]);

  return (
    <div className="row-span-2 grid grid-cols-2">
      <TradeModal
        tradeType={tradeType}
        isOpen={isOpenTradeModal}
        onClose={() => {
          playClickSound();
          setIsOpenTradeModal(false);
          setTradeType("");
        }}
        />
      <div className="col-span-1">
        <button
          onClick={() => {
            playClickSound();
            setTradeStocksAmount(0);
            setTradeType("buy");
            setIsAvailableTradeStocks(buyTradeStocks)
            setIsOpenTradeModal(true);
          }}
          className=" w-full border p-1 rounded-md text-white font-bold bg-red-500 hover:bg-red-400"
        >
          매수 (Q)
        </button>
      </div>
      <div className="col-span-1">
        <button
          onClick={() => {
            playClickSound();
            setTradeStocksAmount(0);
            setTradeType("sell");
            setIsAvailableTradeStocks(sellTradeStocks)
            setIsOpenTradeModal(true);
          }}
          className="w-full border p-1 rounded-md text-white font-bold bg-blue-500 hover:bg-small-1"
        >
          매도 (W)
        </button>
      </div>
      <div className="col-span-1">
        <button
          onClick={() => {
            playClickSound();
            setTradeStocksAmount(0);
            setTradeType('short-selling');
            setIsAvailableTradeStocks(buyTradeStocks)
            setIsOpenTradeModal(true);
          }}
          className="w-full border p-1 rounded-md text-white font-bold bg-yellow-500 hover:bg-small-10"
        >
          공매도 (E)
        </button>
      </div>
      <div className="col-span-1">
        <button
          onClick={()=>{
            playClickSound();
            setIsAvailableTradeStocks(closeShort)
            setTradeStocksAmount(0);
            setTradeType("close-short");
            setIsOpenTradeModal(true);
          }}
         className='w-full border px-0.5 py-1 rounded-md text-white font-bold bg-small-12 hover:bg-small-12'>공매도청산(C)
        </button>
    </div>
  </div>
  );
}
