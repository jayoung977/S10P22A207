import StockTrade from "./stockTrade";
import socketStore from "@/public/src/stores/websocket/socketStore";
export default function TradeHistory() {
  const { tradeList } = socketStore();
  return (
    <div className="row-span-5 mt-1 rounded-md border text-sm">
      <div className="grid grid-cols-12 bg-small-1 rounded-t-md text-white items-center text-sm shadow-md">
        <div className="col-span-4"> 거래일</div>
        <div className="col-span-4">
          <div>가격(수량)</div>
        </div>
        <div className="col-span-4">
          <div>거래유형</div>
        </div>
      </div>
      <div className="overflow-auto" style={{ height: "calc(30vh)" }}>
        {tradeList.map((trade, i) => {
          return <StockTrade trade={trade} />;
        })}
      </div>
    </div>
  );
}
