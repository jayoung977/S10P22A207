'use client'
// 사용자가 받은 10개의 랜덤한 주식 종목 목록 (right side bar - 2)
import { useState } from 'react'
import Stock from "./Stock"

export default function StockList () {
    const [selectedStock, setSelectedStock] = useState(0);

    const [stockData, setStockData] = useState([
        {
            name : '종목1',
            id: 0, 
            riseRate : -1.5,
            price : 70000,
        },
        {
            name : '종목2', 
            id: 1, 
            riseRate : -2.8,
            price : 50000,
        },
        {
            name : '종목3', 
            id: 2, 
            riseRate : +3.5,
            price : 80000,
        },
        {
            name : '종목4', 
            id: 3, 
            riseRate : +10.9,
            price : 200000,
        },
        {
            name : '종목4', 
            id: 4, 
            riseRate : +10.9,
            price : 200000,
        },
        {
            name : '종목4', 
            id: 5, 
            riseRate : +10.9,
            price : 200000,
        },
        {
            name : '종목4', 
            id: 6, 
            riseRate : +10.9,
            price : 200000,
        },
        {
            name : '종목4', 
            id: 7, 
            riseRate : +10.9,
            price : 200000,
        },
        {
            name : '종목4', 
            id: 8, 
            riseRate : +10.9,
            price : 200000,
        },
        {
            name : '종목4', 
            id: 9, 
            riseRate : +10.9,
            price : 200000,
        },
    ])


    return (
        <div className="row-start-2 row-end-5 grid grid-rows-6">
            <div className="row-start-1 row-end-2 flex items-center justify-between pl-2">
                <div className="rounded-t-lg bg-small-1 text-textColor-2"><span className="mx-1">종목</span></div>
            </div>
            <div className="row-span-5 overflow-y-auto block" style={{height: 'calc(37vh)'}}>
                {
                    stockData.map((x :any, index) => (
                        <Stock 
                            key={x.id} 
                            id={x.id}
                            index={index}
                            data={x} 
                            isSelected={selectedStock==x.id}
                            onClick={()=>{setSelectedStock(x.id)}}
                            />
                        )
                    )
                }
            </div>
        </div>
    )
}