import styles from './page.module.css'
import Chart from '../chart' 
import Chat from '../chat'
import User from './user'
import RoomInfo from './roomInfo'
import FriendSearch from './friendSearch'
import GameRule from './gameRule'
import Header from './header'


export default function MultiWait(){
  return (
    <div className="grid grid-rows-12">
      <Header/>
      <div className="row-span-11 grid grid-cols-12 border">
        <aside className="col-span-3 text-center">
          <RoomInfo/>
          <FriendSearch/>
          <GameRule/>
        </aside>
        <main className="col-span-6">
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