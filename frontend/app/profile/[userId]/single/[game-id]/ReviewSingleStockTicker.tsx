import useClickSound from "@/public/src/components/clickSound/DefaultClick";
import SingleReviewStore from "@/public/src/stores/profile/SingleReviewStore";
import axios from "axios";

export default function SingleStockTicker() {
  const { stockInfoDtoList, selectedIndex, setSelectedIndex, tradeList, 
          setPositiveCount, setNegativeCount, setMaxPrice, setMinPrice, startDate, endDate, setMinPriceDate, setMaxPriceDate } =
    SingleReviewStore();
  const playClickSound = useClickSound();

  const handleClickStock = (index :number, stockCode :string) => {
    setSelectedIndex(index);
  }
  // const handleClickStock = async (index :number, stockCode :string) => {
  //   setSelectedIndex(index);
  //   try {
  //     fetchPositiveNegativeCount(stockCode);
  //     fetchMaxMin(stockCode)

  //   } catch (error) {
  //     console.log(error);
  //   }
  // }
  // 해당 stockCode 값을 가진 주식 종목의 등락률 개수
  const fetchPositiveNegativeCount = async (stockCode :string) => {
    try {
      const response = await axios({
        method: "get",
        url: `https://j10a207.p.ssafy.io/hadoop/stock/change-count/start-end?startDate=${startDate}&endDate=${endDate}&stockCode=${stockCode}`,
        headers: {
            Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
        }
      })
      console.log("하둡 등락 api 요청 결과 : ", response.data.result);
      setPositiveCount(response.data.result[0].positiveCount);
      setNegativeCount(response.data.result[0].negativeCount);
      
    } catch (error) {
      console.log("pos neg error : ", error);
    }
  }
  // 해당 stockCode 값을 가진 주식 종목의 max, min price를 가진 날짜 확인
  const fetchMinDay = async (stockCode :string, minPrice :number) => {
    try {
      const response = await axios({
        method: "get",
        url: `https://j10a207.p.ssafy.io/hadoop/stock/min-date?stockCode=${stockCode}&minPrice=${minPrice}&startDate=${startDate}&endDate=${endDate}`,
        headers: {
            Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
        }
      })
      console.log("하둡 최소 price 날짜 api 요청 결과 : ", response.data.result);
      const newDate :any = []
      response.data.result?.map((item :any, index :number) => {
        newDate.push({
          date : item.date,
          value : minPrice,
          stockCode : item.stockCode,
        })
      })
      setMinPriceDate(newDate);

    } catch (error) {
      console.log(error);
    }
  }
  const fetchMaxDay = async (stockCode :string, maxPrice :number) => {
    try {
      const response = await axios({
        method: "get",
        url: `https://j10a207.p.ssafy.io/hadoop/stock/max-date?stockCode=${stockCode}&maxPrice=${maxPrice}&startDate=${startDate}&endDate=${endDate}`,
        headers: {
            Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
        }
      })
      console.log("하둡 최대 price 날짜 api 요청 결과 : ", response.data.result);
      const newDate :any = []
      response.data.result?.map((item :any, index :number) => {
        newDate.push({
          date : item.date,
          value : maxPrice,
          stockCode : item.stockCode,
        })
      })
      setMaxPriceDate(newDate);
    } catch (error) {
      console.log(error);
    }
  }

  // 해당 stockCode 값을 가진 주식 종목의 min, max price 확인
  const fetchMaxMin = async (stockCode :string) => {
    try {
      const response1 = await axios({
        method: "get",
        url: `https://j10a207.p.ssafy.io/hadoop/stock/max-min?startDate=${startDate}&endDate=${endDate}&stockCode=${stockCode}`,
        headers: {
            Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
        }
      })
      console.log("하둡 최대 최소 api 요청 결과 : ", response1.data.result[0]);
      setMaxPrice(response1.data.result[0].maxPrice);
      setMinPrice(response1.data.result[0].minPrice);
      fetchMinDay(stockCode, response1.data.result[0].minPrice);
      fetchMaxDay(stockCode, response1.data.result[0].maxPrice);
    } catch (error) {
      console.log("max min error : ", error)
    }
  }

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
