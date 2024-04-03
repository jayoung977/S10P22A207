"use client";
import userStore from "@/public/src/stores/user/userStore";
import { useParams } from "next/navigation";
import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import useClickSound from "@/public/src/components/clickSound/DefaultClick";
import socketStore from "@/public/src/stores/websocket/socketStore";
import { useEffect } from "react";
import multigameStore from "@/public/src/stores/multi/MultiGameStore";


// 매수, 매도 클릭 시 활성화되는 모달창
export default function TradeModal({ tradeType, isOpen, onClose }: any) {
  const {
    roundNumber,
    day,
    setAveragePrice,
    setCash,
    setInitialAsset,
    setProfitMargin,
    setShortAveragePrice,
    setShortStockAmount,
    setStockAmount,
    setStockValue,
    setTodayEndPrice,
    setTotalAsset,
    setTotalPurchaseAmount,
    setTradeList,
    setUnrealizedGain,
    cash,
    stockAmount,
    shortStockAmount,
    todayEndPrice,
  } = socketStore();

  const params = useParams();
  const gameId = params["game_id"];
  const { tradeStocksAmount,
          setTradeStocksAmount,
          isAvailableTradeStocks,
          setIsAvailableTradeStocks } = multigameStore();
  const playClickSound = useClickSound();
  const [disabled, setDisabled] = useState<boolean>(true);

  function handleStocksChange(e: React.ChangeEvent<HTMLInputElement>) {
    playClickSound();
    const value = e.target.value;
    const stocks = value === '' ? 0 : Math.max(0, Number(value));
    setTradeStocksAmount(stocks);
  }

  const handleEscape = () => {
    setTradeStocksAmount(0);
    setDisabled(true);
    onClose();
  }


  const handleSelectPer = (num :number) => {
    setDisabled(false);

      if (num == 25) {
          setTradeStocksAmount(Math.floor(isAvailableTradeStocks * 0.25))
          if (Math.floor(isAvailableTradeStocks * 0.25) > 0) {
              setDisabled(false);
          } else {
              setDisabled(true);
          }
      } else if (num == 50) {
          setTradeStocksAmount(Math.floor(isAvailableTradeStocks * 0.5))
          if (Math.floor(isAvailableTradeStocks * 0.5) > 0) {
              setDisabled(false);
          } else {
              setDisabled(true);
          }
      } else if (num == 75) {
          setTradeStocksAmount(Math.floor(isAvailableTradeStocks * 0.75))
          if (Math.floor(isAvailableTradeStocks * 0.75) > 0) {
              setDisabled(false);
          } else {
              setDisabled(true);
          }
      } else if (num == 100) {
          setTradeStocksAmount(isAvailableTradeStocks)
          if (isAvailableTradeStocks > 0) {
              setDisabled(false);
          } else {
              setDisabled(true);
          }
      }
  }

  function handleTrade(tradeStocksAmount: number, tradeType: string) {
    playClickSound();
    if (tradeStocksAmount > 0) {
      axios({
        method: "post",
        url: `https://j10a207.p.ssafy.io/api/multi/${tradeType}`,
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
        },
        data: {
          gameId: gameId,
          roundNumber: roundNumber,
          amount: tradeStocksAmount,
          day: day,
        },
      })
        .then((res) => {
          // console.log(res.data);
          if (res.data.result != undefined) {
            setAveragePrice(res.data.result.averagePrice);
            setCash(res.data.result.cash);
            setInitialAsset(res.data.result.initialAsset);
            setProfitMargin(res.data.result.profitMargin);
            setShortAveragePrice(res.data.result.shortAveragePrice);
            setShortStockAmount(res.data.result.shortStockAmount);
            setStockAmount(res.data.result.stockAmount);
            setStockValue(res.data.result.stockValue);
            setTodayEndPrice(res.data.result.todayEndPrice);
            setTotalAsset(res.data.result.totalAsset);
            setTotalPurchaseAmount(res.data.result.totalPurchaseAmount);
            setTradeList(res.data.result.tradeList);
            if (res.data.result.unrealizedGain != undefined) {
              setUnrealizedGain(res.data.result.unrealizedGain);
            }
          }
          onClose();
          setTradeStocksAmount(0);
        })
        .catch((err) => {
          console.error(err);
        });
    } else {
      Swal.fire({
        text: "최소 1주 이상 기입해주세요",
        icon: "error",
      });
    }
  }

  useEffect(() => {
    const handleKeyPress = (event :KeyboardEvent) => {
        if (event.key == "Enter") {
          handleTrade(tradeStocksAmount, tradeType)
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
}, [handleTrade])



  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div
        className="text-center bg-big-1 rounded shadow-lg grid grid-rows-12"
        style={{ width: "500px", height: "300px" }}
      >
        <div className="row-start-1 row-end-3">
          {tradeType == "buy" ? (
            <span className="text-small-3">매수</span>
          ) : tradeType == "sell" ? (
            <span className="text-small-1">매도</span>
          ) : tradeType == "short-selling" ? (
            <span className="text-small-10">공매도</span>
          ) : (
            <span className="text-small-12">공매도 청산</span>
          )}
          주문
        </div>
        <hr></hr>
        <div className="row-start-3 row-end-6 m-3">
          <div className="flex justify-between m-1">
            <div>주문 단가</div>
            <div>{todayEndPrice}</div>
          </div>
          <div className="flex justify-between m-1">
            <div className="text-textColor-1">주문 가능 수량</div>
              <div className="text-textColor-1">
              {isAvailableTradeStocks}주
              </div>
          </div>
        </div>
        <div className="row-start-6 row-end-7 grid grid-cols-4">
            <button onClick={() => {handleSelectPer(25)}} className="col-span-1 items-center justify-center border border-black rounded-md my-2 mx-5">25%(a)</button>
            <button onClick={() => {handleSelectPer(50)}} className="col-span-1 items-center justify-center border border-black rounded-md my-2 mx-5">50%(s)</button>
            <button onClick={() => {handleSelectPer(75)}} className="col-span-1 items-center justify-center border border-black rounded-md my-2 mx-5">75%(d)</button>
            <button onClick={() => {handleSelectPer(100)}} className="col-span-1 items-center justify-center border border-black rounded-md my-2 mx-5">100%(f)</button>
        </div>
        <div className="row-start-7 row-end-10 flex justify-center items-center gap-4 m-3">
          <div>
            {tradeType == "buy" ? (
              <label
                htmlFor="number-input"
                className="mb-2 font-medium text-small-3 dark:text-textColor-2"
              >
                매수 수량:
              </label>
            ) : tradeType == "sell" ? (
              <label
                htmlFor="number-input"
                className="mb-2 font-medium text-small-1 dark:text-textColor-2"
              >
                매도 수량:
              </label>
            ) : tradeType == "short-selling" ? (
              <label
                htmlFor="number-input"
                className="mb-2 font-medium text-small-10 dark:text-textColor-2"
              >
                공매도 수량:
              </label>
            ) : (
              <label
                htmlFor="number-input"
                className="mb-2 font-medium text-small-12 dark:text-textColor-2"
              >
                공매도 청산수량:
              </label>
            )}
          </div>
          <div>
            <input
              type="number"
              id="number-input"
              value={tradeStocksAmount || ''}
              onChange={(e) => {handleStocksChange(e)}}
              aria-describedby="helper-text-explanation"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="수량 입력"
              required
            />
          </div>
        </div>
        <div className="row-start-10 row-end-13 grid grid-rows-3">
          <div className="row-start-1 row-end-3 grid grid-cols-8">
            <button
              onClick={() => {
                handleEscape();
                onClose();
              }}
              className="col-start-2 col-end-4 rounded-full ml-1 text-red-500 bg-white border border-red-500"
            >
              취소(esc)
            </button>
            {tradeType == "buy" ? (
              <button
                onClick={() => {
                  playClickSound()
                  handleTrade(tradeStocksAmount, "buy");
                }}
                className="col-start-6 col-end-8 rounded-full mr-1 text-textColor-2 bg-small-3"
              >
                매수(enter)
              </button>
            ) : tradeType == "sell" ? (
              <button
                onClick={() => {
                  playClickSound()
                  handleTrade(tradeStocksAmount, "sell");
                }}
                className="col-start-6 col-end-8 rounded-full mr-1 text-textColor-2 bg-small-1"
              >
                매도(enter)
              </button>
            ) : tradeType == "short-selling" ? (
              <button
                onClick={() => {
                  playClickSound()
                  handleTrade(tradeStocksAmount, "short-selling");
                }}
                className="col-start-6 col-end-8 rounded-full mr-1 text-textColor-2 bg-small-10"
              >
                공매도(enter)
              </button>
            ) : (
              <button
                onClick={() => {
                  playClickSound()
                  handleTrade(tradeStocksAmount, "close-short");
                }}
                className="col-start-6 col-end-8 rounded-full mr-1 text-textColor-2 bg-small-12"
              >
                공매도 청산(enter)
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
