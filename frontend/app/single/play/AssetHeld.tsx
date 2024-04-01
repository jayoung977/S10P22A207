import SingleGameStore from "@/public/src/stores/single/SingleGameStore"
import useClickSound from '@/public/src/components/clickSound/DefaultClick';


export default function AssetHeld({ data } :any) {
    const playClickSound = useClickSound();
    const { stockListData, setSelectedStockIndex } = SingleGameStore();
    const idx:number = stockListData.findIndex((x :any) => x?.stockId == data?.stockId);
    return (
        <div
            onClick={() => {
                playClickSound();
                setSelectedStockIndex(idx)}
            } 
            className="row-span-3 bg-small-6 border-black m-3 grid grid-rows-3 rounded-lg shadow-md hover:scale-105 ease-in-out duration-500"
        >
            <div className="row-span-1 text-textColor-1 ml-1">종목 {idx+1}</div>
            <div className="row-span-2 grid grid-rows-2">
                <div className="row-span-1 grid grid-cols-10">
                    <div className="col-span-2 flex items-center justify-start text-textColor-2 ml-2">평가 손익</div>
                    <div className={`col-span-3 flex items-center justify-end mr-1 ${data?.unrealizedProfit > 0 ? "text-red-500" : data?.unrealizedProfit < 0 ? "text-blue-500" : "text-textColor-1"}`}>{data?.unrealizedProfit}원</div>
                    <div className="col-span-2 flex items-center justify-start text-textColor-2 ml-2">매도 가능</div>
                    <div className="col-span-3 flex items-center justify-end text-textColor-1 mr-1">{data?.stockAmount}개</div>
                </div>
                <div className="row-span-1 grid grid-cols-10">
                    <div className="col-span-2 flex items-center justify-start text-textColor-2 ml-2">손익률</div>
                    <div className={`col-span-3 flex items-center justify-end mr-1 ${data?.profitMargin > 0 ? "text-red-500" : data?.profitMargin < 0 ? "text-blue-500" : "text-textColor-1"}`}>{data?.profitMargin.toFixed(3)} %</div>
                    <div className="col-span-2 flex items-center justify-start text-textColor-2 ml-2">평균 단가</div>
                    <div className="col-span-3 flex items-center justify-end text-textColor-1 mr-1">{data?.averagePurchasePrice}원</div>
                </div>
            </div>
        </div>
    )
}

