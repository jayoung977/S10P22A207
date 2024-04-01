'use client'
import { useState, useEffect } from "react";
import SingleGameStore from "@/public/src/stores/single/SingleGameStore";
import axios from "axios";
import useClickSound from "@/public/src/components/clickSound/DefaultClick";

// 매수, 매도 클릭 시 활성화되는 모달창
export default function BuySellModal({ isBuy } :{ isBuy :boolean }) {
    const { gameIdx, stockListData, selectedStockIndex, turn, assetListData, setAssetListData, totalAssetData, setTotalAssetData, setTradeListData, isBuySellModalOpen, setIsBuySellModalOpen,
            stocks, setStocks } = SingleGameStore();
    // const [stocks, setStocks] =  useState<any>(0) 
    const [disabled, setDisabled] = useState<boolean>(true);
    const [alertMessage, setAlertMessage] = useState<string>("");
    const foundAsset = assetListData?.find((x :any) => x.stockId === stockListData[selectedStockIndex].stockId);
    const playClickSound = useClickSound();
    
    const handleStockChange = (e :any) => {
        setStocks(e.target.value)
        if (isBuy) {
            console.log('zz', stockListData[selectedStockIndex].stockChartList[299+turn].endPrice);
            if (e.target.value < 0 || e.target.value == 0) {
                setAlertMessage("매매하려는 주식 개수는 양수여야 합니다.")
                setDisabled(true);
            } else if (totalAssetData.cash < stockListData[selectedStockIndex].stockChartList[299+turn].endPrice * e.target.value) {
                setAlertMessage("보유 현금을 초과했습니다.")
                setDisabled(true)
            } else {
                setDisabled(false);
            }
        } else {
            if (e.target.value < 0 || e.target.value == 0) {
                setAlertMessage("매매하려는 주식 개수는 양수여야 합니다.")
                setDisabled(true);
            } else if (!foundAsset || e.target.value > foundAsset.stockAmount) {
                setAlertMessage("해당 종목 보유 개수를 초과했습니다.")
                setDisabled(true);
            } else {
                setDisabled(false);
            }
        }
    }

    const handleSelectPer = (num :number) => {
        setDisabled(false);
        if (isBuy) {
            if (num == 25) {
                // const stockNumber = totalAssetData.cash
                // console.log(Math.floor(totalAssetData?.cash/stockListData[selectedStockIndex]?.stockChartList[300+turn].endPrice * 0.25));
                setStocks(Math.floor(totalAssetData?.cash/stockListData[selectedStockIndex]?.stockChartList[299+turn].endPrice * 0.25))
                if (Math.floor(totalAssetData?.cash/stockListData[selectedStockIndex]?.stockChartList[299+turn].endPrice * 0.25) > 0) {
                    setDisabled(false);
                } else {
                    setDisabled(true);
                }
            } else if (num == 50) {
                // console.log(Math.floor(totalAssetData?.cash/stockListData[selectedStockIndex]?.stockChartList[300+turn].endPrice * 0.5))
                setStocks(Math.floor(totalAssetData?.cash/stockListData[selectedStockIndex]?.stockChartList[299+turn].endPrice * 0.5))
                if (Math.floor(totalAssetData?.cash/stockListData[selectedStockIndex]?.stockChartList[299+turn].endPrice * 0.5) > 0) {
                    setDisabled(false);
                } else {
                    setDisabled(true);
                }
            } else if (num == 75) {
                // console.log(Math.floor(totalAssetData?.cash/stockListData[selectedStockIndex]?.stockChartList[300+turn].endPrice * 0.75))
                setStocks(Math.floor(totalAssetData?.cash/stockListData[selectedStockIndex]?.stockChartList[299+turn].endPrice * 0.75))
                if (Math.floor(totalAssetData?.cash/stockListData[selectedStockIndex]?.stockChartList[299+turn].endPrice * 0.75) > 0) {
                    setDisabled(false);
                } else {
                    setDisabled(true);
                }
            } else if (num == 100) {
                // console.log(Math.floor(totalAssetData?.cash/stockListData[selectedStockIndex]?.stockChartList[300+turn].endPrice ))
                setStocks(Math.floor(totalAssetData?.cash/stockListData[selectedStockIndex]?.stockChartList[299+turn].endPrice))
                if (Math.floor(totalAssetData?.cash/stockListData[selectedStockIndex]?.stockChartList[299+turn].endPrice) > 0) {
                    setDisabled(false);
                } else {
                    setDisabled(true);
                }
            }
        }
        else if (!isBuy) {
            if (num == 25) {
                // const stockNumber = totalAssetData.cash
                // console.log(Math.floor(assetListData[selectedStockIndex]?.stockAmount * 0.25))
                setStocks(Math.floor(assetListData[selectedStockIndex]?.stockAmount * 0.25))
                if (Math.floor(assetListData[selectedStockIndex]?.stockAmount * 0.25) > 0) {
                    setDisabled(false);
                } else {
                    setDisabled(true);
                }
            } else if (num == 50) {
                // console.log(Math.floor(assetListData[selectedStockIndex]?.stockAmount * 0.5))
                setStocks(Math.floor(assetListData[selectedStockIndex]?.stockAmount * 0.5))
                if (Math.floor(assetListData[selectedStockIndex]?.stockAmount * 0.5) > 0) {
                    setDisabled(false);
                } else {
                    setDisabled(true);
                }
            } else if (num == 75) {
                // console.log(Math.floor(assetListData[selectedStockIndex]?.stockAmount * 0.75))
                setStocks(Math.floor(assetListData[selectedStockIndex]?.stockAmount * 0.75))
                if (Math.floor(assetListData[selectedStockIndex]?.stockAmount * 0.75) > 0) {
                    setDisabled(false);
                } else {
                    setDisabled(true);
                }
            } else if (num == 100) {
                console.log(assetListData[selectedStockIndex]?.stockAmount)
                setStocks(assetListData[selectedStockIndex]?.stockAmount)
                if (assetListData[selectedStockIndex]?.stockAmount > 0) {
                    setDisabled(false);
                } else {
                    setDisabled(true);
                }
            }
        }
    }



    const handleEscape = () => {
        setStocks(0);
        setDisabled(true);
        setIsBuySellModalOpen(false);
    }

    const handleBuy = async () => {
        // console.log("stocks : ", stocks);
        console.log('zz', stockListData[selectedStockIndex].stockChartList[299+turn].endPrice);

        console.log({
            gameIdx: gameIdx,
            stockId: stockListData[selectedStockIndex]?.stockId,
            amount: stocks,
            day: turn, 
        })
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
            console.log(response.data.result);
            setAssetListData(response.data.result.assetList);
            setTotalAssetData(response.data.result.totalAsset);
            setTradeListData(response.data.result.tradeList);
            handleEscape();
        
        } catch (error) {
            console.log("Buy Error : ", error);
        }
      };

    const handleSell = async () => {
        console.log("stocks : ", stocks);
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
            handleEscape();
        } catch (error) {
            console.log("Sell Error : ", error);
        }
    } 

    useEffect(() => {
        const handleKeyPress = (event :KeyboardEvent) => {
            if (event.key == "Enter") {
                if (isBuy == true) {
                    handleBuy();
                } else {
                    handleSell();
                }
            } 
            else if (event.key == "Escape") {
                handleEscape();
            }
        }
        document.addEventListener("keydown", handleKeyPress);

        return () => {
            document.removeEventListener("keydown", handleKeyPress);
        }
    }, [isBuy, handleBuy, handleSell])

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
                                <div className="text-textColor-1">{Math.floor(totalAssetData?.cash/stockListData[selectedStockIndex]?.stockChartList[299+turn].endPrice)}주</div>
                            ) : (
                                <div className="text-textColor-1">{assetListData[selectedStockIndex]?.stockAmount}</div>
                            )
                        }
                    </div>
                    <div>
                        <button onClick={() => {handleSelectPer(25)}}>25%</button>
                        <button onClick={() => {handleSelectPer(50)}}>50%</button>
                        <button onClick={() => {handleSelectPer(75)}}>75%</button>
                        <button onClick={() => {handleSelectPer(100)}}>100%</button>
                    </div>
                </div>
                <div className="row-start-7 row-end-10 flex justify-center items-center gap-4 m-3">
                    <div>
                        {
                            isBuy ? (
                                <label htmlFor="stocks" className="mb-2 font-medium text-small-3 dark:text-textColor-2">매수 수량:</label>
                            ) : (
                                <label htmlFor="stocks" className="mb-2 font-medium text-small-1 dark:text-textColor-2">매도 수량:</label>
                            )
                        }
                    </div>
                    <div>
                        <input 
                            type="number" 
                            id="stocks" 
                            value={stocks}
                            onChange={(e) => {handleStockChange(e)}}
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
                            onClick={() => {handleEscape()}} 
                            className="col-start-2 col-end-4 rounded-full ml-1 text-textColor-2 bg-small-10"
                        >
                            취소(esc)
                        </button>
                        {
                            isBuy ? (
                                <button 
                                    onClick={() => {handleBuy()}}
                                    disabled={disabled}
                                    className={`col-start-6 col-end-8 rounded-full mr-1 text-textColor-2 ${disabled ? 'bg-red-300' : 'bg-small-3'}`}
                                >
                                    매수(enter)
                                </button>
                            ) : (
                                <button 
                                    onClick={() => {handleSell()}} 
                                    disabled={disabled}
                                    className={`col-start-6 col-end-8 rounded-full mr-1 text-textColor-2 ${disabled ? 'bg-blue-300' : 'bg-small-1'}`}
                                >
                                    매도(enter)
                                </button>
                            )
                        }
                    </div>
                </div>
                <div className="row-start-10 row-end-13 grid grid-rows-3">
                    <div className="row-start-1 row-end-3 grid grid-cols-8">
                        <button 
                            onClick={() => {
                                playClickSound();
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
                                    onClick={() => {
                                        playClickSound();
                                        handleBuy()
                                    }}
                                    disabled={disabled}
                                    className={`col-start-6 col-end-8 rounded-full mr-1 text-textColor-2 ${disabled ? 'bg-red-300' : 'bg-small-3'}`}
                                >
                                    매수
                                </button>
                            ) : (
                                <button 
                                    onClick={() => {
                                        playClickSound();
                                        handleSell()
                                    }} 
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