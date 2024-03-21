'use client'

import { useRouter } from "next/navigation"
import { useQuery, UseQueryResult } from "react-query";
import type { FundResult } from "@/public/src/stores/fund/crud/FundCrudStore";
import fundCrudStore, { FundInfo } from "@/public/src/stores/fund/crud/FundCrudStore";
import { useEffect, useState } from "react";


const fetchFundInfo = async() => {
  const token = sessionStorage.getItem('accessToken')
  const response = await fetch('https://j10a207.p.ssafy.io/api/fund/recruiting-list',
  {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  return response.json();
}


export default function FundTable(){
  const [fundList, setFundList] = useState<FundResult[]>([])
  const { data, isLoading, error }: UseQueryResult<FundInfo,Error> = useQuery('FundInfo', fetchFundInfo );
  const { searchQuery } = fundCrudStore();
  const [filteredFunds, setFilteredFunds] = useState<FundResult[]>([])
  const router = useRouter();
  
  useEffect(() => {
    // Filter fundList based on searchQuery when searchQuery changes
    const filtered: FundResult[] = fundList.filter((fund) => fund.fundName.includes(searchQuery));
    setFilteredFunds(filtered);
  }, [searchQuery, fundList]); 
  
  useEffect(() => {
    if (data?.result) {
      setFundList(data.result);
    }
  }, [data]);

  if (isLoading) {
    return <div className="rainbow"></div>
  }


  if (error) {
    return <div>Error: {error.message}</div>
  }

  const { result }: {result: FundResult[] | null} = data ? data: {result: null};
  console.log(result)
  

  return (
    <div className="overflow-auto shadow-md sm:rounded-lg" style={{height: 'calc(50vh)'}}>
      <table className="overflow-y-auto w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400" >
        <thead className="text-xs text-gray-700 uppercase bg-background-1">
          <tr>
              <th scope="col" className="px-6 py-3">
                  이름
              </th>
              <th scope="col" className="px-6 py-3">
                  펀드매니저
              </th>
              <th scope="col" className="px-6 py-3">
                  기간
              </th>
              <th scope="col" className="px-6 py-3">
                  인당 최소금액
              </th>
              <th scope="col" className="px-6 py-3">
                  인원
              </th>
              <th scope="col" className="px-6 py-3">
                  종목
              </th>
          </tr>
        </thead>
        <tbody>
        {
          filteredFunds.map((fund: FundResult, i:number)=> {
          return (
              <tr key={i}
              onClick={()=> {router.push(`./recruiting/${fund.fundId}`, )}} 
              className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 hover:cursor-pointer">
                  <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      {fund.fundName}
                  </th>
                  <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      {fund.managerNickname}
                  </th>
                  <td className="px-6 py-4">
                      {fund.period} 일
                  </td>
                  <td className="px-6 py-4">
                      {fund.minimumAmount.toLocaleString()} 원
                  </td>
                  <td className="px-6 py-4">
                      {fund.participantCount}/{fund.capacity}
                  </td>
                  <td className="px-6 py-4">
                      {fund.industry}
                  </td>
              </tr>
          )
          })
        }
        </tbody>
      </table>
    </div>
  )
}

