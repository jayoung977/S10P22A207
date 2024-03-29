import SingleReviewStore from "@/public/src/stores/profile/SingleReviewStore";
export default function SingleStockTicker() {
  const { stockInfoDtoList, selectedIndex, setSelectedIndex } = SingleReviewStore();
  
  return (
    <div className="row-span-7 grid grid-rows-11 bg-purple-200 m-1 rounded-md">
      <div className="row-span-1 flex items-center justify-center">
        <div className="text-textColor-2">종목</div>
      </div>
      <div className="row-span-10 overflow-y-auto block" style={{ height: "calc(46vh)"}}>
        {
          stockInfoDtoList?.map((item :any, index :number) => (
            <div 
              key={index} 
              className="row-span-1 grid grid-cols-8 text-center bg-white rounded-lg mb-2 mx-2"
              onClick={() => {setSelectedIndex(index)}}
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
