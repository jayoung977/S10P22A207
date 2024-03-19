'use client'

import { useRouter } from "next/navigation"
import { useQuery, UseQueryResult } from "react-query";
import type { FundResult } from "@/public/src/stores/fund/crud/FundCrudStore";
import { FundInfo } from "@/public/src/stores/fund/crud/FundCrudStore";


const fetchFundInfo = async() => {
  const response = await fetch('https://j10a207.p.ssafy.io/api/fund/managing-list/1');
  return response.json();
}


export default function FundTable(){
  const fundList = [1,2,3,4,5]
  const router = useRouter();
  const { data, isLoading, error }: UseQueryResult<FundInfo,Error>  =  useQuery('FundInfo', fetchFundInfo );

  if (isLoading) {
    return <div>Loading..</div>
  }

  if (error) {
    return <div>Error: {error.message}</div>
  }

  const { result }: {result: FundResult | null} = data ? data: {result: null};
  console.log(data)
  return (
    <div className="overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
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
                        상태
                    </th>
                    <th scope="col" className="px-6 py-3">
                        수익률
                    </th>
                </tr>
            </thead>
            <tbody>
              {
                fundList.map((fund: number, i:number)=> {
                  return (
                    <tr key={i}
                      onClick={()=> {
                        // 펀드 status에 따라서 router를 다르게 할 예정
                        router.push(`./in-progress/${i}`, )
                    }} 
                      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 hover:cursor-pointer">
                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            민규는 뭐든지 할 수 있어요 {i}
                        </th>
                        <td className="px-6 py-4">
                            ~2024.03.21
                        </td>
                        <td className="px-6 py-4">
                            50,000,000원
                        </td>
                        <td className="px-6 py-4">
                            운영중
                        </td>
                        <td className="px-6 py-4">
                            -37.91%
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

