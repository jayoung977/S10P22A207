'use client'
// 턴 정보, 매수 + 매도 버튼 컴포넌트
import { useState, useEffect } from 'react';
import SingleGameStore from '@/public/src/stores/single/SingleGameStore';
import TurnNow from './TurnNow';
import BuySellModal from './BuySellModal';
import SingleGameEndModal from './SingleGameEndModal';
import axios from 'axios';


export default function TurnInfo () {
     // 현재 턴
     const { turn, setTurn, gameIdx, setTotalAssetData, setTodayStockInfoListData } = SingleGameStore();
     // 매수 / 매도 모달창 open 여부
     const [isOpenSaleModal, setIsOpenSaleModal] = useState<boolean>(false);
     // 매수 or 매도 선택 (true면 매수)
     const [isBuy, setIsBuy] = useState<boolean>(true);
     // 싱글 게임 종료 모달창 open 여부
     const [isOpenEndModal, setIsOpenEndModal] = useState<boolean>(false);
     const [gameEndData, setGameEndData] = useState<any>([]);
 
     // 매수버튼 클릭
     const handleSelectBuy = () => {
         setIsBuy(true);
         setIsOpenSaleModal(true);
     }
 
     // 매도버튼 클릭
     const handleSelectSell = () => {
         setIsBuy(false);
         setIsOpenSaleModal(true);
     }
 
     // 키보드 입력 처리
     const handleBuySellNext = (e: KeyboardEvent) => {
         if (e.key === "q") {
             handleSelectBuy();
         } else if (e.key === "w") {
             handleSelectSell();
         } else if (e.key == "e") {
            handleClickTurn();
         }
     }
 
     // 다음 턴으로 넘어가기
     const handleClickTurn = async () => {
        const response = await axios(
            {
                method: "post",
                url : 'https://j10a207.p.ssafy.io/api/single/tomorrow', 
                data: {
                    gameIdx: gameIdx,
                    day: turn+1
                },
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`
                }
            })
        if (turn == 50) {
            console.log("single game end data : ", response.data.result);
        
        } else {
            console.log("single game next turn data : ", response.data.result);
            setTotalAssetData({
                cash :response.data.result.cash,
                resultProfit :response.data.result.resultProfit,
                resultRoi :response.data.result.resultRoi,
                totalPurchaseAmount :response.data.result.totalPurchaseAmount,
                totalAsset :response.data.result.totalAsset,
            });
            setTodayStockInfoListData(response.data.result.NextDayInfo);
            setTurn(turn+1);
            }
        }
 
     useEffect(() => {
         // 전역 키 이벤트 리스너 설정
         const handleKeyPress = (e :KeyboardEvent) => {
            handleBuySellNext(e);
         };
 
         window.addEventListener('keydown', handleKeyPress);
 
         // 컴포넌트 언마운트 시 리스너 제거
         return () => {
             window.removeEventListener('keydown', handleKeyPress);
         };
     }, [turn]); // 의존성 배열에 turn을 추가하여 턴이 변경될 때마다 이벤트 리스너가 최신 상태를 참조하도록 함
    return (
        <div className="row-start-1 row-end-2 grid grid-rows-2">
            <div className="row-span-1">
                <div className="m-1 text-textColor-1 text-center">현재 턴 : {turn} / 50</div>
                <TurnNow />
            </div>
            <div className="row-span-1 grid grid-cols-3 items-center justify-center">
                <button 
                    onClick={handleSelectBuy}
                    className="col-span-1 rounded-md scale-95 text-small-3 bg-textColor-2 border border-small-3 m-2 hover:text-textColor-2 hover:bg-small-3 hover:scale-105 shadow-md shadow-small-3 ease-in-out duration-500"
                >
                    매수(Q)    
                </button>
                <button 
                    onClick={handleSelectSell}
                    className="col-span-1 rounded-md scale-95 text-small-1 bg-textColor-2 border border-small-1 m-2 hover:text-textColor-2 hover:bg-small-1 hover:scale-105 shadow-md shadow-small-1 ease-in-out duration-500"
                >
                    매도(W)   
                </button>
                <button 
                    onClick={handleClickTurn} 
                    className="col-span-1 rounded-md scale-95 text-textColor-1 bg-textColor-2 border border-textColor-1 m-2 hover:text-textColor-2 hover:bg-textColor-1 hover:scale-105 shadow-md shadow-textColor-1"
                >
                    다음(E)
                </button>
            
            </div>
            <BuySellModal isBuy={isBuy} isOpen={isOpenSaleModal} onClose={() => setIsOpenSaleModal(false) }/>
            <SingleGameEndModal isOpen={isOpenEndModal} onClose={() => setIsOpenEndModal(false)} data={gameEndData}/>
        </div>
    )
}