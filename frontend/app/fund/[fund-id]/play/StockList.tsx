'use client'
// 사용자가 받은 10개의 랜덤한 주식 종목 목록 (right side bar - 2)

import { useEffect } from 'react';
import FundGameStore from "@/public/src/stores/fund/game/FundGameStore";
import Stock from "./Stock"
import useClickSound from '@/public/src/components/clickSound/DefaultClick';

export default function StockList () {
    const playClickSound = useClickSound();
    const { selectedStockIndex, setSelectedStockIndex, todayStockInfoListData ,setTodayStockInfoListData, isBuySellModalOpen } = FundGameStore();
    const handleSelectStockIndex = (e :KeyboardEvent) => {
        if (isBuySellModalOpen == false) {
          const key = e.key;
          if ("1" <= key && key <= "9") {
            setSelectedStockIndex(parseInt(key) - 1);
          } else if (key == "0") {
            setSelectedStockIndex(9);
          }
        }
    }
    useEffect(() => {
        window.addEventListener('keydown', handleSelectStockIndex);

        return () => {
            window.removeEventListener("keydown", handleSelectStockIndex);

        }
    }, [isBuySellModalOpen])
    return (
        <div className="row-start-2 row-end-5 grid grid-rows-7">
            <div className="row-span-1 flex items-center justify-between pl-2">
                <div className="rounded-t-lg bg-small-15 text-textColor-2"><span className="mx-1">종목</span></div>
            </div>
            <div className="row-span-6 overflow-y-auto block" style={{ height: 'calc(39vh)' }}>
                {
                    todayStockInfoListData?.map((x :any, index :number) => (
                        <Stock 
                            key={x.stockId} 
                            index={index}
                            data={x} 
                            isSelected={selectedStockIndex==index}
                            onClick={()=>{
                                playClickSound();
                                setSelectedStockIndex(index)
                            }}
                        />
                        )
                    )
                }
            </div>
        </div>
    )
}

