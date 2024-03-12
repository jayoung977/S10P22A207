'use client'
import { useState } from 'react'
import AssetHeld from './AssetHeld'
export default function AssetsHeld () {
    const [AssetData, setAssetData] = useState([
        {
            종목명: '종목1',
            평가손익: 1000,
            매도가능: 1,
            손익률: 10.00,
            평균단가: 10000,
        },
        {
            종목명: '종목2',
            평가손익: 2000,
            매도가능: 2,
            손익률: 20.00,
            평균단가: 20000,
        },
        {
            종목명: '종목3',
            평가손익: 3000,
            매도가능: 3,
            손익률: 30.00,
            평균단가: 30000,
        },
        {
            종목명: '종목4',
            평가손익: 4000,
            매도가능: 4,
            손익률: 40.00,
            평균단가: 40000,
        },
        {
            종목명: '종목5',
            평가손익: 5000,
            매도가능: 5,
            손익률: 50.00,
            평균단가: 50000,
        },    

    ])
    return (
        <div className="row-span-1 grid grid-rows-6 border border-black">
            <div className="row-span-1 flex items-center border border-black pl-2">보유 자산</div>
            <div className="row-span-5 overflow-y-auto block border border-black" style={{height: 'calc(25vh)'}}>
                {
                    AssetData.map((x, index) => (
                        <AssetHeld key={index} data={x}/>
                    ))
                }
            </div>
        </div>
    )
}