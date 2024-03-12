'use client'

import styles from '@/public/src/styles/multi/gameroomSetting.module.css'
import { useRouter } from 'next/navigation'
import MakeRoomModal from './makeRoomModal';
import { useState } from 'react';

export default function GameroomSetting(){
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const handleQuickstart = () => {
    router.push('multi/1/wait')
  }
  return (
    <div className={styles.gameroomSetting}>
      <div className="col-span-8 grid grid-cols-5 justify-items-center text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0">    
        <div className="col-span-1 flex items-center">
          <input id="default-checkbox" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
          <label htmlFor="default-checkbox" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">전체방</label>
        </div>
        <div className="col-span-1 flex items-center mb-0">
          <input id="default-checkbox" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
          <label htmlFor="default-checkbox" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">대기방</label>
        </div>
        <div className="col-span-1 flex items-center mb-0">
          <input id="default-checkbox" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
          <label htmlFor="default-checkbox" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">3라운드</label>
        </div>
        <div className="col-span-1 flex items-center mb-0">
          <input id="default-checkbox" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
          <label htmlFor="default-checkbox" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">5라운드</label>
        </div>
        <div className="col-span-1 flex items-center mb-0">
          <input id="default-checkbox" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
          <label htmlFor="default-checkbox" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">7라운드</label>
        </div>
      </div>
      <div className="col-span-2 justify-items-center ms-2">
        <button 
        className='bg-blue-500 hover:bg-blue-400 px-2 py-1 rounded-md text-white'
        onClick={handleQuickstart}>빠른시작</button>
      </div>
      <div className="col-span-2 justify-items-center">
        <button onClick={()=> {setIsOpen(true)}} className='bg-red-500 hover:bg-red-400 px-2 py-1 rounded-md text-white'>방만들기</button>
      </div>
      <MakeRoomModal isOpen={isOpen} onClose={()=>{setIsOpen(false)}}  />
  </div>
  )
}