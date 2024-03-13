'use client'
// 턴 정보, 매수 + 매도 버튼 컴포넌트
import { useState } from 'react';
import SingleGameStore from '@/public/src/stores/single/singleGameStore';
import TurnNow from './TurnNow';
import BuySellModal from './BuySellModal';
import SingleGameEndModal from './SingleGameEndModal';

export default function TurnInfo () {
    // 현재 턴
    const { turn, setTurn } = SingleGameStore();
    // const [turn, setTurn] = useState<number>(0);
    // 매수 / 매도 모달창 open 여부
    const [isOpenSaleModal, setIsOpenSaleModal] = useState<boolean>(false);
    // 매수 or 매도(true시 매수)
    const [isBuy, setIsBuy] = useState<boolean>(true);

    // 싱글 게임 종료 모달창 open 여부
    const [isOpenEndModal, setIsOpenEndModal] = useState<boolean>(false);

    const handleClickTurn = function () {
        if (turn == 50) {
            setIsOpenEndModal(true);
            setTurn(1);
        } else {
            setTurn(turn+1)
            console.log(turn);

        }
    }
    return (
        <div className="row-start-1 row-end-2 grid grid-cols-3 border border-black">
            <div className="col-start-1 col-end-3 grid grid-rows-3 border border-black">
                <div className="row-start-1 row-end-3">
                    <div className="m-1 text-textColor-1">현재 턴 : {turn} / 50</div>
                    <TurnNow turn={turn} />
                </div>
                <div className="row-start-3 row-end-4 grid grid-cols-7 mb-1">
                    <button 
                        onClick={() => {
                            setIsBuy(true);
                            setIsOpenSaleModal(true);
                        }} 
                        className="col-start-2 col-end-4 rounded-full text-textColor-2 bg-small-3"
                    >
                        매수    
                    </button>
                    <button 
                        onClick={() => {
                            setIsBuy(false);
                            setIsOpenSaleModal(true);
                        }} 
                        className="col-start-5 col-end-7 rounded-full text-textColor-2 bg-small-1"
                    >
                        매도   
                    </button>
                </div>
            </div>
            <button 
                onClick={() => {handleClickTurn()}} 
                className="col-start-3 col-end-4  rounded-full text-textColor-1 border bg-small-14"
            >
                다음
            </button>
            <BuySellModal isBuy={isBuy} isOpen={isOpenSaleModal} onClose={() =>setIsOpenSaleModal(false) }/>
            <SingleGameEndModal isOpen={isOpenEndModal} onClose={() => setIsOpenEndModal(false)}/>
        </div>
    )
}