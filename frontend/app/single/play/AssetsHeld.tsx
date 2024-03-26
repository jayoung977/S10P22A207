'use client'
// 보유 자산 목록 (left side bar - 2)
import { useState } from 'react'
import SingleGameStore from '@/public/src/stores/single/SingleGameStore'
import AssetHeld from './AssetHeld'
export default function AssetsHeld () {

    const { assetListData } = SingleGameStore();
    
    return (
        <div className="row-span-1 grid grid-rows-6">
            <div className="row-span-1 flex items-center justify-between pl-2">
                <div className="rounded-t-lg bg-small-6 text-textColor-2"><span className="mx-1">보유 자산</span></div>
            </div>
            <div className="row-span-5 rounded-lg border border-background-1 overflow-y-auto block" style={{height: 'calc(25vh)'}}>
                {
                    assetListData?.filter((x :any, index :number) => x.stockAmount > 0).map((filteredX: any, filteredIndex: any) => (
                        <AssetHeld key={filteredX.stockId} data={filteredX}/>
                    ))
                }
            </div>
        </div>
    )
}