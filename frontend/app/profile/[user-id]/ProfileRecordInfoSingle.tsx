"use client";

import { useRouter } from "next/navigation";

export default function UserRecordInfoSingle() {
  const router = useRouter();
  const data = [
    {gameDate: '2024.03.14', initialAsset: 1000000000, finalRoi: 10, finalProfit:100000000, singleGameLogId: 0},
    {gameDate: '2024.03.14', initialAsset: 1000000000, finalRoi: 10, finalProfit:100000000, singleGameLogId: 1},
    {gameDate: '2024.03.14', initialAsset: 1000000000, finalRoi: 10, finalProfit:100000000, singleGameLogId: 2},
    {gameDate: '2024.03.14', initialAsset: 1000000000, finalRoi: 10, finalProfit:100000000, singleGameLogId: 3},
    {gameDate: '2024.03.14', initialAsset: 1000000000, finalRoi: 10, finalProfit:100000000, singleGameLogId: 4},
    {gameDate: '2024.03.14', initialAsset: 1000000000, finalRoi: 10, finalProfit:100000000, singleGameLogId: 5},
    {gameDate: '2024.03.14', initialAsset: 1000000000, finalRoi: 10, finalProfit:100000000, singleGameLogId: 6},
    {gameDate: '2024.03.14', initialAsset: 1000000000, finalRoi: 10, finalProfit:100000000, singleGameLogId: 7},
    {gameDate: '2024.03.14', initialAsset: 1000000000, finalRoi: 10, finalProfit:100000000, singleGameLogId: 8},
    {gameDate: '2024.03.14', initialAsset: 1000000000, finalRoi: 10, finalProfit:100000000, singleGameLogId: 9},
]
  return (
    <div className="shadow row-span-5 relative overflow-auto max-h-96 p-4">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              날짜
            </th>
            <th scope="col" className="px-6 py-3">
              시드머니
            </th>
            <th scope="col" className="px-6 py-3">
              수익
            </th>
            <th scope="col" className="px-6 py-3">
              수익률
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, i)=>{return(
            <tr
            className="cursor-pointer bg-white border-b dark:bg-gray-800 dark:border-gray-700"
            onClick={() => {
              router.push(`1/single/${item.singleGameLogId}`);
            }}
            key={i}
          >
            <th
              scope="row"
              className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >
              {item.gameDate}
            </th>
            <td className="px-6 py-4">{item.initialAsset}원</td>
            <td className="px-6 py-4">{item.finalProfit}원</td>
            <td className="px-6 py-4">{item.finalRoi}%</td>
          </tr>
          )})} 
        </tbody>
      </table>
    </div>
  );
}
