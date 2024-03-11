import Header from "./header"
import GameStatus from "./gameStatus"
import Chart from "../chart"
import Chat from "../chat"
import TradeHistory from "./tradeHistory"
import User from "./user"

export default function MultiPlay(){
  return (
    <div className="grid grid-rows-12 h-screen border-separate">
      <Header/>
      <div className="row-span-11 grid grid-cols-12 border">
        <aside className="col-span-3 text-center border p-2 grid grid-rows-12">
          <GameStatus/>
          <TradeHistory/>
        </aside>
        <main className="col-span-6 grid grid-rows-12">
          <Chart/>
          <Chat/>
        </main>
        <aside className="col-span-3 grid grid-rows-6">
          <User/>
          <User/>
          <User/>
          <User/>
          <User/>
          <User/>
        </aside>
      </div>
    </div>
  )
}