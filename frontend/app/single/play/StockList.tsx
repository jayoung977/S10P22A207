'use client'
// 사용자가 받은 10개의 랜덤한 주식 종목 목록 (right side bar - 2)
import SingleGameStore from '@/public/src/stores/single/SingleGameStore'
import Stock from "./Stock"

export default function StockList () {
    const { selectedStockIndex, setSelectedStockIndex, todayStockInfoListData ,setTodayStockInfoListData } = SingleGameStore();
    
    return (
        <div className="row-start-2 row-end-5 grid grid-rows-7">
            <div className="row-span-1 flex items-center justify-between pl-2">
                <div className="rounded-t-lg bg-small-1 text-textColor-2"><span className="mx-1">종목</span></div>
            </div>
            <div className="row-span-6 overflow-y-auto block" style={{height: 'calc(39vh)'}}>
                {
                    todayStockInfoListData?.map((x :any, index :number) => (
                        <Stock 
                            key={x.stockId} 
                            index={index}
                            data={x} 
                            isSelected={selectedStockIndex==index}
                            onClick={()=>{setSelectedStockIndex(index)}}
                        />
                        )
                    )
                }
            </div>
        </div>
    )
}

