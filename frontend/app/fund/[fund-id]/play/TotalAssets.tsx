'use client'
import FundGameStore from "@/public/src/stores/fund/game/FundGameStore";

// 사용자의 현재 총 자산 정보 (left side bar - 1)
export default function TotalAssets () {
    const { totalAssetData } = FundGameStore();

    return (
        <div className="row-span-1 grid grid-rows-6">
            <div className="row-start-1 row-end-2 flex items-center justify-start gap-2 pl-2">
                <div className="rounded-t-lg bg-small-13 text-textColor-2"><span className="mx-1">펀드 평가 자산</span></div>
                <div className={`${totalAssetData?.resultProfit > 0 ? "text-red-500" : (totalAssetData?.resultProfit < 0 ? "text-blue-500" : "text-black")}`}>{totalAssetData?.totalAsset.toLocaleString()}원({parseFloat(totalAssetData?.resultRoi).toFixed(2)}%)</div>
            </div>
            <div className="row-start-2 row-end-7 grid grid-rows-6 m-2 border rounded-t-lg border-small-5 scale-95 hover:scale-100 ease-in-out duration-500" >
                <div className="row-start-1 row-end-2 grid grid-cols-2 bg-small-13 rounded-t-md">
                    <div className="col-span-1 flex items-center justify-center text-textColor-2">보유 현금</div>
                    <div className="col-span-1 flex items-center justify-center text-textColor-2">총 평가 손익</div>
                </div>
                <div className="row-start-2 row-end-4 grid grid-cols-2">
                <div className="col-span-1 flex items-center justify-center">{totalAssetData?.cash.toLocaleString()}원</div>
                <div className={`col-span-1 flex items-center justify-center ${totalAssetData?.resultProfit > 0 ? "text-red-500" : (totalAssetData?.resultProfit < 0 ? "text-blue-500" : "text-black")}`}>{totalAssetData?.resultProfit.toLocaleString()}원</div> 
                </div>
                <div className="row-start-4 row-end-5 grid grid-cols-2 bg-small-13">
                    <div className="col-span-1 flex items-center justify-center  text-textColor-2">총 매입 금액</div>
                    <div className="col-span-1 flex items-center justify-center text-textColor-2">총 평가 금액</div>
                </div>
                <div className="row-start-5 row-end-7 grid grid-cols-2">
                <div className="col-span-1 flex items-center justify-center">{totalAssetData?.totalPurchaseAmount.toLocaleString()}원</div>
                <div className="col-span-1 flex items-center justify-center">{totalAssetData?.totalAsset.toLocaleString()}원</div>
                </div>
            </div>
        </div>
       
    )
}
