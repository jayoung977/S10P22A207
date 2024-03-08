'use client'
import { useState } from 'react';
export default function QuizNow () {
    const [correctNum, setCorrectNum] = useState(0);
    const [seedMoney, setSeedMoney] = useState(0);

    return (
        <div className="row-span-2 grid grid-cols-12 border border-black items-center">
            <div className="col-start-4 col-end-10 border border-black grid grid-cols-12">
                <div className="col-start-2 col-end-4 text-start">{correctNum}/5</div>
                <div className="col-start-6 col-end-12 text-end">누적 시드 머니 : {seedMoney} 원</div>
            </div>
        </div>
    )
}