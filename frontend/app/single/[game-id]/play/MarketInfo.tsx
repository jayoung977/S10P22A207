'use client'
import { useState } from 'react';
// 시장 정보 컴포넌트
import Market from "./Market"
export default function MarketInfo () {
    const [marketData, setMarketData] = useState([
        {
            정보: '금',
            가격: 2083.39,
        },
        {
            정보: '은',
            가격: 2083.49,
        },
        {
            정보: '동',
            가격: 2083.59,
        },
        {
            정보: '구리',
            가격: 9323.39,
        },
        {
            정보: '다이아',
            가격: 100000.39,
        },
    ])
    return (
        <div className="row-start-2 row-end-7 border border-black">
            {
                marketData.map((x, index) => (
                    <Market key={index} data={x}/>
                ))
            }
        </div>
    )
}