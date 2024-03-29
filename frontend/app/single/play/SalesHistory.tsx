'use client'
// 사용자의 매매 내역 (left side bar - 3)
import SingleGameStore from '@/public/src/stores/single/SingleGameStore';
import SaleHistory from "./SaleHistory";

export default function SalesHistory () {
    const { tradeListData } = SingleGameStore();

    return (
        <div className="row-span-1 grid grid-rows-6">
            <div className="row-span-1 flex items-center justify-between pl-2">
                <div className="rounded-t-lg bg-small-5 text-textColor-2"><span className="mx-1">매매 내역</span></div>
            </div>
            <table className="row-span-5 table-fixed rounded-md overflow-y-auto block">
                <thead className="grid grid-cols-6 items-center m-1">
                    <tr className="col-span-6 grid grid-cols-6 items-center">
                        <th className="col-span-1 text-center mr-3">종목</th>
                        <th className="col-span-1 text-center">유형</th>
                        <th className="col-span-2">가격(수량)</th>
                    </tr>
                </thead>
                <tbody className="overflow-y-auto block" style={{ height: 'calc(20vh)' }}>
                    {   tradeListData && tradeListData.length > 0 ? (
                        tradeListData?.map((x :any, index :number) => (
                            <SaleHistory key={index} data={x}/>
                        ))
                    ) : (
                        <div className="text-center mt-10">매매 내역이 없습니다.</div>
                    )
                    }
                </tbody>
            </table>
        </div>
    )
}