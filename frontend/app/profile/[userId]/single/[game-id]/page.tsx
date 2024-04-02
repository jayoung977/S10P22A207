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
    rankMemberList,
    setRankMemberList,
    stockChartDataList,
    setStockChartDataList,
    stockInfoDtoList,
    setStockInfoDtoList,
    tradeList,
    setTradeList,
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
      console.log("response.data.result : ", response.data.result);
      setRankMemberList(response.data.result.rankMemberList);
      setStockChartDataList(response.data.result.stockChartDataList);
      setStockInfoDtoList(response.data.result.stockInfoDtoList);
      setTradeList(response.data.result.tradeList);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsError(true);
    }
  };

  useEffect(() => {
    fetchSingleGameRecord();
  }, []); // gameId를 의존성 배열에 추가하여 gameId가 변경될 때마다 useEffect가 실행되도록 함

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
          <aside className="col-span-2">
            <SingleTradeHistory />
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
