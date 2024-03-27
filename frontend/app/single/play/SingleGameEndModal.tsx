'use client'
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation'
import SingleGameStore from '@/public/src/stores/single/SingleGameStore';
export default function SingleGameEndModal ({ isOpen, onClose, data }:any) {
    const [startMoney, setStartMoney] = useState<number>(0);
    const [endMoney, setEndMoney] = useState<number>(0);

    const router = useRouter();
    // api 요청
    // useEffect(() => {

    // }, [])
    if (!isOpen) return null;
    
    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="text-center bg-white rounded shadow-lg grid grid-rows-12" style={{ width: '500px', height: '300px' }}>
                <div className="row-start-1 row-end-3">게임 종료</div>
                <div className="row-start-3 row-end-11 m-3">
                    <div className="flex justify-between mt-2 mb-1">
                        <div>시작 금액</div>
                        {/* <div>{startMoney}</div> */}
                        <div>7,000,000</div>
                    </div>
                    <div className="flex justify-between mt-1 mb-2">
                        <div>종료 금액</div>
                        {/* <div>{endMoney}</div> */}
                        <div>9,000,000</div>
                    </div>
                    <hr></hr>
                    <div className="flex justify-between mt-2 mb-1">
                        <div>순이익</div>
                        {/* {
                            endMoney - startMoney > 0 ? (
                                <div>+{endMoney - startMoney}원</div>
                            ) : (
                                <div>-{startMoney - endMoney}원</div>
                            )
                        } */}
                        <div>+ 2,000,000원</div>
                    </div>
                    <div className="flex justify-between mt-1 mb-2">
                        <div>수익률</div>
                        {/* {
                            endMoney - startMoney > 0 ? (
                                <div>+{(((endMoney-startMoney)%startMoney) * 100).toFixed(1)}%</div>
                            ) : (
                                <div>{(((endMoney-startMoney)%startMoney) * 100).toFixed(1)}%</div>
                            )
                        } */}
                        <div>+ 28.6 %</div>
                    </div>
                </div>
                <div className="row-start-11 row-end-13 grid grid-rows-3">
                    <div className="row-start-2 row-end-3">
                        <button onClick={() => {
                            onClose();
                            router.push('/multi')
                            
                            }} className="rounded-full px-2 mb-2 text-white bg-gray-500">나가기</button>
                    </div>
                </div>
            </div>
        </div>
    )
}