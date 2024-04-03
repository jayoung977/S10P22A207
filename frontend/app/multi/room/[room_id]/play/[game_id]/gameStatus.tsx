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
    <div className="border rounded-md m-1 bg-small-9 text-white row-span-7 grid grid-rows-12 gap-2 items-center">
      <div className="row-span-1 flex justify-center text-sm">
        <div>초기자산: {initialAsset}</div>
      </div>
      <div className="row-span-4">
        <div>총 평가 자산</div>
        <div>{totalAsset}원</div>
        <div>{unrealizedGain}원({profitMargin}%)</div>
      </div>
      <div className="row-span-2 grid grid-cols-12 text-sm">
        <div className="col-span-6">
          <div>보유 현금</div>
          <div>{cash}원</div>
        </div>
        <div className="col-span-6">
          <div>주식수</div>
          <div>{stockAmount}</div>
        </div>
      </div>
      <div className="row-span-2 grid grid-cols-12 text-sm">
        <div className="col-span-6">
          <div>주식 매입금</div>
          <div>{totalPurchaseAmount}원</div>
        </div>
        <div className="col-span-6">
          <div>평단가</div>
          <div>{averagePrice}원</div>
        </div>
      </div>
      <div className="row-span-2 grid grid-cols-12 text-sm">
        <div className="col-span-6">
          <div>주식 평가금</div>
          <div>{stockValue}원</div>
        </div>
        <div className="col-span-6">
          <div>현재가</div>
          <div>{todayEndPrice}원</div>
        </div>
      </div>
    </div>
  );
}
