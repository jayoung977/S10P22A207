'use client'
import { useState } from 'react';

import MarketInfo from "./MarketInfo"
import Trends from "./Trends"

export default function MarketAndTrends () {
    const [isOn, setIsOn] = useState(true);

    return (
        <div className="row-start-5 row-end-7 grid grid-rows-6 border border-black">
            <div className="row-start-1 row-end-2 grid grid-cols-9 justify-between center border-black">
                <button className="col-start-2 col-end-5" onClick={() => {setIsOn(true)}}>시장정보</button>
                
                <button className="col-start-6 col-end-9" onClick={() => {setIsOn(false)}}>트렌드</button>
            </div>
            { 
                isOn ? (
                    <MarketInfo />
                ) : (
                    <Trends />
                )
            }
        </div>
    )
}