'use client'
import { useState } from 'react'
import FundGameStore from '@/public/src/stores/fund/game/FundGameStore'
import Trend from "./Trend"

export default function Trends () {
    const { turn, trendListData } = FundGameStore();
    const [trendData, setTrendData] = useState([
        {
            트렌드 : '트렌드1',
        },
        {
            트렌드 : '트렌드2',
        },
        {
            트렌드 : '트렌드3',
        },
        {
            트렌드 : '트렌드4',
        },
        {
            트렌드 : '트렌드5',
        },
    ])
    return (
        <div className="row-start-2 row-end-7">
            {
                trendData.map((x, index) => (
                    <Trend key={index} rank={index+1} data={x}/>
                ))
            }
            {/* {
                trendListData[300+turn].map((x, index) => (
                    <Trend key={index} rank={index+1} data={x}/>
                ))
            } */}
        </div>
    )
}