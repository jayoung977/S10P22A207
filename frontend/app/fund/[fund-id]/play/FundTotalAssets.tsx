// 사용자의 현재 총 자산 정보 (left side bar - 1)
export default function FundTotalAssets () {
    return (
        <div className="row-span-1 grid grid-rows-6">
            <div className="row-start-1 row-end-2 flex items-center justify-between pl-2">
                <div className="rounded-t-lg bg-small-5 text-textColor-2"><span className="mx-1">총 평가 자산</span></div>
                <div>10,000,000원(- %)</div>
            </div>
            <div className="row-start-2 row-end-7 grid grid-rows-6 m-2 rounded-md" >
                <div className="row-start-1 row-end-2 grid grid-cols-2 bg-small-5 rounded-md">
                    <div className="col-span-1 flex items-center justify-center text-textColor-2">보유 현금</div>
                    <div className="col-span-1 flex items-center justify-center text-textColor-2">총 평가 손익</div>
                </div>
                <div className="row-start-2 row-end-4 grid grid-cols-2">
                    <div className="col-span-1 flex items-center justify-center">10,000,000</div>
                    <div className="col-span-1 flex items-center justify-center">0</div> 
                </div>
                <div className="row-start-4 row-end-5 grid grid-cols-2 bg-small-5 rounded-md">
                    <div className="col-span-1 flex items-center justify-center  text-textColor-2">총 매입 금액</div>
                    <div className="col-span-1 flex items-center justify-center text-textColor-2">총 평가 금액</div>
                </div>
                <div className="row-start-5 row-end-7 grid grid-cols-2">
                    <div className="col-span-1 flex items-center justify-center">0</div>
                    <div className="col-span-1 flex items-center justify-center">0</div>
                </div>
            </div>
        </div>
       
    )
}
