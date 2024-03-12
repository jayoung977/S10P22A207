'use client'
import { useState } from 'react';
import SaleHistory from "./SaleHistory";

export default function SalesHistory () {
    const [saleData, setSaleData] = useState([
        {
            유형: '매수',
            가격: 10000,
            수량: 1000,
            체결금액: 10000000,
        },
        {
            유형: '매도',
            가격: 20000,
            수량: 2000,
            체결금액: 40000000,
        },
        {
            유형: '매수',
            가격: 30000,
            수량: 3000,
            체결금액: 90000000,
        },
        {
            유형: '매도',
            가격: 40000,
            수량: 4000,
            체결금액: 160000000,
        },

    ])
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
                    {
                        saleData.map((x, index) => (
                            <SaleHistory key={index} data={x}/>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}