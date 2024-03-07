import styles from './page.module.css'
import Navbar from '../Navbar';
import Profile from './profile';
import Ranking from './Ranking';
import GameroomSetting from './gameroomSetting';
import Gameroom from './gameroom';
import Pagination from './pagination';
import Image from 'next/image';
import BigImage from '@/public/src/assets/images/big-image.png'


export default function Multi() {
  const rooms: string[] = ['게임방','게임방','게임방','게임방','게임방','게임방','게임방','게임방'];
  return (
    <div>
      <Navbar/>
      <div className='container grid grid-rows-12'>
        <main className="row-span-11 grid-rows-4 mx-auto border xl:max-w-screen-xl">
          {/* 상단 */}
          <div className={styles.upper}>
            <aside className="col-span-4">
              <Profile/>
            </aside>
            <div className="col-span-8">
              <div className="text-center border h-[250px]">
                <Image
                  src={BigImage}
                  height={300}
                  width={600}
                  alt='big-image'
                  />
              </div>
            </div>
          </div>
          {/* 하단 */}
          <div className={styles.lower}>
            <Ranking/>
            <article className="col-span-8">
              <GameroomSetting/>
              {/* 게임방 목록 */}
              <div className="grid grid-cols-12 border gap-2">
                {
                  rooms.map((room:string, i:number)=> (
                    <div className="col-span-6" key={i}>
                      <Gameroom/>
                    </div>
                  ))
                }
              </div>
              <section className="flex justify-center">
                <Pagination/>
              </section>
            </article>
          </div>
        </main>
      </div>
    </div>
  )
}