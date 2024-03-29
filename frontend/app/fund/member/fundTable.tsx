'use client'

import { useRouter } from "next/navigation"
import { useQuery, UseQueryResult } from "react-query";
import type { FundResult } from "@/public/src/stores/fund/crud/FundCrudStore";
import { FundInfo } from "@/public/src/stores/fund/crud/FundCrudStore";
import { useState, useEffect } from "react";
import fundCrudStore from "@/public/src/stores/fund/crud/FundCrudStore";

const fetchFundInfo = async() => {
    const token = sessionStorage.getItem('accessToken')
    const response = await fetch('https://j10a207.p.ssafy.io/api/fund/investing-list',
    {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    return response.json();
  }
  

export default function FundTable(){
  const { searchQuery } = fundCrudStore();
  const [filteredFunds, setFilteredFunds] = useState<FundResult[]>([])
  const [fundList, setFundList] = useState<FundResult[]>([])
  const router = useRouter();
  const { data, isLoading, error }: UseQueryResult<FundInfo,Error>  =  useQuery('FundInfo', fetchFundInfo );
  
  useEffect(() => {
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
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-background-1">
                <tr>
                    <th scope="col" className="px-6 py-3">
                        이름
                    </th>
                    <th scope="col" className="px-6 py-3">
                        기간
                    </th>
                    <th scope="col" className="px-6 py-3">
                        자금
                    </th>
                    <th scope="col" className="px-6 py-3">
                        매니저
                    </th>
                    <th scope="col" className="px-6 py-3">
                        수익률
                    </th>
                    <th scope="col" className="px-6 py-3">
                        상태
                    </th>
                </tr>
            </thead>
            <tbody>
              {
                filteredFunds.map((fund: FundResult, i:number)=> {
                  return (
                    <tr key={i}
                      onClick={()=> {
                        if(fund.status == "RECRUITING"){
                          router.push(`./recruiting/${fund.fundId}`)
                        } else {
                          router.push(`./in-progress/${fund.fundId}`, )
                        }
                      }} 
                      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 hover:cursor-pointer">
                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            {fund.fundName}
                        </th>
                        {
                          fund.status == "RUNNING" ? (
                            <td className="px-6 py-4">
                              {fund.startDate} ~ {fund.endDate} 
                            </td>
                          ) : (
                            <td className="px-6 py-4">
                              {fund.period} 일
                            </td>
                          )
                        }
                        <td className="px-6 py-4">
                            {fund.fundAsset.toLocaleString()} 원
                        </td>
                        <td className="px-6 py-4">
                            {fund.managerNickname}
                        </td>
                        <td className="px-6 py-4">
                            {fund.roi} %
                        </td>
                        {
                          fund.status == 'RECRUITING' ? (
                            <td className="px-6 py-4">
                             모집중
                            </td>
                          ) : (
                            <td className="px-6 py-4">
                             운영중
                            </td>
                          )
                        }
                    </tr>
                  )
                })
              }
              </tbody>
        </table>
    </div>
  )
}

