'use client'

import styles from '@/public/src/styles/multi/gameroomSetting.module.css'
import { useRouter } from 'next/navigation'


export default function GameroomSetting(){
  const router = useRouter();

  const handleQuickstart = () => {
    router.push('multi/1/wait')
  }
  return (
    <div className={styles.gameroomSetting}>
      <div className="grid grid-cols-5 col-span-8 justify-items-center">
        <div className="col-span-1">전체방</div>
        <div className="col-span-1">대기방</div>
        <div className="col-span-1">3라운드</div>
        <div className="col-span-1">5라운드</div>
        <div className="col-span-1">7라운드</div>
      </div>
      <div className="col-span-2 justify-items-center">
        <button 
        className='bg-blue-500 px-2 py-1 rounded-md text-white'
        onClick={handleQuickstart}>빠른시작</button>
      </div>
      <div className="col-span-2 justify-items-center">
        <button className='bg-red-500 px-2 py-1 rounded-md text-white'>방만들기</button>
      </div>
  </div>
  )
}