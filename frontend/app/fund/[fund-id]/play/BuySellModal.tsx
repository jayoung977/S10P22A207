'use client'
import { useState, useEffect } from "react";
import FundGameStore from "@/public/src/stores/fund/game/FundGameStore";
import axios from "axios";
import useClickSound from "@/public/src/components/clickSound/DefaultClick";
import { useParams } from "next/navigation";

// 매수, 매도 클릭 시 활성화되는 모달창
export default function BuySellModal({ isBuy } :{ isBuy :boolean }) {
    const { gameIdx, stockListData, selectedStockIndex, turn, assetListData, setAssetListData, totalAssetData, setTotalAssetData, setTradeListData, isBuySellModalOpen, setIsBuySellModalOpen,
            stocks, setStocks } = FundGameStore();

    const [disabled, setDisabled] = useState<boolean>(true);
    const [alertMessage, setAlertMessage] = useState<string>("");
    const foundAsset = assetListData?.find((x :any) => x.stockId === stockListData[selectedStockIndex].stockId);
    const playClickSound = useClickSound();
    const handleStockChange = (e :any) => {
        setStocks(e.target.value)
        if (isBuy) {
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

    const maxAvailableBuy = Math.floor(totalAssetData?.cash/(stockListData[selectedStockIndex]?.stockChartList[299+turn].endPrice * 1.0015))
    const handleSelectPer = (num :number) => {
        setDisabled(false);
        if (isBuy) {
            if (num == 25) {
                // const stockNumber = totalAssetData.cash
                // console.log(Math.floor(totalAssetData?.cash/stockListData[selectedStockIndex]?.stockChartList[300+turn].endPrice * 0.25));
                setStocks(Math.floor(maxAvailableBuy * 0.25))
                if (Math.floor(maxAvailableBuy * 0.25) > 0) {
                    setDisabled(false);
                } else {
                    setDisabled(true);
                }
            } else if (num == 50) {
                // console.log(Math.floor(totalAssetData?.cash/stockListData[selectedStockIndex]?.stockChartList[300+turn].endPrice * 0.5))
                setStocks(Math.floor(maxAvailableBuy * 0.5))
                if (Math.floor(maxAvailableBuy * 0.5) > 0) {
                    setDisabled(false);
                } else {
                    setDisabled(true);
                }
            } else if (num == 75) {
                // console.log(Math.floor(totalAssetData?.cash/stockListData[selectedStockIndex]?.stockChartList[300+turn].endPrice * 0.75))
                setStocks(Math.floor(maxAvailableBuy * 0.75))
                if (Math.floor(maxAvailableBuy * 0.75) > 0) {
                    setDisabled(false);
                } else {
                    setDisabled(true);
                }
            } else if (num == 100) {
                // console.log(Math.floor(totalAssetData?.cash/stockListData[selectedStockIndex]?.stockChartList[300+turn].endPrice ))
                setStocks(maxAvailableBuy)
                if (maxAvailableBuy > 0) {
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
        const params = useParams();
        console.log({
            fundId: params['fund-id'],
            gameIdx: gameIdx,
            stockId: stockListData[selectedStockIndex]?.stockId,
            amount: stocks,
            day: turn, 
        })
        try {
            const response = await axios({
                method: "post",
                url: "https://j10a207.p.ssafy.io/api/fund/game/buy",
                data: {
                    fundId: params['fund-id'],
                    gameIdx: gameIdx,
                    stockId: stockListData[selectedStockIndex]?.stockId,
                    amount: stocks,
                    day: turn, 
                },
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
                },
            });
            console.log("매수 : ", response.data.result);
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
        const params = useParams();
        try {
            const response = await axios({
                method: "post",
                url: "https://j10a207.p.ssafy.io/api/fund/game/sell",
                data: {
                    fundId: params['fund-id'],
                    gameIdx: gameIdx,
                    stockId: stockListData[selectedStockIndex]?.stockId,
                    amount: stocks,
                    day: turn, 
                },
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
                }
            });
            console.log("매도 : ", response.data.result);
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
            } else {
                if (event.key == "a") {
                    handleSelectPer(25);
                }
                else if (event.key == "s") {
                    handleSelectPer(50);
                }
                else if (event.key == "d") {
                    handleSelectPer(75);
                }
                else if (event.key == "f") {
                    handleSelectPer(100);
                }
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
            <div className="text-center bg-big-1 rounded shadow-lg grid grid-rows-12" style={{ width: '500px', height: '600px' }}>
                <div className="row-span-2 flex items-center justify-center text-5xl">
                    {
                        isBuy ? (
                            <span className="text-small-3">매수 </span> 
                            ) : (
                            <span className="text-small-1">매도 </span> 
                        ) 
                    }
                     주문
                </div>
                <hr></hr>
                <div className="row-span-4 grid grid-rows-4">
                    <div className="row-span-1 flex justify-between">
                        <div className="text-textColor-1 flex justify-start ml-5">
                            {
                                isBuy ? (
                                    <span className="text-small-3">매수 </span> 
                                ) : (
                                    <span className="text-small-1">매도 </span>
                                )
                            }  
                            종목
                        </div>
                        <div className="flex justify-end text-textColor-1 mr-5">{selectedStockIndex+1}번 종목</div>
                    </div>
                    <div className="row-span-1 flex justify-between">
                        <div className="flex justify-start ml-5">주문 단가</div>
                        <div className="flex justify-end mr-5">{stockListData[selectedStockIndex].stockChartList[299+turn].endPrice}</div>
                    </div>
                    <div className="row-span-1 flex justify-between">
                        <div className="flex justify-start text-textColor-1 ml-5">주문 가능 수량</div>
                        {
                            isBuy ? (
                                <div className="flex justify-end mr-5 text-textColor-1">{maxAvailableBuy}주</div>
                            ) : (
                                <div className="flex justify-end mr-5 text-textColor-1">{assetListData[selectedStockIndex]?.stockAmount}주</div>
                            )
                        }
                    </div>
                    <div className="row-span-1 grid grid-cols-4">
                        <button onClick={() => {handleSelectPer(25)}} className="col-span-1 items-center justify-center border border-black rounded-md my-2 mx-5">25%(a)</button>
                        <button onClick={() => {handleSelectPer(50)}} className="col-span-1 items-center justify-center border border-black rounded-md my-2 mx-5">50%(s)</button>
                        <button onClick={() => {handleSelectPer(75)}} className="col-span-1 items-center justify-center border border-black rounded-md my-2 mx-5">75%(d)</button>
                        <button onClick={() => {handleSelectPer(100)}} className="col-span-1 items-center justify-center border border-black rounded-md my-2 mx-5">100%(f)</button>
                    </div>
                </div>
                <div className="row-span-3 gap-4 m-3">
                    <div>
                        {
                            isBuy ? (
                                <label htmlFor="stocks" className="mb-2 font-medium text-small-3 dark:text-textColor-2">매수 수량</label>
                            ) : (
                                <label htmlFor="stocks" className="mb-2 font-medium text-small-1 dark:text-textColor-2">매도 수량</label>
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
                <div className="row-span-3 grid grid-rows-3">
                    <div className="row-start-1 row-end-3 grid grid-cols-8">
                        <button 
                            onClick={() => {
                                playClickSound();
                                handleEscape();
                            }} 
                            className="col-start-2 col-end-4 rounded-full ml-1 text-textColor-2 bg-small-10"
                        >
                            취소(esc)
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
                                    매수(enter)
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
                                    매도(enter)
                                </button>
                            )
                        }
                    </div>
                </div>
            </div>
        </div>
    );
  }