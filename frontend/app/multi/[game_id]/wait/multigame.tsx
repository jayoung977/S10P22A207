'use client'

import ChartImage from '../chartImage' 
import Chat from '../chat'
import GameUser from './gameUser'
import RoomInfo from './roomInfo'
import FriendSearch from './friendSearch'
import GameRule from './gameRule'
import Header from './header'

export default function MultiWait(){
  return (
    <div className="grid grid-rows-12 h-screen border-separate">
      <Header/>
      <div className="row-start-2 row-end-13 grid grid-cols-12 border">
        <aside className="col-span-3 grid grid-rows-6 text-center">
          <RoomInfo/>
          <FriendSearch/>
          <GameRule/>
        </aside>
        <main className="col-span-6 grid grid-rows-8">
          <div className='row-span-5'>
            <ChartImage/>
          </div>
          <div className="row-span-3 border grid grid-cols-12">
            <Chat/>
            <div className='col-span-2 text-white text-center'></div>
          </div>
        </main>
        <aside className="col-span-3 grid grid-rows-6">
          <GameUser/>
          <GameUser/>
          <GameUser/>
          <GameUser/>
          <GameUser/>
          <GameUser/>
        </aside>
      </div>
    </div>
  )
}