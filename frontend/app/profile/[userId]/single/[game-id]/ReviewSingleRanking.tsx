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

  const fetchRankingUserRecord = async (item :any) => {
    try {
      const response = await axios({
        method: "get",
        url : `https://j10a207.p.ssafy.io/api/single/log/member?singelGameStockId=${item.singleGameStockId}&memberId=${item.memberId}`,
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
        },
      })

      
      const res = {
        memberId : item.memberId,
        nickname : item.nickname,
        stockChartList : response.data.result.stockChartList,
        tradeList : response.data.result.tradeList
      }
      setRankingUserData(res);
      handleOpenModal();
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <>
      <div className="row-span-5 grid grid-rows-5 bg-slate-500 rounded-md m-1">
        <div className="row-span-1 flex items-center justify-center">
          <div className="text-textColor-2">유저 랭킹</div>
        </div>
        <table className="row-span-4 grid grid-rows-4 table-fixed rounded-md">
          <thead className="row-span-1 grid grid-cols-2 items-center m-1">
            <tr className="col-span-2 grid grid-cols-6 items-center">
              <th className="col-span-1 text-center">순위</th>
              <th className="col-span-3 text-center">이름</th>
              <th className="col-span-2 text-center">수익률</th>
            </tr>
          </thead>
          <tbody className="row-span-3 grid grid-rows-3 items-center">
            {
              rankMemberList[selectedIndex].rankMemberDtoList && rankMemberList[selectedIndex].rankMemberDtoList.length > 0 ? (
                rankMemberList[selectedIndex]?.rankMemberDtoList.map((item :any, index :number) => (
                  <tr 
                    key={index} 
                    className="row-span-1 grid grid-cols-6 text-center bg-white rounded-lg m-1 hover:bg-slate-300"
                    onClick={() => {fetchRankingUserRecord(item)}}
                    style={{ cursor : "pointer" }}
                  >
                    <td className="col-span-1">{index+1}</td>
                    <td className="col-span-3">{item.nickname}</td>
                    <td className="col-span-2">{parseFloat(item.roi.toFixed(2))}</td>                      
                  </tr>
                  ))
              ) : (
                <div className="flex items-center justify-center mt-5">등록된 랭커가 없습니다.</div>
              )
            }
          </tbody>
        </table>
      </div>
      <RankingUserChartModal isOpen={isOpenReviewModal} onClose={() => {setIsOpenReviewModal(false)}} data={rankingUserData}/>
    </>
  );
}

