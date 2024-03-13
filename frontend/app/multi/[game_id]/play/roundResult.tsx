'use client'


import styles from '@/public/src/styles/multi/roundResult.module.css'
import RoundChart from './roundChart' 
import RoundUser from './roundUser'
import { useEffect, useState } from 'react'
import type { dataType } from './page'
import Penguin from '@/public/src/assets/images/penguin.png'
import Image from 'next/image'

export default function RoundResult(){

  const [RoundData, setData] = useState<dataType[]>([]);
  useEffect(() => {
      setData([
          { date: '2022-01-01', open: 100, high: 120, low: 90, close: 110, volume: 1000 },
          { date: '2022-01-02', open: 110, high: 130, low: 70, close: 140, volume: 2000 },
          { date: '2022-01-03', open: 150, high: 170, low: 100, close: 160, volume: 3000 },
          { date: '2022-01-04', open: 140, high: 140, low: 80, close: 80, volume: 1000 },
          { date: '2022-01-05', open: 100, high: 120, low: 90, close: 110, volume: 1000 },
          { date: '2022-01-06', open: 100, high: 120, low: 90, close: 110, volume: 1000 },
          { date: '2022-01-07', open: 110, high: 130, low: 70, close: 140, volume: 2000 },
          { date: '2022-01-08', open: 150, high: 170, low: 100, close: 160, volume: 3000 },
          { date: '2022-01-09', open: 140, high: 140, low: 80, close: 80, volume: 1000 },
          { date: '2022-01-10', open: 100, high: 120, low: 90, close: 110, volume: 1000 },
          { date: '2022-01-11', open: 100, high: 120, low: 90, close: 110, volume: 1000 },
          { date: '2022-01-12', open: 110, high: 130, low: 70, close: 140, volume: 2000 },
          { date: '2022-01-13', open: 150, high: 170, low: 100, close: 160, volume: 3000 },
          { date: '2022-01-14', open: 140, high: 140, low: 80, close: 80, volume: 1000 },
          { date: '2022-01-15', open: 100, high: 120, low: 90, close: 110, volume: 1000 },
          { date: '2022-01-16', open: 100, high: 120, low: 90, close: 110, volume: 1000 },
          { date: '2022-01-17', open: 110, high: 130, low: 70, close: 140, volume: 2000 },
          { date: '2022-01-18', open: 150, high: 170, low: 100, close: 160, volume: 3000 },
          { date: '2022-01-19', open: 140, high: 140, low: 80, close: 80, volume: 1000 },
          { date: '2022-01-20', open: 100, high: 120, low: 90, close: 110, volume: 1000 },
          { date: '2022-01-21', open: 100, high: 120, low: 90, close: 110, volume: 1000 },
          { date: '2022-01-22', open: 110, high: 130, low: 70, close: 140, volume: 2000 },
          { date: '2022-01-23', open: 150, high: 170, low: 100, close: 160, volume: 3000 },
          { date: '2022-01-24', open: 140, high: 140, low: 80, close: 80, volume: 1000 },
          { date: '2022-01-25', open: 100, high: 120, low: 90, close: 110, volume: 1000 },
          { date: '2022-01-26', open: 100, high: 120, low: 90, close: 110, volume: 1000 },
          { date: '2022-01-27', open: 110, high: 130, low: 70, close: 140, volume: 2000 },
          { date: '2022-01-28', open: 150, high: 170, low: 100, close: 160, volume: 3000 },
          { date: '2022-01-29', open: 140, high: 140, low: 80, close: 80, volume: 1000 },
          { date: '2022-01-30', open: 100, high: 120, low: 90, close: 110, volume: 1000 },
          { date: '2022-01-31', open: 100, high: 120, low: 90, close: 110, volume: 1000 },
          { date: '2022-02-01', open: 110, high: 130, low: 70, close: 140, volume: 2000 },
          { date: '2022-02-02', open: 150, high: 170, low: 100, close: 160, volume: 3000 },
          { date: '2022-02-03', open: 140, high: 140, low: 80, close: 80, volume: 1000 },
          { date: '2022-02-04', open: 100, high: 120, low: 90, close: 110, volume: 1000 },
          { date: '2022-02-05', open: 100, high: 120, low: 90, close: 110, volume: 1000 },
          { date: '2022-02-06', open: 110, high: 130, low: 70, close: 140, volume: 2000 },
          { date: '2022-02-07', open: 150, high: 170, low: 100, close: 160, volume: 3000 },
          { date: '2022-02-08', open: 140, high: 140, low: 80, close: 80, volume: 1000 },
          { date: '2022-02-09', open: 100, high: 120, low: 90, close: 110, volume: 1000 },
          { date: '2022-02-10', open: 100, high: 120, low: 90, close: 110, volume: 1000 },
          { date: '2022-02-11', open: 110, high: 130, low: 70, close: 140, volume: 2000 },
          { date: '2022-02-12', open: 150, high: 170, low: 100, close: 160, volume: 3000 },
          { date: '2022-02-13', open: 140, high: 140, low: 80, close: 80, volume: 1000 },
          { date: '2022-02-14', open: 100, high: 120, low: 90, close: 110, volume: 1000 },
          { date: '2022-02-15', open: 100, high: 120, low: 90, close: 110, volume: 1000 },
          { date: '2022-02-16', open: 110, high: 130, low: 70, close: 140, volume: 2000 },
          { date: '2022-02-17', open: 150, high: 170, low: 100, close: 160, volume: 3000 },
          { date: '2022-02-18', open: 140, high: 140, low: 80, close: 80, volume: 1000 },
          { date: '2022-02-19', open: 100, high: 120, low: 90, close: 110, volume: 1000 },
          { date: '2022-02-20', open: 100, high: 120, low: 90, close: 110, volume: 1000 },
          { date: '2022-02-21', open: 110, high: 130, low: 70, close: 140, volume: 2000 },
          { date: '2022-02-22', open: 150, high: 170, low: 100, close: 160, volume: 3000 },
          { date: '2022-02-23', open: 140, high: 140, low: 80, close: 80, volume: 1000 },
          { date: '2022-02-24', open: 100, high: 120, low: 90, close: 110, volume: 1000 },
          { date: '2022-02-25', open: 100, high: 120, low: 90, close: 110, volume: 1000 },
          { date: '2022-02-26', open: 110, high: 130, low: 70, close: 140, volume: 2000 },
          { date: '2022-02-27', open: 150, high: 170, low: 100, close: 160, volume: 3000 },
          { date: '2022-02-28', open: 140, high: 140, low: 80, close: 80, volume: 1000 },
          { date: '2022-03-01', open: 100, high: 120, low: 90, close: 110, volume: 1000 },
          { date: '2022-03-02', open: 100, high: 120, low: 90, close: 110, volume: 1000 },
          { date: '2022-03-03', open: 110, high: 130, low: 70, close: 140, volume: 2000 },
          { date: '2022-03-04', open: 150, high: 170, low: 100, close: 160, volume: 3000 },
          { date: '2022-03-05', open: 140, high: 140, low: 80, close: 80, volume: 1000 },
          { date: '2022-03-06', open: 100, high: 120, low: 90, close: 110, volume: 1000 },
          { date: '2022-03-07', open: 100, high: 120, low: 90, close: 110, volume: 1000 },
          { date: '2022-03-08', open: 110, high: 130, low: 70, close: 140, volume: 2000 },
          { date: '2022-03-09', open: 150, high: 170, low: 100, close: 160, volume: 3000 },
          { date: '2022-03-10', open: 140, high: 140, low: 80, close: 80, volume: 1000 },
          { date: '2022-03-11', open: 100, high: 120, low: 90, close: 110, volume: 1000 },
          { date: '2022-03-12', open: 100, high: 120, low: 90, close: 110, volume: 1000 },
          { date: '2022-03-13', open: 110, high: 130, low: 70, close: 140, volume: 2000 },
          { date: '2022-03-14', open: 150, high: 170, low: 100, close: 160, volume: 3000 },
          { date: '2022-03-15', open: 140, high: 140, low: 80, close: 80, volume: 1000 },
          { date: '2022-03-16', open: 100, high: 120, low: 90, close: 110, volume: 1000 },
          { date: '2022-03-17', open: 100, high: 120, low: 90, close: 110, volume: 1000 },
          { date: '2022-03-18', open: 110, high: 130, low: 70, close: 140, volume: 2000 },
          { date: '2022-03-19', open: 150, high: 170, low: 100, close: 160, volume: 3000 },
          { date: '2022-03-20', open: 140, high: 140, low: 80, close: 80, volume: 1000 },
          { date: '2022-03-21', open: 100, high: 120, low: 90, close: 110, volume: 1000 },
          { date: '2022-03-22', open: 100, high: 120, low: 90, close: 110, volume: 1000 },
          { date: '2022-03-23', open: 110, high: 130, low: 70, close: 140, volume: 2000 },
          { date: '2022-03-24', open: 150, high: 170, low: 100, close: 160, volume: 3000 },
          { date: '2022-03-25', open: 140, high: 140, low: 80, close: 80, volume: 1000 },
          { date: '2022-03-26', open: 100, high: 120, low: 90, close: 110, volume: 1000 },
          { date: '2022-03-27', open: 100, high: 120, low: 90, close: 110, volume: 1000 },
          { date: '2022-03-28', open: 110, high: 130, low: 70, close: 140, volume: 2000 },
          { date: '2022-03-29', open: 150, high: 170, low: 100, close: 160, volume: 3000 },
          { date: '2022-03-30', open: 140, high: 140, low: 80, close: 80, volume: 1000 },
          { date: '2022-03-31', open: 100, high: 120, low: 90, close: 110, volume: 1000 },
          { date: '2022-04-01', open: 110, high: 130, low: 70, close: 140, volume: 2000 },
          { date: '2022-04-02', open: 150, high: 170, low: 100, close: 160, volume: 3000 },
          { date: '2022-04-03', open: 140, high: 140, low: 80, close: 80, volume: 1000 },
          { date: '2022-04-04', open: 100, high: 120, low: 90, close: 110, volume: 1000 },
          { date: '2022-04-05', open: 100, high: 120, low: 90, close: 110, volume: 1000 },
          { date: '2022-04-06', open: 110, high: 130, low: 70, close: 140, volume: 2000 },
          { date: '2022-04-07', open: 150, high: 170, low: 100, close: 160, volume: 3000 },
          { date: '2022-04-08', open: 140, high: 140, low: 80, close: 80, volume: 1000 },
          { date: '2022-04-09', open: 100, high: 120, low: 90, close: 110, volume: 1000 },
          { date: '2022-04-10', open: 100, high: 120, low: 90, close: 110, volume: 1000 },
          { date: '2022-04-11', open: 110, high: 130, low: 70, close: 140, volume: 2000 },
          { date: '2022-04-12', open: 150, high: 170, low: 100, close: 160, volume: 3000 },
          { date: '2022-04-13', open: 140, high: 140, low: 80, close: 80, volume: 1000 },
          { date: '2022-04-14', open: 100, high: 120, low: 90, close: 110, volume: 1000 },
          { date: '2022-04-15', open: 100, high: 120, low: 90, close: 110, volume: 1000 },
          { date: '2022-04-16', open: 110, high: 130, low: 70, close: 140, volume: 2000 },
          { date: '2022-04-17', open: 150, high: 170, low: 100, close: 160, volume: 3000 },
          { date: '2022-04-18', open: 140, high: 140, low: 80, close: 80, volume: 1000 },
          { date: '2022-04-19', open: 100, high: 120, low: 90, close: 110, volume: 1000 },
          { date: '2022-04-20', open: 100, high: 120, low: 90, close: 110, volume: 1000 },
          { date: '2022-04-21', open: 100, high: 120, low: 90, close: 110, volume: 1000 },
          { date: '2022-04-22', open: 110, high: 130, low: 70, close: 140, volume: 2000 },
          { date: '2022-04-23', open: 150, high: 170, low: 100, close: 160, volume: 3000 },
          { date: '2022-04-24', open: 140, high: 140, low: 80, close: 80, volume: 1000 },
          { date: '2022-04-25', open: 100, high: 120, low: 90, close: 110, volume: 1000 },
          { date: '2022-04-26', open: 100, high: 120, low: 90, close: 110, volume: 1000 },
          { date: '2022-04-27', open: 110, high: 130, low: 70, close: 140, volume: 2000 },
          { date: '2022-04-28', open: 150, high: 170, low: 100, close: 160, volume: 3000 },
          { date: '2022-04-29', open: 140, high: 140, low: 80, close: 80, volume: 1000 },
          { date: '2022-04-30', open: 100, high: 120, low: 90, close: 110, volume: 1000 },
          { date: '2022-05-01', open: 110, high: 130, low: 70, close: 140, volume: 2000 },
          { date: '2022-05-02', open: 150, high: 170, low: 100, close: 160, volume: 3000 },
          { date: '2022-05-03', open: 140, high: 140, low: 80, close: 80, volume: 1000 },
          { date: '2022-05-04', open: 100, high: 120, low: 90, close: 110, volume: 1000 },
      ]);
      console.log('page.tsx의 data : ', RoundData);
  }, [])

  return(
    <div className="fixed -translate-x-1/2 translate-y-1/5 z-50 h-4/5 w-3/4 inset-0 left-1/2 border-4 bg-slate-50 rounded-md grid grid-rows-6 gap-2">
      <div className='row-span-1 grid grid-cols-12 items-center'>
        <div className='col-span-2 justify-center items-center m-2'>
          <Image
            src={Penguin}
            alt='Profile-image'
            width={100}
            height={100}
          />
        </div>
        <div className='col-span-1 justify-items-center'>
          <div className='bg-yellow-300 m-1 p-1 rounded-md text-gray-700 text-center'>1등</div>
        </div>
        <div className='col-span-4 justify-items-center text-lg text-center'> 
          <div>새삼문득이용수가대단하네</div>
          <div className='flex items-center justify-center'>
            <div>
              떡상
            </div>
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
        <div className='col-span-2 justify-items-center text-lg text-center'>삼성전자</div> 
        <div className='col-span-2 justify-items-center text-center'>
          <button className='border rounded-md font-bold bg-slate-300 text-gray-700 px-2 py-1 text-normal'>기록저장</button>
        </div> 
      </div>
      <div className='row-span-5 grid grid-cols-12 gap-2'>
        <div className='col-span-8 grid grid-rows-12 m-2'>
          <RoundChart data={RoundData}/>
        </div>
        <div className='col-span-4 grid grid-rows-6'>
          <RoundUser/>
          <RoundUser/>
          <RoundUser/>
          <RoundUser/>
          <RoundUser/>
          <RoundUser/>
        </div>
      </div>
    </div>
  )
}