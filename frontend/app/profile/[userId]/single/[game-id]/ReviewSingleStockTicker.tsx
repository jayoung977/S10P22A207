import useClickSound from "@/public/src/components/clickSound/DefaultClick";
import SingleReviewStore from "@/public/src/stores/profile/SingleReviewStore";
import axios from "axios";

export default function SingleStockTicker() {
  const { stockInfoDtoList, selectedIndex, setSelectedIndex, tradeList, 
          setPositiveCount, setNegativeCount, setMaxPrice, setMinPrice, startDate, endDate } =
    SingleReviewStore();
  const playClickSound = useClickSound();
  
  // 해당 stockCode 값을 가진 주식 종목의 등락률 개수
  const fetchPositiveNegativeCount = async (stockCode :string, startDate :string, endDate :string) => {
    try {
      const response = await axios({
        method: "get",
        url: `https://zayoung21.store/hadoop/stock/change-count/start-end?startDate=${startDate}&endDate=${endDate}&stockCode=${stockCode}`,
        headers: {
            Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
        }
      })
      console.log("posneg : ", response.data.result);
      setPositiveCount(response.data.result[0].positiveCount);
      setNegativeCount(response.data.result[0].negativeCount);
      
    } catch (error) {
      console.log("pos neg error : ", error);
    }
  }  
  const handleClickStock = async (index :number, stockCode :string) => {
    setSelectedIndex(index);
    try {
      fetchPositiveNegativeCount(stockCode, startDate, endDate);
      // fetchMaxMin(stockCode)

    } catch (error) {
      console.log(error);
    }
  }
  // 해당 stockCode 값을 가진 주식 종목의 등락률 개수

  return (
    <div className="row-span-6 grid grid-rows-11 bg-purple-200 m-1 rounded-md">
      <div className="row-span-1 flex items-center justify-center">
        <div className="text-textColor-2">종목</div>
      </div>
      <div className="row-span-10">
        {
          stockInfoDtoList?.map((item :any, index :number) => (
            <div 
              key={item.stockCode} 
              className={`row-span-1 grid grid-cols-8 text-center rounded-lg mb-1 mx-1 ${index == selectedIndex ? "bg-purple-400 text-white" : (tradeList[index].singleLogTradeDtoList.length > 0 ? "bg-purple-300 text-white" : "bg-white text-black")}`}
              onClick={() => {handleClickStock(index, item.stockCode)}}
              style={{ cursor : "pointer" }}
            >
              <div className="col-span-1">{index+1}</div>
              <div className="col-span-7">{item.stockName}</div>
            </div>
          ))
        }
      </div>      
    </div>
  );
}
