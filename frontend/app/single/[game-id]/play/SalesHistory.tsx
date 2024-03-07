import SaleHistory from "./SaleHistory"

export default function SalesHistory () {
    return (
        <div className="row-start-3 row-end-4 grid grid-rows-6 border border-black">
            <div className="row-span-1 flex items-center border border-black pl-2">매매 내역</div>
            <div className="row-span-5 grid grid-rows-4 border border-black rounded-md m-2">
                <div className="row-span-1 grid grid-cols-5 items-center justify-center border border-b-black">
                    <div className="col-span-1 text-center">유형</div>
                    <div className="col-span-2 text-center">
                        <div>가격(수량)</div>
                        <div>수수료 및 세금</div>
                    </div>
                    <div className="col-span-2 text-center">
                        <div>체결 금액</div>
                        <div>실현 손익</div>
                    </div>
                </div>
                <div className="row-span-4 overflow-y-auto block " style={{height: 'calc(17vh)'}}>
                    <SaleHistory />
                    <SaleHistory />
                    <SaleHistory />
                    <SaleHistory />
                    <SaleHistory />
                    <SaleHistory />
                    <SaleHistory />
                    <SaleHistory />
                    <SaleHistory />
                    <SaleHistory />
                    <SaleHistory />
                    <SaleHistory />
                    <SaleHistory />
                    <SaleHistory />
                    <SaleHistory />
                    <SaleHistory />
                    <SaleHistory />
                </div>
            </div>
        </div>
    )
}