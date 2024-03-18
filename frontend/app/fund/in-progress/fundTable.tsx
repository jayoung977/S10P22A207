'use client'

import { useRouter } from "next/navigation"

export default function FundTable(){
  const fundList = [1,2,3,4,5]
  const router = useRouter();
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
                        인원
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
                      onClick={()=> {router.push(`./in-progress/${i}`, )}} 
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 hover:cursor-pointer">
                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            용수는 돈을 복사해요 {i}
                        </th>
                        <td className="px-6 py-4">
                            ~2024.03.16
                        </td>
                        <td className="px-6 py-4">
                            50,000,000원
                        </td>
                        <td className="px-6 py-4">
                            20
                        </td>
                        <td className="px-6 py-4">
                            +21.00%
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

