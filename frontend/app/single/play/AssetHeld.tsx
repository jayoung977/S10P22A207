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
                <div className="row-span-1 grid grid-cols-4 justify-center">
                    <div className="col-span-1 m-auto text-textColor-2">평가 손익</div>
                    <div className="col-span-1 m-auto ">{data?.unrealizedProfit.toLocaleString()}원</div>
                    <div className="col-span-1 m-auto text-textColor-2">매도 가능</div>
                    <div className="col-span-1 m-auto text-textColor-1">{data?.stockAmount}</div>
                </div>
                <div className="row-span-1 grid grid-cols-4">
                    <div className="col-span-1 m-auto text-textColor-2">손익률</div>
                    <div className="col-span-1 m-auto text-textColor-1">{data?.profitMargin.toFixed(4)} %</div>
                    <div className="col-span-1 m-auto text-textColor-2">평균 단가</div>
                    <div className="col-span-1 m-auto text-textColor-1">{data?.averagePurchasePrice.toLocaleString()}원</div>
                </div>
            </div>
        </div>
    )
}

