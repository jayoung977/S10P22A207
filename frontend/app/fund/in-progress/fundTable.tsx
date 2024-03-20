'use client'

import { useRouter } from "next/navigation"
import { useQuery, UseQueryResult } from "react-query";
import type { FundResult } from "@/public/src/stores/fund/crud/FundCrudStore";
import { FundInfo } from "@/public/src/stores/fund/crud/FundCrudStore";
import { headers } from "next/headers";
import { useState, useEffect } from "react";



const fetchFundInfo = async() => {
    const token = sessionStorage.getItem('accessToken')
    const response = await fetch('https://j10a207.p.ssafy.io/api/fund/running-list',
      {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
    return response.json();
  }


export default function FundTable(){
  const [fundList, setFundList] = useState<FundResult[]>([])
  const router = useRouter();
  const { data, isLoading, error } : UseQueryResult<FundInfo,Error> = useQuery('FundInfo', fetchFundInfo)
  useEffect(() => {
    if (data?.result) {
      setFundList(data.result);
    }
  }, [data]);

  if (isLoading) {
    return <div>Loading..</div>
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
                        인원
                    </th>
                    <th scope="col" className="px-6 py-3">
                        수익률
                    </th>
                </tr>
            </thead>
            <tbody>
              {
                fundList.map((fund: FundResult, i:number)=> {
                  return (
                    <tr key={i}
                      onClick={()=> {router.push(`./in-progress/${fund.fundId}`, )}} 
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 hover:cursor-pointer">
                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            {fund.fundName}
                        </th>
                        <td className="px-6 py-4">
                            몰라용
                        </td>
                        <td className="px-6 py-4">
                            {fund.fundAsset.toLocaleString()}원
                        </td>
                        <td className="px-6 py-4">
                            {fund.participantCount}
                        </td>
                        <td className="px-6 py-4">
                            {fund.roi} %
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

