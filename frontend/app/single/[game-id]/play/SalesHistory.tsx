'use client'
// 사용자의 매매 내역 (left side bar - 3)
import { useState } from 'react';

import SaleHistory from "./SaleHistory";

export default function SalesHistory () {

    const [saleData, setSaleData] = useState([
        {
            stock: '종목1',
            saleType: '매수',
            price: 10000,
            quantity: 1000,
            contractAmount: 10000000,
        },
        {
            stock: '종목2',
            saleType: '매도',
            price: 20000,
            quantity: 2000,
            contractAmount: 40000000,
        },
        {
            stock: '종목3',
            saleType: '매수',
            price: 30000,
            quantity: 3000,
            contractAmount: 90000000,
        },
        {
            stock: '종목4',
            saleType: '매도',
            price: 40000,
            quantity: 4000,
            contractAmount: 160000000,
        },

    ])
    return (
        <div className="row-span-1 grid grid-rows-6">
            <div className="row-span-1 flex items-center justify-between pl-2">
                <div className="rounded-t-lg bg-small-5 text-textColor-2"><span className="mx-1">매매 내역</span></div>
            </div>
            <table className="row-span-5 table-fixed overflow-y-auto block">
                <thead className="grid grid-cols-6 items-center m-1">
                    <tr className="col-span-6 grid grid-cols-6 items-center">
                        <th className="col-span-1 text-center mr-3">종목</th>
                        <th className="col-span-1 text-center">유형</th>
                        <th className="col-span-2">가격(수량)</th>
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