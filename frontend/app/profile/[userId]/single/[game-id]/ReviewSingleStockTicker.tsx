import SingleReviewStore from "@/public/src/stores/profile/SingleReviewStore";
export default function SingleStockTicker() {
  const { stockInfoDtoList, selectedIndex, setSelectedIndex, tradeList } = SingleReviewStore();
  
  return (
    <div className="row-span-6 grid grid-rows-11 bg-purple-200 m-1 rounded-md">
      <div className="row-span-1 flex items-center justify-center">
        <div className="text-textColor-2">종목</div>
      </div>
      <div className="row-span-10">
        {
          stockInfoDtoList?.map((item :any, index :number) => (
            <div 
              key={index} 
              className={`row-span-1 grid grid-cols-8 text-center  rounded-lg mb-1 mx-1 ${index == selectedIndex ? "bg-blue-400 text-white" : (tradeList[index].singleLogTradeDtoList.length > 0 ? "bg-sky-200 text-white" : "bg-white text-black")}`}
              onClick={() => {setSelectedIndex(index)}}
              style={{ cursor : "pointer" }}
            >
              <div className="col-span-3">{index+1}</div>
              <div className="col-span-5">{item.stockName}</div>
            </div>
          ))
        }
      </div>      
    </div>
  );
}
