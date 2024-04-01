'use client'

import Image from "next/image";
import ProfileImage from '@/public/src/assets/images/profile-person-image.png'
import type { FundDetail, FundStocks } from "@/public/src/stores/fund/crud/FundCrudStore";
import { useQuery, UseQueryResult } from "react-query";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import useClickSound from "@/public/src/components/clickSound/DefaultClick";
import userStore from "@/public/src/stores/user/userStore";


const fetchFundDetail = async(fundId: string) => {
  const token = sessionStorage.getItem('accessToken')
  const response = await fetch(`https://j10a207.p.ssafy.io/api/fund/fund-detail?fundId=${fundId}`,
  {
     headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  return response.json();
}


export default function InprogressFundDetail() {
  const [fundDetail, setFundDetail] = useState<FundDetail|null>(null)
  const playClickSound = useClickSound();
  const { nickname } = userStore();

  const params = useParams();
  const fundId = params['fund-id'] as string;

  const { data, isLoading, error }: UseQueryResult<FundDetail,Error> = useQuery(['FundDetail', fundId], ()=> fetchFundDetail(fundId)) 
  useEffect(() => {
    if (data?.result) {
      setFundDetail(data.result);
    }
  }, [data]);

  if (isLoading) {
    return <div className="rainbow"></div>
  }

  if (error) {
    return <div>Error: {error.message}</div>
  }

  const { result }: {result: FundDetail | null } = data ? data : {result: null};
  console.table(result)

  const fundManager = result?.managerNickname
  const totalInvestment = result?.fundStocks.reduce(
    (accumulator, currentStock) => {
      return accumulator + currentStock.investmentAmount;
  },0)

  const totalProfit = result?.fundStocks.reduce(
    (accumulator, currentStock) => {
      return accumulator + (currentStock.investmentAmount*currentStock.roi)/100;
    },0)

  return (
    <div className='bg-big-1 p-2 rounded-md row-span-11 grid grid-rows-12 gap-2 mx-auto xl:max-w-screen-xl'>
      {/* 펀드 소개 */}
      <div className="row-span-3 p-4 bg-small-3 rounded-lg text-textColor-2 border grid grid-rows-4">
        <div className="row-span-1 items-center text-center">
          <div className="text-xl font-bold">{fundDetail?.fundName}</div>
        </div>
        <div className="row-span-3 grid grid-cols-6 gap-4 mt-4">
          <div className="col-span-2 grid grid-rows-3">
            <div className="row-span-1 text-lg">펀드매니저</div>
            <div className="row-span-2 grid grid-cols-4 items-center">
              <div className="col-span-1">
                <Image
                  src={ProfileImage}
                  alt="profile-image"
                  width={40}
                  height={40}
                  style={{
                    borderRadius: '50%'
                  }}
                />
              </div>
              <div className="col-span-3">
                <div>
                  {fundDetail?.managerNickname}
                </div>
              </div>
            </div>
          </div>
          <div className="col-span-2 grid grid-rows-3">
            <div className="row-span-1 text-lg">기간</div>
            <div>시작: {fundDetail?.startDate}</div>
            <div>끝:  {fundDetail?.endDate}</div>
          </div>
          <div className="col-span-1 grid grid-rows-3">
            <div className="row-span-1 text-lg">종목</div>
            <div>{fundDetail?.industry}</div>
          </div>
          <div className="col-span-1 grid grid-rows-3">
            <div className="row-span-1 text-lg">시드머니</div>
            <div>{fundDetail?.fundAsset.toLocaleString()} 원</div>
          </div>
        </div>
      </div>
      {/* 가입자 */}
      <div className="row-span-7 border rounded-md overflow-y-auto" style={{height: 'calc(50vh)'}}>
        <table className="w-full  text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400"   >
          <thead className="text-md border-b bg-background-1 text-gray-700 uppercase dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                  종목명
              </th>
              <th scope="col" className="px-6 py-3">
                  매수금액
              </th>
              <th scope="col" className="px-6 py-3">
                  평가손익
              </th>
              <th scope="col" className="px-6 py-3">
                  수익률
              </th>
            </tr>
          </thead>
          <tbody>
            {fundDetail?.fundStocks.length === 0 ? (
            <tr>
              <td className="col-span-4 px-6 py-4 text-center text-lg text-gray-900 dark:text-white">
                현재 주식종목 없음
              </td>
            </tr>
            ) : (
              fundDetail?.fundStocks.map((stock: FundStocks, i:number)=> {
                return (
                  <tr key={i} className="bg-white border-b text-md dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      {stock.stockName}
                    </th>
                    <td className="px-6 py-4">
                      {stock.investmentAmount.toLocaleString()} 원
                    </td>
                    <td className="px-6 py-4">
                    {((stock.investmentAmount*stock.roi)/100).toLocaleString()} 원
                    </td>
                    <td className="px-6 py-4">
                      {stock.roi} %
                    </td>
                  </tr>
                )
              }) 
            )}
          </tbody>
        </table>
      </div>
      {/* 펀드 status */}
      <div className="row-span-2 bg-textColor-1 text-textColor-2 rounded-md grid grid-cols-4">
        <div className="col-span-1 text-lg mt-2 ms-10">총합</div>
        <div className="col-span-1 ms-4 text-lg mt-2"> {totalInvestment?.toLocaleString()}원</div>
        <div className="col-span-1 ms-4 text-lg mt-2"> {totalProfit?.toLocaleString()}원</div>
        <div className="col-span-1 text-lg mt-2 ms-10">
          { totalInvestment != null && totalProfit != null 
          ? totalInvestment > 0
              ? (totalProfit/totalInvestment*100).toFixed(1)
              : 0
            : 0
        }%</div>
      </div>
      <div className="row-span-1">
          {
            nickname === fundManager ? (
            <button
              onClick={()=> {
                playClickSound();
                window.location.href = `/fund/${fundId}/play`;
              }}
            className="w-full border rounded-md bg-small-9 hover:bg-teal-400 py-2 text-textColor-2 text-center">펀드 게임하러 가기
            </button>
            ) : (
              <div></div>
            )
          }
      </div>
    </div>
  )
}