"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { useQuery, QueryClient, QueryClientProvider } from "react-query";

// navbar
import Navbar from "@/app/Navbar";
// BGM
import PeacefulBgm from "@/public/src/components/bgm/PeacefulBgm";

// left
import MultiTradeHistory from "./ReviewMultiTradeHistory";
// main
import Chart from "./Chart";
// right
import MultiRanking from "./ReviewMultiRanking";

// Store
import MultiReviewStore from "@/public/src/stores/profile/MultiReviewStore";
// axios
import axios from "axios";

const queryClient = new QueryClient();

export default function page() {
  const params = useParams();
  const multiGameLogId = params["game-id"];
  const userId = params["userId"];
  const [selectedUserNicknameList, setSelectedUserNicknameList] = useState<
    string[]
  >([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);

  const {
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    stockCode,
    setStockCode,
    stockName,
    setStockName,
    stockChartDtoList,
    setStockChartDtoList,
    multiLogTradeDtoList,
    setMultiLogTradeDtoList,
    multiLogMemberDtoList,
    setMultiLogMemberDtoList,
    selectedTradeList,
    setSelectedTradeList,
  } = MultiReviewStore();

  const fetchMultiGameRecord = async () => {
    try {
      const response = await axios({
        method: "get",
        url: ` https://j10a207.p.ssafy.io/api/multi/log?multiGameLogId=${multiGameLogId}`,
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
        },
      });

      // console.log("받아온 데이터 : ", response.data.result);
      // 주식 코드
      console.log("시작 날짜(startDate) : ", response.data.result.startDate.split('T')[0]);
      console.log("끝 날짜(endDate) : ", response.data.result.endDate.split('T')[0]);
      console.log("종목 코드(stockCode) : ", response.data.result.stockCode);
      console.log("종목 이름(stockName) : ", response.data.result.stockName);
      console.log("종목 날짜별 데이터 (stockChartDtoList) : ", response.data.result.stockChartDtoList);
      console.log("내 매매기록(multiLogTradeDtoList) : ", response.data.result.multiLogTradeDtoList);
      console.log("친구들 정보(multiLogMemberDtoList) : ", response.data.result.multiLogMemberDtoList);
      setStartDate(response.data.result.startDate.split('T')[0]);
      setEndDate(response.data.result.endDate.split('T')[0]);
      setStockCode(response.data.result.stockCode);
      setStockName(response.data.result.stockName);

      // ㅋ ㅋ 
      setMultiLogMemberDtoList(response.data.result.multiLogMemberDtoList);
      setStockChartDtoList(response.data.result.stockChartDtoList);

      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsError(true);
    }
  };
  useEffect(() => {
    fetchMultiGameRecord();
  }, []);

  if (isLoading) {
    return <div className="rainbow"></div>;
  }

  if (isError) {
    return <div>Error</div>;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <div className="grid grid-rows-12 h-screen border-separate">
        <PeacefulBgm />
        <Navbar />
        <div className="row-span-11 grid grid-cols-12">
          <aside className="col-span-3">
            <MultiTradeHistory />
            <MultiRanking />
          </aside>
          <main className="col-span-9 grid grid-rows-12">
            <Chart data={stockChartDtoList} />
          </main>
        </div>
      </div>
    </QueryClientProvider>
  );
}
