'use client'
import RoundUser from './roundUser'
import { useEffect, useState } from 'react'
import socketStore from '@/public/src/stores/websocket/socketStore'

export default function RoundResult ({ isOpen, onClose }: any) {
  const { roundNumber, } = socketStore();
  if (!isOpen) return null;

  return(
    <div className="fixed -translate-x-1/2 translate-y-1/5 z-50 h-4/5 w-1/2 inset-0 left-1/2 border-4 bg-slate-50 rounded-lg grid grid-rows-12 gap-2">
      <div className='row-span-2 bg-small-9 grid grid-cols-12 text-textColor-2 rounded-t-lg items-center'>
        <div className='col-span-4 flex justify-center items-center text-xl'>
          <div>남은시간: (5초)</div>
        </div>
        <div className='col-span-4 text-center items-center m-2 text-2xl'>
          {roundNumber} 라운드 결과
        </div>
        <div className='col-span-4 justify-items-center text-lg text-center'>
          <div>주식이름</div>
          <div>(해당기간)</div>
        </div> 
      </div>
      <div className='row-span-10 bg-background-1 gap-2'>
        <RoundUser/>
        <RoundUser/>
        <RoundUser/>
        <RoundUser/>
        <RoundUser/>
        <RoundUser/>
      </div>
    </div>
  )
}