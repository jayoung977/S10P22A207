"use client";
import { useRouter, useParams } from "next/navigation";
import { useQuery, UseQueryResult } from "react-query";
import axios from "axios";

interface resultType {
  players: number;
  finalRoi: number;
  gameDate: string;
  ranking: number;
  multiGameLogId: number;
}

interface MultiGameInfo {
  result: resultType[];
}

export default function UserRecordInfoMulti() {
  const router = useRouter();
  const params = useParams<{ userId?: string }>();
  const id: string | undefined = params.userId;

  const fetchUserMultiGame = async () => {
    const response = await axios({
      method: "get",
      url: `https://j10a207.p.ssafy.io/api/member/multi-game-log/?memberId=${id}`,
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
      },
    });
    return response.data;
  };

  const { data, isLoading, error }: UseQueryResult<MultiGameInfo, Error> =
    useQuery("userMultiGameInfo", fetchUserMultiGame);

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
              같이 한 플레이어
            </th>
            <th scope="col" className="px-6 py-3">
              순위
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
                  router.push(`${id}/multi/${item.multiGameLogId}`);
                }}
                key={i}
              >
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {item.gameDate}
                </th>
                <td className="px-6 py-4">{item.players}명</td>
                <td className="px-6 py-4">{item.ranking}등</td>
                <td className="px-6 py-4">{item.finalRoi}%</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
