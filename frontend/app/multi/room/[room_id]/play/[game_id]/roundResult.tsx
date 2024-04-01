'use client'
import RoundChart from './roundChart'
import RoundUser from './roundUser'
import { useEffect, useState } from 'react'
import type { dataType } from './page'
import Penguin from '@/public/src/assets/images/profile-person-image.png'
import Image from 'next/image'

export default function RoundResult ({ isOpen, onClose }: any) {
  if (!isOpen) return null;

  return(
    <div className="fixed -translate-x-1/2 translate-y-1/5 z-50 h-4/5 w-3/4 inset-0 left-1/2 border-4 bg-slate-50 rounded-md grid grid-rows-8 gap-2">
      <div className='row-span-2 grid grid-cols-12 items-center'>
        <div className='col-span-2 justify-center items-center m-2'>
          <Image
            src={Penguin}
            alt='Profile-image'
            width={80}
            height={80}
          />
        </div>
        <div className='col-span-1 justify-items-center'>
          <div className='bg-yellow-300 m-1 p-1 rounded-md text-gray-700 text-center'>1등</div>
        </div>
        <div className='col-span-4 justify-items-center text-lg text-center'> 
          <div>새삼문득이용수가대단하네</div>
          <div className='flex items-center justify-around'>
            <div className='text-red-500'>
              541,000,000 (+400%)
            </div>
          </div>
        </div>
        <div className='col-span-1 flex justify-center items-center gap-2'>
          <div>
            시간:
          </div>
          <div>24초</div>
        </div>
        <div className='col-span-4 justify-items-center text-lg text-center'>삼성전자</div> 
      </div>
      <div className='row-span-7 gap-2'>
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