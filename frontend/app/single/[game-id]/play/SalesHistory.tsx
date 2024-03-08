import SaleHistory from "./SaleHistory"

export default function SalesHistory () {
    return (
        <div className="row-span-1 grid grid-rows-6 border border-black">
            <div className="row-span-1 flex items-center border border-black pl-2">매매 내역</div>
            <table className="row-span-5 table-fixed overflow-y-auto block border border-black">
                <thead>
                    <tr className="flex items-center" style={{ width: '290px'}}>
                        <th className="w-1/5">유형</th>
                        <th className="w-2/5">가격</th>
                        <th className="w-2/5">체결금액</th>
                    </tr>
                </thead>
                <tbody className="overflow-y-auto block" style={{ height: 'calc(20vh)' }}>
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
                </tbody>
            </table>
            
            
            
          
        </div>
    )
}