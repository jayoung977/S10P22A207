import ChartImage from '../chartImage' 
import Chat from '../chat'
import GameUser from './gameUser'
import RoomInfo from './roomInfo'
import FriendSearch from './friendSearch'
import GameRule from './gameRule'
import Header from './header'

export async function generateStaticParams(){
  return [{game_id: '1'}]
}


export default function MultiWait({ params }: {params: { game_id: string }}){
  const { game_id } = params;
  return (
    <div className="grid grid-rows-12 h-screen border-separate">
      <Header/>
      <div className="row-span-11 grid grid-cols-12 border">
        <aside className="col-span-3 grid grid-rows-12 text-center">
          <RoomInfo/>
          <FriendSearch/>
          <GameRule/>
        </aside>
        <main className="col-span-6 grid grid-rows-12">
          <ChartImage/>
          <div className="border grid grid-cols-12 row-span-4">
            <Chat/>
            <div className='col-span-2 bg-gray-500 text-white text-center'>게임 대기 중 .....</div>
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