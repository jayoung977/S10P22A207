"use client";

import Header from "./header";
import GameStatus from "./gameStatus";
import Chart from "@/app/single/play/Chart";
import Chat from "../../chat";
import TradeHistory from "./tradeHistory";
import { useState, useEffect } from "react";
import { useParams } from 'next/navigation';
import TradeButtons from "../../tradeButton";
import GameMembers from "./GameMembers";
import axios from "axios";
import socketStore from "@/public/src/stores/websocket/socketStore";


export type dataType = {
  date: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
};

export default function page() {
  const [data, setData] = useState<dataType[]>([]);
  const { roundNumber, maxRoundNumber, roomId, gameId, multiGameStockIds } = socketStore();


  const fetchMultigameData = async () => {
    try {
      const data = {
        roundNumber: roundNumber,
        stockId: multiGameStockIds[roundNumber-1].stockId,
        gameId: gameId,
        firstDayStockChartId: multiGameStockIds[roundNumber-1].firstDayStockChartId,
        roomId: roomId,
      }
      console.log(data)
      const response = await axios({
        method: 'post',
        url: "https://j10a207.p.ssafy.io/api/multi/game-chart",
        data: {
          roundNumber: roundNumber,
          stockId: multiGameStockIds[roundNumber-1].stockId,
          gameId: gameId,
          firstDayStockChartId: multiGameStockIds[roundNumber-1].firstDayStockChartId,
          roomId: roomId,
        },
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`
        }
      })
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }
  
  useEffect(() => {
    fetchMultigameData();
  }, [])
  return (
    <div>
      {/* <RoundResult/> */}
      <div className="grid grid-rows-12 h-screen border-separate">
        <Header />
        <div className="row-span-11 grid grid-cols-12 border">
          <aside className="col-span-2 text-center border p-2 grid grid-rows-12">
            <GameStatus />
            <TradeHistory />
          </aside>
          <main className="col-span-8 grid grid-rows-16">
            <div className="row-span-12"></div>
            {/* <Chart data={data}/> */}
            <div className="border grid grid-cols-12 row-span-4">
              <Chat />
              <TradeButtons />
            </div>
          </main>
          <GameMembers />
        </div>
      </div>
    </div>
  );
}
