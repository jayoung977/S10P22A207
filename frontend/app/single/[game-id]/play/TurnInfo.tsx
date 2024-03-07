'use client'
// 턴 정보, 매수 + 매도 버튼 컴포넌트
import { useState } from 'react';
import TurnNow from './TurnNow';
import BuySellModal from './BuySellModal';
import SingleGameEndModal from './SingleGameEndModal';

export default function TurnInfo () {
    const [turn, setTurn] = useState(0);
    const [isOpen, setIsOpen] = useState(false);

    const [isOpenEndModal, setIsOpenEndModal] = useState(false);

    const handleClickTurn = function () {
        if (turn == 50) {
            setIsOpenEndModal(true);
            setTurn(1);
        } else {
            setTurn(turn+1)
        }
    }
    return (
        <div className="row-start-1 row-end-2 grid grid-cols-3 border border-black">
            <div className="col-start-1 col-end-3 grid grid-rows-3 border border-black">
                <div className="row-start-1 row-end-3">
                    <div className="m-1">현재 턴 : {turn} / 50</div>
                    <TurnNow turn={turn} />
                </div>
                <div className="row-start-3 row-end-4 grid grid-cols-7 mb-1">
                    <button 
                        onClick={() => {setIsOpen(true)}} 
                        className="col-start-2 col-end-4 rounded-full text-white bg-red-600"
                    >
                        매수    
                    </button>
                    <button 
                        onClick={() => {setIsOpen(true)}} 
                        className="col-start-5 col-end-7 rounded-full text-white bg-blue-600"
                    >
                        매도   
                    </button>
                </div>
            </div>
            <button 
                onClick={() => {handleClickTurn()}} 
                className="col-start-3 col-end-4  rounded-full text-white border border-gray-400 bg-gray-400"
            >
                다음
            </button>
            <BuySellModal isOpen={isOpen} onClose={() =>setIsOpen(false) }/>
            <SingleGameEndModal isOpen={isOpenEndModal} onClose={() => setIsOpenEndModal(false)}/>
        </div>
    )
}