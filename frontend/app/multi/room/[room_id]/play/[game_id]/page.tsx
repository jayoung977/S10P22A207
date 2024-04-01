"use client";

import Header from "./header";
import GameStatus from "./gameStatus";
import Chart from "@/app/single/play/Chart";
import Chat from "../../chat";
import TradeHistory from "./tradeHistory";
import { useState, useEffect } from "react";
import TradeButtons from "../../tradeButton";
import GameMembers from "./GameMembers";

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
