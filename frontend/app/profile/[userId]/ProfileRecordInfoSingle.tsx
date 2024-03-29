"use client";

import { useRouter, useParams } from "next/navigation";
import { useQuery, UseQueryResult } from "react-query";
import axios from "axios";

interface resultType {
  finalProfit: number;
  finalRoi: number;
  gameDate: string;
  initialAsset: number;
  singleGameLogId: number;
}

interface SingleGameInfo {
  result: resultType[];
}

export default function UserRecordInfoSingle() {
  const router = useRouter();
  const params = useParams<{ userId?: string }>();
  const id: string | undefined = params.userId;

  const fetchUserSingleGame = async () => {
    const response = await axios({
      method: "get",
      url: `https://j10a207.p.ssafy.io/api/member/single-game-log?memberId=${id}`,
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
      },
    });
    return response.data;
  };
  const { data, isLoading, error }: UseQueryResult<SingleGameInfo, Error> =
    useQuery("userSingleGameInfo", fetchUserSingleGame);

  if (isLoading) {
    return <div className="rainbow"></div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }
  const { result }: { result: resultType[] | null } = data
    ? data
    : { result: null };

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
          {result?.map((item, i) => {
            return (
              <tr
                className="cursor-pointer bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                onClick={() => {
                  router.push(`${id}/single/${item.singleGameLogId}`);
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
                <td className="px-6 py-4">{item.finalRoi.toFixed(2)}%</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
