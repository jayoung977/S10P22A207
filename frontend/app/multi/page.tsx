import styles from './page.module.css'
import Navbar from '../Navbar';
import Profile from './profile';
import Ranking from './Ranking';
import GameroomSetting from './gameroomSetting';
import Gameroom from './gameroom';
import Pagination from './pagination';
import MakeRoomModal from './makeRoomModal';
import JoinRoomModal from './joinRoomModal';


export default function Multi() {
  const rooms: string[] = ['게임방','게임방','게임방','게임방','게임방','게임방'];
  return (
    <div className='relative'>
      <MakeRoomModal/>
      <JoinRoomModal/>
      <div className="grid grid-rows-12 h-screen border-separate">
        <Navbar/>
        <div className='row-span-11 grid grid-rows-12 mx-auto border xl:max-w-screen-xl'>
            {/* 상단 */}
          <div className={styles.upper}>
            <Profile/>
          </div>
          {/* 하단 */}
          <div className={styles.lower}>
            <aside className="col-span-4">
              <Ranking/>
            </aside>
            <article className="col-span-8 grid grid-rows-12">
              <GameroomSetting/>
              {/* 게임방 목록 */}
              <div className="row-span-8 grid grid-cols-12 border gap-1">
                {
                  rooms.map((room:string, i:number)=> (
                    <div className="col-span-6 border bg-slate-100 p-1 m-1 rounded-md" key={i}>
                      <Gameroom/>
                    </div>
                  ))
                }
              </div>
              <section className="row-span-2 flex justify-center">
                <Pagination/>
              </section>
            </article>
          </div>
        </div>
      </div>
    </div>
  )
}