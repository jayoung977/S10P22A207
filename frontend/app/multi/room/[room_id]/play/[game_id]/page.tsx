"use client";

import Header from "./header";
import GameStatus from "./gameStatus";
import RoundChart from "./roundChart";
import Chat from "../../chat";
import TradeHistory from "./tradeHistory";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import TradeButtons from "../../tradeButton";
import GameMembers from "./GameMembers";
import axios from "axios";
import socketStore from "@/public/src/stores/websocket/socketStore";
import multigameStore from "@/public/src/stores/multi/MultiGameStore";
import InGameBgm from "@/public/src/components/bgm/InGameBgm";


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
  const {
    day,
    roundNumber,
    maxRoundNumber,
    roomId,
    gameId,
    multiGameStockIds,
    setMultiGameLogId,
  } = socketStore();
  const { stockId, setStockId, stockChartList, setStockChartList } =
    multigameStore();
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const fetchMultigameData = async () => {
    try {
      const data = {
        roundNumber: roundNumber,
        stockId: multiGameStockIds[roundNumber - 1].stockId,
        gameId: gameId,
        firstDayStockChartId:
          multiGameStockIds[roundNumber - 1].firstDayStockChartId,
        roomId: roomId,
      };
      console.log(data);
      const response = await axios({
        method: "post",
        url: "https://j10a207.p.ssafy.io/api/multi/game-chart",
        data: {
          roundNumber: roundNumber,
          stockId: multiGameStockIds[roundNumber - 1].stockId,
          gameId: gameId,
          firstDayStockChartId:
            multiGameStockIds[roundNumber - 1].firstDayStockChartId,
          roomId: roomId,
        },
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
        },
      });
      console.log(response.data);
      setMultiGameLogId(response.data.result.multiGameLogId);
      console.log("zz");
      // console.log("stockId : ", response.data.result.stockId);
      // console.log("stockChartList : ", response.data.result.stockChartList);
      setStockId(response.data.result.stockId);
      setStockChartList(response.data.result.stockChartList);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsError(true);
    }
  };

  useEffect(() => {
    fetchMultigameData();
  }, []);

  if (isLoading) {
    return <div className="rainbow"></div>;
  }
  if (isError) {
    return <div>Error</div>;
  }
  return (
    <div>
      {/* <RoundResult/> */}
      <div className="grid grid-rows-12 h-screen border-separate">
        <Header />
        <InGameBgm></InGameBgm>
        <div className="row-span-11 grid grid-cols-12 border">
          <aside className="col-span-2 text-center border p-2 grid grid-rows-12">
            <GameStatus />
            <TradeHistory />
          </aside>
          <main className="col-span-8 grid grid-rows-12">
            <RoundChart
              data={stockChartList ? stockChartList.slice(0, 300 + day) : null}
            />
            <div className="row-span-3 border">
              <Chat />
            </div>
          </main>
          <div className="col-span-2 grid grid-rows-12">
            <TradeButtons />
            <GameMembers />
          </div>
        </div>
      </div>
    </div>
  );
}
