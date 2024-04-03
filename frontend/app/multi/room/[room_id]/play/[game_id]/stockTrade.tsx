interface TradeListType {
  amount: number;
  day: number;
  price: number;
  profit: number;
  round: number;
  stockId: number;
  tradeType: String;
}

export default function StockTrade({ trade }: { trade: TradeListType }) {
  return (
    <div className="grid grid-cols-12 border text-sm">
      <div className="col-span-4">
        <div>{trade.day}/50</div>
      </div>
      <div className="col-span-4">
        <div>
          {trade.price}({trade.amount})
        </div>
      </div>
      <div className="col-span-4">
        <div>{trade.tradeType}</div>
      </div>
    </div>
  );
}
