'use client'
import { useState } from 'react'
// 선택된 10개의  주식 종목 버튼 목록 컴포넌트
import Stock from "./Stock"

export default function StockList () {
    const [selectedStock, setSelectedStock] = useState(0);
    const [hoveredStock, setHoveredStock] = useState(null);

    const [stockData, setStockData] = useState([
        {
            종목명 : '종목1', 
            얼마올랐니 : -1.5,
            얼마니 : 70000,
        },
        {
            종목명 : '종목2', 
            얼마올랐니 : -2.8,
            얼마니 : 50000,
        },
        {
            종목명 : '종목3', 
            얼마올랐니 : +3.5,
            얼마니 : 80000,
        },
        {
            종목명 : '종목4', 
            얼마올랐니 : +10.9,
            얼마니 : 200000,
        },

    ])


    return (
        <div className="row-start-2 row-end-5 grid grid-rows-6 border border-black">
            <div className="row-span-1 flex items-center justify-center border border-black">종목</div>
            <div className="row-span-5 overflow-y-auto block border border-black" style={{height: 'calc(37vh)'}}>
                {
                    stockData.map((x, index) => (
                        <Stock 
                            key={index} 
                            id={index}
                            data={x} 
                            isSelected={selectedStock==index}
                            isHovered={hoveredStock==index}
                            onClick={()=>{setSelectedStock(index)}}
                            />
                        )
                    )
                }
            </div>
        </div>
    )
}