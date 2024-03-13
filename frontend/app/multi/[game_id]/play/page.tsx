import Header from "./header"
import GameStatus from "./gameStatus"
import Chat from "../chat"
import Chart from '@/app/single/[game-id]/play/Chart'
import TradeHistory from "./tradeHistory"
import User from "./user"
import RoundResult from "./roundResult"
// import { useState, useEffect } from "react"
import TradeButtons from "../tradeButton"

export type dataType = {
  date: string,
  open: number,
  high: number,
  low: number,
  close: number,
  volume: number,
}

export async function generateStaticParams(){
  return [{game_id: '1'}]
}


export default function MultiPlay({ params }: {params: { game_id: string }}){
  const { game_id } = params;
  

  return (
    <div>
      {/* <RoundResult/> */}
      <div className="grid grid-rows-12 h-screen border-separate">
        <Header/>
        <div className="row-span-11 grid grid-cols-12 border">
          <aside className="col-span-2 text-center border p-2 grid grid-rows-12">
            <GameStatus/>
            <TradeHistory/>
          </aside>
          <main className="col-span-8 grid grid-rows-16">
            <Chart/>
            <div className="border grid grid-cols-12 row-span-4">
              <Chat/>
              <TradeButtons/>
            </div>
          </main>
          <aside className="col-span-2 grid grid-rows-6 text-sm">
            <User/>
            <User/>
            <User/>
            <User/>
            <User/>
            <User/>
          </aside>
        </div>
      </div>
    </div>
  )
}