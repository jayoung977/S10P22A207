"use client";
import userStore from "@/public/src/stores/user/userStore";
import { useParams } from "next/navigation";
import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import useClickSound from "@/public/src/components/clickSound/DefaultClick";
import socketStore from "@/public/src/stores/websocket/socketStore";

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
  } = socketStore();

  const params = useParams();
  const gameId = params["game_id"];
  const [stocksAmount, setStocksAmount] = useState(0);
  const playClickSound = useClickSound();

  function handleStocksChange(e: React.ChangeEvent<HTMLInputElement>) {
    playClickSound();
    if (Number(e.target.value) < 0) {
      e.target.value = "0";
    }
    let stocks = Number(e.target.value);
    setStocksAmount(stocks);
  }

  function handleTrade(stocksAmount: number, tradeType: string) {
    playClickSound();
    if (stocksAmount > 0) {
      axios({
        method: "post",
        url: `https://j10a207.p.ssafy.io/api/multi/${tradeType}`,
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
        },
        data: {
          gameId: gameId,
          roundNumber: roundNumber,
          amount: stocksAmount,
          day: day,
        },
      })
        .then((res) => {
          console.log(res.data);
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
        <div className="row-start-3 row-end-7 m-3">
          <div className="flex justify-between m-1">
            <div className="text-textColor-1">
              {tradeType == "buy" ? (
                <span className="text-small-3 mt-1">매수</span>
              ) : tradeType == "sell" ? (
                <span className="text-small-1 mt-1">매도</span>
              ) : tradeType == "short-selling" ? (
                <span className="text-small-10 mt-1">공매도</span>
              ) : (
                <span className="text-small-12 mt-1">공매도 청산</span>
              )}
              종목
            </div>
            <div className="text-textColor-1">C 화학</div>
          </div>
          <div className="flex justify-between m-1">
            <div>주문 단가</div>
            <div>80,700</div>
          </div>
          <div className="flex justify-between m-1">
            <div className="text-textColor-1">주문 가능 수량</div>
            <div className="text-textColor-1">123주</div>
          </div>
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
              onChange={handleStocksChange}
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
                onClose();
              }}
              className="col-start-2 col-end-4 rounded-full ml-1 text-red-500 bg-white border border-red-500"
            >
              취소
            </button>
            {tradeType == "buy" ? (
              <button
                onClick={() => {
                  handleTrade(stocksAmount, "buy");
                }}
                className="col-start-6 col-end-8 rounded-full mr-1 text-textColor-2 bg-small-3"
              >
                매수
              </button>
            ) : tradeType == "sell" ? (
              <button
                onClick={() => {
                  handleTrade(stocksAmount, "sell");
                }}
                className="col-start-6 col-end-8 rounded-full mr-1 text-textColor-2 bg-small-1"
              >
                매도
              </button>
            ) : tradeType == "short-selling" ? (
              <button
                onClick={() => {
                  handleTrade(stocksAmount, "short-selling");
                }}
                className="col-start-6 col-end-8 rounded-full mr-1 text-textColor-2 bg-small-10"
              >
                공매도
              </button>
            ) : (
              <button
                onClick={() => {
                  handleTrade(stocksAmount, "close-short");
                }}
                className="col-start-6 col-end-8 rounded-full mr-1 text-textColor-2 bg-small-12"
              >
                공매도 청산
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
