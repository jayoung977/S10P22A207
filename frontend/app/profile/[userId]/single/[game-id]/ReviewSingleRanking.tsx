'use client'
import { useState } from 'react';
import RankingUserChartModal from './RankingUserChartModal';
import SingleReviewStore from "@/public/src/stores/profile/SingleReviewStore";
import axios from "axios";

export default function SingleRanking() {
  const { selectedIndex, rankMemberList } = SingleReviewStore();
  const [isOpenReviewModal, setIsOpenReviewModal] = useState<boolean>(false);
  const [rankingUserData, setRankingUserData] = useState<any>([]);

  function handleOpenModal () {
    setIsOpenReviewModal(true);
  }

  const fetchRankingUserRecord = async (singleGameStockId :any, memberId :any) => {
    try {
      const response = await axios({
        method: "get",
        url : `https://j10a207.p.ssafy.io/api/single/log/member?singelGameStockId=${singleGameStockId}&memberId=${memberId}`,
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
        },
      })

      setRankingUserData(response.data.result);
      handleOpenModal();
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <>
      <div className="row-span-5 grid grid-rows-5 bg-slate-500 rounded-md m-1">
        <div className="row-span-1 flex items-center justify-center">
          <div className="text-textColor-2">랭킹 유저들</div>
        </div>
        <table className="row-span-4 grid grid-rows-4 table-fixed rounded-md">
          <thead className="row-span-1 grid grid-cols-2 items-center m-1">
            <tr className="col-span-2 grid grid-cols-2 items-center">
              <th className="col-span-1 text-center">이름</th>
              <th className="col-span-1 text-center">수익률</th>
            </tr>
          </thead>
          <tbody className="row-span-3 grid grid-rows-3 items-center">
            {
              rankMemberList[selectedIndex]?.rankMemberDtoList.map((item :any, index :number) => (
                <tr 
                  key={index} 
                  className="row-span-1 grid grid-cols-2 text-center bg-white rounded-lg m-1"
                  onClick={() => {fetchRankingUserRecord(item.singleGameStockId, item.memberId)}}
                  style={{ cursor : "pointer" }}
                >
                  <td className="col-span-1">{item.nickname}</td>
                  <td className="col-span-1">{parseFloat(item.roi.toFixed(2))}</td>                      
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
      <RankingUserChartModal isOpen={isOpenReviewModal} onClose={() => {setIsOpenReviewModal(false)}} data={rankingUserData}/>
    </>
  );
}

