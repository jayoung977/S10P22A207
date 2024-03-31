import SingleReviewStore from "@/public/src/stores/profile/SingleReviewStore";

export default function SingleTradeHistory() {
  const { tradeList, selectedIndex } = SingleReviewStore();
  
  return (
    <div
      className="grid grid-rows-12 bg-small-10 m-1 rounded-md"
    >
      <div className="row-span-1 flex items-center justify-center">
        <div className="text-textColor-2">매매내역</div>
      </div>
      <table className="row-span-11 table-fixed rounded-md overflow-y-auto block">
        <thead className="grid grid-cols-6 items-center m-1">
          <tr className="col-span-6 grid grid-cols-6 items-center">
            <th className="col-span-2 text-center">유형</th>
            <th className="col-span-2 text-center">가격(수량)</th>
            <th className="col-span-2 text-center">이익</th>
          </tr>
        </thead>
        <tbody className="overflow-y-auto block" style={{ height: "calc(40vh)"}}>
          {
            tradeList[selectedIndex].singleLogTradeDtoList && tradeList[selectedIndex].singleLogTradeDtoList.length > 0 ? (
              tradeList[selectedIndex]?.singleLogTradeDtoList?.map((item :any, index :number) => (
                <tr key={index} className={`row-span-1 grid grid-cols-6 text-center ${item.tradeType == "BUY" ? "bg-red-300" : "bg-blue-300"} text-white rounded-lg m-1`}>
                  <td className="col-span-2">{item.tradeType}</td>
                  <td className="col-span-2">{item.price}{(item.amount)}</td>                      
                  <td className="col-span-2">{item.profit}</td>
                </tr>
              ))
            ) : (
              <div className="flex items-center justify-center mt-20">매매내역이 없습니다.</div>
            )
          }
        </tbody>
      </table>
    </div>
  );
}
