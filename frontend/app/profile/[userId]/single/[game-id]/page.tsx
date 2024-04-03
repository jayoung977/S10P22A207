"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation"; // useParams 대신 useRouter를 사용
import { useQuery, QueryClient, QueryClientProvider } from "react-query";

// navbar
import Navbar from "@/app/Navbar";
// BGM
import PeacefulBgm from "@/public/src/components/bgm/PeacefulBgm";

// left
import SingleTradeHistory from "./ReviewSingleTradeHistory";
// middle
import Chart from "./Chart";
// right
import SingleStockTicker from "./ReviewSingleStockTicker";
import SingleRanking from "./ReviewSingleRanking";

// Store
import SingleReviewStore from "@/public/src/stores/profile/SingleReviewStore";
// axios
import axios from "axios";

const queryClient = new QueryClient();

export default function page() {
  const params = useParams();
  const gameId = params["game-id"];
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);

  const {
    selectedIndex,
    setSelectedIndex,
    setRankMemberList,
    stockChartDataList,
    setStockChartDataList,
    stockInfoDtoList,
    setStockInfoDtoList,
    setTradeList,
    setStartDate,
    setEndDate,
    minPriceDateList,
    maxPriceDateList,
    positiveCount,
    setPositiveCount,
    negativeCount,
    setNegativeCount,

  } = SingleReviewStore();

  const fetchSingleGameRecord = async () => {
    try {
      const response = await axios({
        method: "get",
        url: `https://j10a207.p.ssafy.io/api/single/log?singleGameLogId=${gameId}`,
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
        },
      });
      console.log("싱글 복기 가장 첫 response : ", response.data.result);
      setStartDate(response.data.result.startDate.split("T")[0]);
      setEndDate(response.data.result.endDate.split("T")[0]);
      setRankMemberList(response.data.result.rankMemberList);
      setStockChartDataList(response.data.result.stockChartDataList);
      setStockInfoDtoList(response.data.result.stockInfoDtoList);
      fetchPositiveNegativeCount(response.data.result.stockInfoDtoList[0].stockCode, response.data.result.startDate.split("T")[0], response.data.result.endDate.split("T")[0])
      setTradeList(response.data.result.tradeList);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsError(true);
    }
  };
  // 해당 stockCode 값을 가진 주식 종목의 등락률 개수
  const fetchPositiveNegativeCount = async (stockCode :string, startDate :string, endDate :string) => {
    try {
      const response = await axios({
        method: "get",
        url: `https://j10a207.p.ssafy.io/hadoop/stock/change-count/start-end?startDate=${startDate}&endDate=${endDate}&stockCode=${stockCode}`,
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
  useEffect(() => {
    setSelectedIndex(0);
    fetchSingleGameRecord();
    // handleClickStock(0, stockInfoDtoList[0]?.stockCode);
  }, []);

  if (isLoading) {
    return <div className="rainbow"></div>;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <div className="grid grid-rows-12 h-screen border-separate">
        <PeacefulBgm />
        <Navbar />
        <div className="row-span-11 grid grid-cols-12">
          <aside className="col-span-2">
            <SingleTradeHistory />
            <div>
              <div>{stockInfoDtoList[selectedIndex].stockName}</div>
              <div>최대({maxPriceDateList[0]?.price}원)</div>
              {
                maxPriceDateList.map((item :any, index :number) => (
                  <div>{item.date} {item.highPrice}</div>
     
                ))
              }
              <div>최소({minPriceDateList[0]?.price}원)</div>
              {
                minPriceDateList.map((item :any, index :number) => (
                  <div>{item.date}</div>
                ))
              }
              <div>posneg</div>
              <div>{positiveCount} {negativeCount}</div>
              
            </div>
            {/* <SingleStock /> */}
          </aside>
          <main className="col-span-8 grid grid-rows-12">
            <Chart data={stockChartDataList[selectedIndex].stockChartList} />
          </main>
          <aside className="col-span-2 grid grid-rows-12">
            <SingleStockTicker></SingleStockTicker>
            <SingleRanking></SingleRanking>
          </aside>
        </div>
      </div>
    </QueryClientProvider>
  );
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
// // 해당 stockCode 값을 가진 주식 종목의 등락률 개수
// const fetchPositiveNegativeCount = async (stockCode :string) => {
//   try {
//     const response = await axios({
//       method: "get",
//       url: `https://j10a207.p.ssafy.io/hadoop/stock/change-count/start-end?startDate=${startDate}&endDate=${endDate}&stockCode=${stockCode}`,
//       headers: {
//           Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
//       }
//     })
//     setPositiveCount(response.data.result[0].positiveCount);
//     setNegativeCount(response.data.result[0].negativeCount);
    
//   } catch (error) {
//     console.log("pos neg error : ", error);
//   }
// }
// // 해당 stockCode 값을 가진 주식 종목의 max, min price를 가진 날짜 확인
// const fetchMinDay = async (stockCode :string, minPrice :number) => {
//   try {
//     const response = await axios({
//       method: "get",
//       url: `https://j10a207.p.ssafy.io/hadoop/stock/min-date?startDate=${startDate}&endDate=${endDate}&stockCode=${stockCode}&minPrice=${minPrice}`,
//       headers: {
//           Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
//       }
//     })
//     // console.log("하둡 최소 price 날짜 api 요청 결과 : ", response.data.result);
//     const newDate :any = []
//     response.data.result?.map((item :any, index :number) => {
//       newDate.push({
//         date : item.date,
//         value : minPrice,
//         stockCode : item.stockCode,
//       })
//     })
//     // console.log("minPrice의 date 정보 변경 결과 : ", newDate);
//     setMinPriceDate(newDate);
    
//   } catch (error) {
//     console.log(error);
//   }
// }
// const fetchMaxDay = async (stockCode :string, maxPrice :number) => {
//   try {
//     const response = await axios({
//       method: "get",
//       url: `https://j10a207.p.ssafy.io/hadoop/stock/max-date?startDate=${startDate}&endDate=${endDate}&stockCode=${stockCode}&maxPrice=${maxPrice}`,
//       headers: {
//           Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
//       }
//     })
//     // console.log("하둡 최대 price 날짜 api 요청 결과 : ", response.data.result);
//     const newDate :any = []
//     response.data.result?.map((item :any, index :number) => {
//       newDate.push({
//         date : item.date,
//         value : maxPrice,
//         stockCode : item.stockCode,
//       })
//     })
//     // console.log("maxPrice의 date 정보 변경 결과 : ", newDate);
//     setMaxPriceDate(newDate);
//   } catch (error) {
//     console.log(error);
//   }
// }

// // 해당 stockCode 값을 가진 주식 종목의 min, max price 확인
// const fetchMaxMin = async (stockCode :string) => {
//   try {
//     const response1 = await axios({
//       method: "get",
//       url: `https://j10a207.p.ssafy.io/hadoop/stock/max-min?startDate=${startDate}&endDate=${endDate}&stockCode=${stockCode}`,
//       headers: {
//           Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
//       }
//     })
//     setMaxPrice(response1.data.result[0].maxPrice);
//     setMinPrice(response1.data.result[0].minPrice);
//     fetchMinDay(stockCode, response1.data.result[0].minPrice);
//     fetchMaxDay(stockCode, response1.data.result[0].maxPrice);
//   } catch (error) {
//     console.log("max min error : ", error)
//   }
// }