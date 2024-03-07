export default function MultiTradeHistroy() {
  return (
    <div className="border border-black row-span-6 grid grid-rows-6">
      <div className="border border-black row-span-1 grid grid-cols-3">
        <div className="col-span-1">유형</div>
        <div className="col-span-1">가격(수량)</div>
        <div className="col-span-1">체결금액</div>
      </div>
      <div className=" border border-black row-span-5 grid grid-rows-4">
        <div className="row-span-1 grid grid-cols-3">
          <div className="col-span-1">매수</div>
          <div className="col-span-1">5,654(1000)</div>
          <div className="col-span-1">5,654,000</div>
        </div>
        <div className="row-span-1 grid grid-cols-3">
          <div className="col-span-1">매수</div>
          <div className="col-span-1">5,654(1000)</div>
          <div className="col-span-1">5,654,000</div>
        </div>
        <div className="row-span-1 grid grid-cols-3">
          <div className="col-span-1">매수</div>
          <div className="col-span-1">5,654(1000)</div>
          <div className="col-span-1">5,654,000</div>
        </div>
        <div className="row-span-1 grid grid-cols-3">
          <div className="col-span-1">매수</div>
          <div className="col-span-1">5,654(1000)</div>
          <div className="col-span-1">5,654,000</div>
        </div>
      </div>
    </div>
  );
}
