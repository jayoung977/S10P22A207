import StockTrade from "./stockTrade"

export default function TradeHistory () {
  return(
    <div className="row-span-5 mt-1 rounded-md border text-sm">
      <div className="grid grid-cols-12 bg-small-1 rounded-t-md text-white items-center text-sm shadow-md">
        <div className="col-span-4"> 유형</div>
        <div className="col-span-4">
          <div>가격</div>
          <div>수량</div>
        </div>
        <div className="col-span-4">
          <div>체결금액</div>
          <div>체결수량</div>
        </div>
      </div>
      <div className='overflow-auto' style={{height: 'calc(30vh)'}}>
      <StockTrade/>
      <StockTrade/>
      <StockTrade/>
      <StockTrade/>
      <StockTrade/>
      <StockTrade/>
      <StockTrade/>
      <StockTrade/>
      <StockTrade/>
      </div>
    </div>
  )
}