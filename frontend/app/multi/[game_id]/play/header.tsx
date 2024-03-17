'use client'

import penguin from '@/public/src/assets/images/penguin.png'
import Image from 'next/image'
import { useState } from 'react'
import RoundResult from './roundResult'
import FinalResult from './finalResult'

export default function Header(){
    const [isOpen, setIsOpen] = useState(false);
    const [isGameover, setIsGameover] = useState(false);
    const [turn, setTurn] = useState<number>(0)
    const [round, setRound] = useState<number>(1)
    const roundPercentage = (turn/50)*100
    const allPercentage = ((50*(round-1)+turn)/150)*100


  return( 
  <header className="row-span-1 grid grid-cols-12 border gap-2 items-center">
    <FinalResult
      isOpen={isGameover}
      onClose={()=>{setIsGameover(false)}}
    />
    <RoundResult 
     isOpen={isOpen}
     onClose={()=>{setIsOpen(false)}}
     />
    <div className="col-start-2 col-end-3 flex items-center">
      <div className="flex gap-2 items-center">
        <Image
          src={penguin}
          alt="Logo"
          className="h-8"
          width={32}
          height={32}
        />
        <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
          지금이니
        </span>
      </div>
    </div>
    <div className="col-start-5 col-end-9 flex justify-center text-xl font-bold">
      <div>이겨보시던지</div>
    </div>
    <div className="col-span-1 flex justify-center font-bold">
    <button
      disabled={turn === 50} 
      // turn이 50이면 disabled 속성이 true가 됩니다.
      onClick={() => {
        // if (round == 3 && turn == 49){
          console.log('경기 종료')
          setIsGameover(true)
        // }
        if (turn === 49) {
          setIsOpen(true)
          // 일단 3초로 설정
          setTimeout(()=> setIsOpen(false),3000)
          setRound(round + 1);
          setTurn(0);
        } else {
          setTurn(turn + 1);
        }
      }}
      className={`bg-teal-400 hover:bg-teal-300 px-2 py-1 m-1 text-white rounded-md ${
        turn === 50 ? 'opacity-50 cursor-not-allowed' : ''
      }`}
    >  다음 턴으로!
    </button>
    </div>
    <div className="col-span-1 grid grid-rows-2 gap-0 text-md text-center font-semibold">
      <div>
        현재 턴
      </div>
      <div className="w-full h-4  bg-gray-200 rounded-full dark:bg-gray-700">
        <div className="bg-red-600 text-xs h-4 font-bold text-white text-center p-0.5 leading-none rounded-full" style={{ width: `${roundPercentage}%` }}>{turn}/50</div>
      </div>
    </div>
    <div className="col-span-2 grid grid-rows-2 items-center m-1" >
      <div className='row-span-1 text-sm'>
        라운드: {round}/3 전체 턴: {(round-1)*50+turn}/150
      </div>
      <div className='row-span-1 flex justify-items-center text-center'>
        <div className="w-full bg-gray-200 rounded-full dark:bg-gray-700">
          <div className="bg-blue-600 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full" style={{ width: `${allPercentage}%`}}> {(round-1)*50+turn}/150</div>
        </div>
      </div>
    </div>
  </header>
  )
}