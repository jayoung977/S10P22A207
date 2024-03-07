import Header from "./header"
import GameStatus from "./gameStatus"
import Chart from "../chart"
import Chat from "../chat"
import TradeHistory from "./tradeHistory"
import User from "./user"

export default function MultiPlay(){
  return (
    <div className="grid grid-rows-12">
      <Header/>
      <div className="row-span-11 grid grid-cols-12 border">
        <aside className="col-span-3 text-center">
          여기 왼쪽이요
          <div className="border p-2 grid grid-rows-12">
            <GameStatus/>
            <TradeHistory/>
          </div>
        </aside>
        <main className="col-span-6">
          여기 메인이요
          <Chart/>
          <Chat/>
        </main>
        <aside className="col-span-3">
          <div>유저 목록</div>
          <User/>
        </aside>
      </div>
    </div>
  )
}