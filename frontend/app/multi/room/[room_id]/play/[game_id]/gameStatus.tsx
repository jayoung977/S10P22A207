import socketStore from "@/public/src/stores/websocket/socketStore";

//   setUnrealizedGain:(value) => set({ unrealizedGain: value }),
export default function GameStatus() {
  const {
    averagePrice,
    cash,
    initialAsset,
    profitMargin,
    shortAveragePrice,
    shortStockAmount,
    stockAmount,
    stockValue,
    todayEndPrice,
    totalAsset,
    totalPurchaseAmount,
    unrealizedGain,
  } = socketStore();
  return (
    <div className="border rounded-md m-1 bg-small-6 text-white row-span-7 grid grid-rows-6 gap-2 items-center">
      <div className="row-span-1 flex justify-center text-sm">
        <div>초기자산: {initialAsset.toLocaleString()}</div>
      </div>
      <div className="row-span-1">
        <div>총 평가 자산</div>
        <div
          className={`${profitMargin > 0 && `text-red-500`} ${
            profitMargin < 0 && `text-blue-500`
          } ${profitMargin == 0 && `text-white`}`}
        >
          {totalAsset.toLocaleString()}원
        </div>
        <div
          className={`${profitMargin > 0 && `text-red-500`} ${
            profitMargin < 0 && `text-blue-500`
          } ${profitMargin == 0 && `text-white`}`}
        >
          {unrealizedGain.toLocaleString()}원({profitMargin.toFixed(2)}%)
        </div>
      </div>
      <div className="row-span-1 grid grid-cols-12 text-sm">
        <div className="col-span-6">
          <div>보유 현금</div>
          <div>{cash.toLocaleString()}원</div>
        </div>
        <div className="col-span-6">
          <div>주식수</div>
          <div>{stockAmount}개</div>
        </div>
      </div>
      <div className="row-span-1 grid grid-cols-12 text-sm">
        <div className="col-span-6">
          <div>공매도 평균가</div>
          <div>{shortAveragePrice.toLocaleString()}원</div>
        </div>
        <div className="col-span-6">
          <div>공매도 잔고</div>
          <div>{shortStockAmount}개</div>
        </div>
      </div>
      <div className="row-span-1 grid grid-cols-12 text-sm">
        <div className="col-span-6">
          <div>주식 매입금</div>
          <div>{totalPurchaseAmount.toLocaleString()}원</div>
        </div>
        <div className="col-span-6">
          <div>평단가</div>
          <div>{averagePrice.toLocaleString()}원</div>
        </div>
      </div>
      <div className="row-span-1 grid grid-cols-12 text-sm">
        <div className="col-span-6">
          <div>주식 평가금</div>
          <div>{stockValue.toLocaleString()}원</div>
        </div>
        <div className="col-span-6">
          <div>현재가</div>
          <div>{todayEndPrice.toLocaleString()}원</div>
        </div>
      </div>
    </div>
  );
}
