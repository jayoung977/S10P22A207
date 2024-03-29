'use client'
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';

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
import MultiReviewStore from '@/public/src/stores/profile/MultiReviewStore';
// axios
import axios from 'axios';

export default function page() {

  const params = useParams();
  const gameId = params['game-id'];
  const userId = params['userId'];
  const [selectedUserNicknameList, setSelectedUserNicknameList] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);
  

  const { stockName, setStockName, 
          stockChartDtoList, setStockChartDtoList,
          multiLogMemberDtoList, setMultiLogMemberDtoList,
          selectedTradeList, setSelectedTradeList,
        } = MultiReviewStore();

  const fetchMultiGameRecord = async () => {
    try {
      const response = await axios({
        method : "get",
        url :` https://j10a207.p.ssafy.io/api/multi/log?multiGameLogId=${gameId}`,
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
        },
      })

      console.log(response.data.result);
      console.log(response.data.result.multiLogMemberDtoList)
      setMultiLogMemberDtoList(response.data.result.multiLogMemberDtoList);
      // console.log(response.data.result.multiLogMemberDtoList.find((x :any) => x.memberId == userId));
      setStockName(response.data.result.stockName);
      setStockChartDtoList(response.data.result.stockChartDtoList);

      setIsLoading(false)

    } catch (error) {
      console.log(error);
      setIsError(true);

    }
  }
  useEffect(() => {
    fetchMultiGameRecord();
  }, []);
       
  if (isLoading) {
    return <div className="rainbow"></div>;
  }

  if (isError) {
    return <div>Error</div>
  }

  
  return (
    <div className="grid grid-rows-12 h-screen border-separate">
      <PeacefulBgm />
      <Navbar />
      <div className="row-span-11 grid grid-cols-12">
        <aside className="col-span-3">
          <MultiTradeHistory />
          <MultiRanking />
        </aside>
        <main className="col-span-9 grid grid-rows-12">
          <Chart data={stockChartDtoList}/>
        </main>
        {/* <aside className="col-span-2 grid grid-rows-12">
        </aside> */}
      </div>
    </div>
  );
}
