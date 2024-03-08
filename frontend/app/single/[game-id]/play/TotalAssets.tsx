// 총 평가 자산 컴포넌트
export default function TotalAssets () {
    return (
        <div className="row-span-1 grid grid-rows-6 border border-black">
            <div className="row-start-1 row-end-2 flex items-center border border-black pl-2">총 평가 자산 : 10,000,000원(- %)</div>
            <div className="row-start-2 row-end-7 grid grid-rows-6 border border-black m-2 rounded-md" >
                <div className="row-start-1 row-end-2 grid grid-cols-2 border border-b-black">
                    <div className="col-span-1 flex items-center justify-center">보유 현금</div>
                    <div className="col-span-1 flex items-center justify-center">총 평가 손익</div>
                </div>
                <div className="row-start-2 row-end-4 grid grid-cols-2">
                    <div className="col-span-1 flex items-center justify-center">10,000,000</div>
                    <div className="col-span-1 flex items-center justify-center">0</div> 
                </div>
                <div className="row-start-4 row-end-5 grid grid-cols-2 border border-b-black">
                    <div className="col-span-1 flex items-center justify-center">총 매입 금액</div>
                    <div className="col-span-1 flex items-center justify-center">총 평가 금액</div>
                </div>
                <div className="row-start-5 row-end-7 grid grid-cols-2">
                    <div className="col-span-1 flex items-center justify-center">0</div>
                    <div className="col-span-1 flex items-center justify-center">0</div>
                </div>
            </div>
        </div>
       
    )
}
