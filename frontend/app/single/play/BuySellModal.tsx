'use client'
import { useState, useEffect } from "react";
import SingleGameStore from "@/public/src/stores/single/SingleGameStore";
import axios from "axios";

// 매수, 매도 클릭 시 활성화되는 모달창
export default function BuySellModal({ isBuy } :{ isBuy :boolean }) {
    const { gameIdx, stockListData, selectedStockIndex, turn, assetListData, setAssetListData, totalAssetData, setTotalAssetData, setTradeListData, isBuySellModalOpen, setIsBuySellModalOpen } = SingleGameStore();
    const [stocks, setStocks] =  useState<number>(0) 
    const [disabled, setDisabled] = useState<boolean>(false);
    const [alertMessage, setAlertMessage] = useState<string>("");
    const foundAsset = assetListData?.find((x :any) => x.stockId === stockListData[selectedStockIndex].stockId);

    const handleStocksChange = (event: any) => {
        setStocks(event.target.value);
        if (isBuy) {
            if (0 > event.target.value || 0 == event.target.value) {
                setAlertMessage("매수하려는 주식 개수는 양수여야 합니다.")
                setDisabled(true);
            } else if (totalAssetData.cash < stockListData[selectedStockIndex].stockChartList[300+turn].endPrice * event.target.value) {
                setAlertMessage("보유 현금을 초과할 수 없습니다.")
                setDisabled(true);
            } else {
                setAlertMessage("");
                setDisabled(false);
            }
        } else {
            if (0 > event.target.value || 0 == event.target.value) {
                setAlertMessage("매도하려는 주식 개수는 양수여야 합니다.")
                setDisabled(true);
            } else {
                if (!foundAsset || foundAsset.stockAmount < event.target.value) {
                    setAlertMessage("보유 주식 수 보다 많은 개수는 매도가 불가합니다.")
                    setDisabled(true);
                } else {
                    setAlertMessage("");
                    setDisabled(false);
                }
            }
        }
    }

    const handleBuy = async () => {
        try {
            const response = await axios({
                method: "post",
                url: "https://j10a207.p.ssafy.io/api/single/buy",
                data: {
                    gameIdx: gameIdx,
                    stockId: stockListData[selectedStockIndex]?.stockId,
                    amount: stocks,
                    day: turn, 
                },
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
                },
            });
            setAssetListData(response.data.result.assetList);
            setTotalAssetData(response.data.result.totalAsset);
            setTradeListData(response.data.result.tradeList);
            setIsBuySellModalOpen(false);

        } catch (error) {
            console.log("Buy Error : ", error);
        }
      };

    const handleSell = async () => {
        try {
            const response = await axios({
                method: "post",
                url: "https://j10a207.p.ssafy.io/api/single/sell",
                data: {
                    gameIdx: gameIdx,
                    stockId: stockListData[selectedStockIndex]?.stockId,
                    amount: stocks,
                    day: turn, 
                },
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
                }
            });
            setAssetListData(response.data.result.assetList);
            setTotalAssetData(response.data.result.totalAsset);
            setTradeListData(response.data.result.tradeList);
            setStocks(0);
            setIsBuySellModalOpen(false);
        } catch (error) {
            console.log("Sell Error : ", error);
        }
    } 

    if (!isBuySellModalOpen) return null;
    return (
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="text-center bg-big-1 rounded shadow-lg grid grid-rows-12" style={{ width: '500px', height: '300px' }}>

            <div className="row-start-1 row-end-3">
                {
                   isBuy ? (
                       <span className="text-small-3">매수</span> 
                       ) : (
                       <span className="text-small-1">매도</span> 
                   ) 
                }
                주문
            </div>
            <hr></hr>
            <div className="row-start-3 row-end-7 m-3">
                <div className="flex justify-between m-1">
                    <div className="text-textColor-1">
                        {
                            isBuy ? (
                                <span className="text-small-3 mt-1">매수</span> 
                            ) : (
                                <span className="text-small-1 mt-1">매도</span>
                            )
                        }  
                        종목
                    </div>
                    <div className="text-textColor-1">{selectedStockIndex+1}번 종목</div>
                </div>
                <div className="flex justify-between m-1">
                    <div>주문 단가</div>
                    <div>{stockListData[selectedStockIndex].stockChartList[299+turn].endPrice}</div>
                </div>
                <div className="flex justify-between m-1">
                    <div className="text-textColor-1">주문 가능 수량</div>
                    {
                        isBuy ? (
                            <div className="text-textColor-1">{Math.floor(totalAssetData?.cash/stockListData[selectedStockIndex]?.stockChartList[300+turn].endPrice)}주</div>
                        ) : (
                            <div className="text-textColor-1">{assetListData[selectedStockIndex]?.stockAmount}</div>
                        )
                    }
                </div>
            </div>
            <div className="row-start-7 row-end-10 flex justify-center items-center gap-4 m-3">
                <div>
                    {
                        isBuy ? (
                            <label htmlFor="number-input" className="mb-2 font-medium text-small-3 dark:text-textColor-2">매수 수량:</label>
                        ) : (
                            <label htmlFor="number-input" className="mb-2 font-medium text-small-1 dark:text-textColor-2">매도 수량:</label>
                        )
                    }
                </div>
                <div>
                    <input 
                        type="number" 
                        id="number-input" 
                        defaultValue={isBuy ? 0 : assetListData[selectedStockIndex]?.stockAmount}
                        onChange={handleStocksChange}
                        aria-describedby="helper-text-explanation" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="수량 입력" required 
                    />
                    {
                        disabled && <div className="sm">{alertMessage}</div>
                    }
                </div>
            </div>
            <div className="row-start-10 row-end-13 grid grid-rows-3">
                <div className="row-start-1 row-end-3 grid grid-cols-8">
                    <button 
                        onClick={() => {
                            setStocks(0)
                            setIsBuySellModalOpen(false);
                        }} 
                        className="col-start-2 col-end-4 rounded-full ml-1 text-textColor-2 bg-small-10"
                    >
                        취소
                    </button>
                    {
                        isBuy ? (
                            <button 
                                onClick={() => {handleBuy()}}
                                disabled={disabled}
                                className={`col-start-6 col-end-8 rounded-full mr-1 text-textColor-2 ${disabled ? 'bg-red-300' : 'bg-small-3'}`}
                            >
                                매수
                            </button>
                        ) : (
                            <button 
                                onClick={() => {handleSell()}} 
                                disabled={disabled}
                                className={`col-start-6 col-end-8 rounded-full mr-1 text-textColor-2 ${disabled ? 'bg-blue-300' : 'bg-small-1'}`}
                            >
                                매도
                            </button>
                        )
                    }
                </div>
            </div>
        </div>
      </div>
    );
  }