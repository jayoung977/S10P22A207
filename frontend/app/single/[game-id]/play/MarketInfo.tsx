'use client'
import { useState } from 'react';

// 시장 정보 컴포넌트
import Market from "./Market"
export default function MarketInfo () {
    const [marketData, setMarketData] = useState([
        {
            name: '금',
            price: 2083.39,
        },
        {
            name: '은',
            price: 2083.49,
        },
        {
            name: '동',
            price: 2083.59,
        },
        {
            name: '구리',
            price: 9323.39,
        },
        {
            name: '다이아',
            price: 100000.39,
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