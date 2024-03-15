'use client'
// 보유 자산 목록 (left side bar - 2)
import { useState } from 'react'
import AssetHeld from './AssetHeld'
export default function AssetsHeld () {
    const [AssetData, setAssetData] = useState([
        {
            name: '종목1',
            valuationPL: 1000,
            availableForSale: 1,
            profitMargin: 10.00,
            averagePrice: 10000,
        },
        {
            name: '종목2',
            valuationPL: 2000,
            availableForSale: 2,
            profitMargin: 20.00,
            averagePrice: 20000,
        },
        {
            name: '종목3',
            valuationPL: 3000,
            availableForSale: 3,
            profitMargin: 30.00,
            averagePrice: 30000,
        },
        {
            name: '종목4',
            valuationPL: 4000,
            availableForSale: 4,
            profitMargin: 40.00,
            averagePrice: 40000,
        },
        {
            name: '종목5',
            valuationPL: 5000,
            availableForSale: 5,
            profitMargin: 50.00,
            averagePrice: 50000,
        },    

    ])
    return (
        <div className="row-span-1 grid grid-rows-6">
            <div className="row-span-1 flex items-center justify-between pl-2">
                <div className="rounded-t-lg bg-small-6 text-textColor-2"><span className="mx-1">보유 자산</span></div>
            </div>
            <div className="row-span-5 overflow-y-auto block" style={{ height: 'calc(25vh)' }}>
                {
                    AssetData.map((x, index) => (
                        <AssetHeld key={index} data={x}/>
                    ))
                }
            </div>
        </div>
    )
}