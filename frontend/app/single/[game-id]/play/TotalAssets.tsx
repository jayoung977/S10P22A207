'use client'

import { useState } from "react"

// 사용자의 현재 총 자산 정보 (left side bar - 1)
export default function TotalAssets () {
    const [totalAsset, setTotalAsset] = useState(10000000)
    const [cash, setCash] = useState(10000000)
    const [totalPurchase, setTotalPurchase] = useState(0)
    const [totalValuation, setTotalValuation] = useState(0)
    const [resultProfit, setResultProfit] = useState(0)
    let profitPercentage = ((resultProfit/10000000)*100).toFixed(1)

    return (
        <div className="row-span-1 grid grid-rows-6">
            <div className="row-start-1 row-end-2 flex items-center justify-start gap-2 pl-2">
                <div className="rounded-t-lg bg-small-5 text-textColor-2"><span className="mx-1">총 평가 자산</span></div>
                <div>{totalAsset.toLocaleString()}원({profitPercentage} %)</div>
            </div>
            <div className="row-start-2 row-end-7 grid grid-rows-6 m-2 border border-small-5 scale-95 hover:scale-100 ease-in-out duration-500" >
                <div className="row-start-1 row-end-2 grid grid-cols-2 bg-small-5 rounded-b-md">
                    <div className="col-span-1 flex items-center justify-center text-textColor-2">보유 현금</div>
                    <div className="col-span-1 flex items-center justify-center text-textColor-2">총 평가 손익</div>
                </div>
                <div className="row-start-2 row-end-4 grid grid-cols-2">
                    <div className="col-span-1 flex items-center justify-center">{cash.toLocaleString()}</div>
                    <div className="col-span-1 flex items-center justify-center">{resultProfit.toLocaleString()}</div> 
                </div>
                <div className="row-start-4 row-end-5 grid grid-cols-2 bg-small-5 rounded-b-md">
                    <div className="col-span-1 flex items-center justify-center  text-textColor-2">총 매입 금액</div>
                    <div className="col-span-1 flex items-center justify-center text-textColor-2">총 평가 금액</div>
                </div>
                <div className="row-start-5 row-end-7 grid grid-cols-2">
                    <div className="col-span-1 flex items-center justify-center">{totalPurchase.toLocaleString()}</div>
                    <div className="col-span-1 flex items-center justify-center">{totalValuation.toLocaleString()}</div>
                </div>
            </div>
        </div>
       
    )
}
