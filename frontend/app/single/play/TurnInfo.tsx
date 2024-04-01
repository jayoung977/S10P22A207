'use client'
// 턴 정보, 매수 + 매도 버튼 컴포넌트
import { useEffect } from 'react';
import SingleGameStore from '@/public/src/stores/single/SingleGameStore';
import TurnNow from './TurnNow';
import BuySellModal from './BuySellModal';
import SingleGameEndModal from './SingleGameEndModal';
import axios from 'axios';
import useClickSound from '@/public/src/components/clickSound/DefaultClick';

export default function TurnInfo () {
    const playClickSound = useClickSound();

    // 현재 턴
    const { turn, setTurn, gameIdx, setTotalAssetData, setAssetListData, setTodayStockInfoListData, setSingleGameEndInfoData, isBuySellModalOpen, setIsBuySellModalOpen, isBuy, setIsBuy, isOpenEndModal, setIsOpenEndModal,
            setStocks,
    } = SingleGameStore();

    // 매수버튼 클릭
    const handleSelectBuy = () => {
        playClickSound();
        setIsBuy(true);
        setIsBuySellModalOpen(true);
    }

    // 매도버튼 클릭
    const handleSelectSell = () => {
        playClickSound();
        setIsBuy(false);
        setIsBuySellModalOpen(true);
    }
    
    // 다음 턴으로 넘어가기
    const handleClickTurn = async () => {
        playClickSound();
        try {
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
                const stockInfoDtoList = response.data.result.stockInfoDtoList;
                setSingleGameEndInfoData({
                    initialAsset :stockInfoDtoList.initialAsset,
                    finalAsset :stockInfoDtoList.finalAsset,
                    netProfit :stockInfoDtoList.netProfit,
                    profitMargin :stockInfoDtoList.profitMargin,
                
                    startDate :stockInfoDtoList.StartDate,
                    endDate :stockInfoDtoList.endDate,
                
                    stockInfoDtoList :stockInfoDtoList.stockInfoDtoList,
                    singleGameChance :stockInfoDtoList.singleGameChance,
                })
                setIsOpenEndModal(true);
    
            } else {
                setTurn(turn+1);
                setTotalAssetData({
                    cash :response.data.result.cash,
                    resultProfit :response.data.result.resultProfit,
                    resultRoi :response.data.result.resultRoi,
                    totalPurchaseAmount :response.data.result.totalPurchaseAmount,
                    totalAsset :response.data.result.totalAsset,
                });
                if (response.data.result.assetList) {
                    setAssetListData(response.data.result.assetList);
                }
                if (response.data.result.NextDayInfo) {
                    setTodayStockInfoListData(response.data.result.NextDayInfo);
                }
            }

        } catch (error) {
            console.log(error);
        }
    }
    
    // 키보드 입력 처리 - 매수(q), 매도(w)
    const handleBuySellTurn = (e :KeyboardEvent) => {
        if (e.key === "q") {
            setStocks(0);
            handleSelectBuy();
        } else if (e.key === "w") {
            setStocks(0);
            handleSelectSell();
        } else if (e.key == "r" && !isBuySellModalOpen) {
            
            handleClickTurn();
            console.log('r누름')
        }
    }
    
    useEffect (() => {
        window.addEventListener('keydown', handleBuySellTurn);
    
        return () => {
            window.removeEventListener("keydown", handleBuySellTurn);

        }
    }, [turn, isBuySellModalOpen])
    
    return (
        <div className="row-start-1 row-end-2 grid grid-rows-2">
            <div className="row-span-1">
                <div className="m-1 text-textColor-1 text-center">현재 턴 : {turn} / 50</div>
                <TurnNow />
            </div>
            <div className="row-span-1 grid grid-cols-3 items-center justify-center">
                <button 
                    onClick={
                        handleSelectBuy
                    }
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
                    다음(R)
                </button>
            </div>
            <BuySellModal isBuy={isBuy}/>
            <SingleGameEndModal isOpen={isOpenEndModal} onClose={() => setIsOpenEndModal(false)} />
        </div>
    )
}