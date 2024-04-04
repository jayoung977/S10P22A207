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
  const preventClose = (e: BeforeUnloadEvent) => {
    e.preventDefault();
    e.returnValue = ""; // for chrome. deprectaed.
  };

  useEffect(() => {
    window.addEventListener("beforeunload", preventClose);
    return () => {
      window.removeEventListener("beforeunload", preventClose);
    };
  }, []);
  // 새로고침 방지 로직

  const preventGoBack = () => {
    history.pushState(null, "", location.href);
  };
  useEffect(() => {
    history.pushState(null, "", location.href);
    window.addEventListener("popstate", preventGoBack);
    return () => {
      window.removeEventListener("popstate", preventGoBack);
    };
  }, []);
  //  뒤로가기 방지 로직

  const [data, setData] = useState<dataType[]>([]);
  const {
    day,
    setDay,
    roundNumber,
    maxRoundNumber,
    roomId,
    gameId,
    multiGameStockIds,
    setMultiGameLogId,
    setTodayEndPrice,
    setPlayers,
  } = socketStore();

  const { stockId, setStockId, stockChartList, setStockChartList } =
    multigameStore();
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const {
    setAveragePrice,
    setCash,
    setInitialAsset,
    setProfitMargin,
    setShortAveragePrice,
    setShortStockAmount,
    setStockAmount,
    setStockValue,
    setTotalAsset,
    setTotalPurchaseAmount,
    setUnrealizedGain,
    setTradeList,
  } = socketStore();
  const fetchMultigameData = async () => {
    setDay(1);
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
      setTodayEndPrice(response.data.result.stockChartList[300].endPrice);
      setAveragePrice(0);
      setCash(10000000);
      setInitialAsset(10000000);
      setProfitMargin(0);
      setShortAveragePrice(0);
      setShortStockAmount(0);
      setStockAmount(0);
      setStockValue(0);
      setTotalAsset(10000000);
      setTotalPurchaseAmount(0);
      setUnrealizedGain(0);
      setTradeList([]);
    } catch (error) {
      console.log(error);
      setIsError(true);
    }
  };

  useEffect(() => {
    fetchMultigameData();
  }, []);

  const params = useParams<{ room_id?: string; game_id?: string }>();
  const room_id: string | undefined = params.room_id;
  const game_id: string | undefined = params.game_id;

  const fetchMultiPlayUsers = async () => {
    const response = await axios({
      url: `https://j10a207.p.ssafy.io/api/multi/player-info`,
      method: `post`,
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
      },
      data: {
        gameId: game_id,
        roundNumber: 1,
        roomId: room_id,
      },
    });
    setPlayers(response.data.result);
  };

  useEffect(() => {
    fetchMultiPlayUsers();
  }, [isLoading, isError]);

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
