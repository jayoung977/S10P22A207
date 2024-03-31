"use client";
import { useRouter, useParams } from "next/navigation";
import { useQuery, UseQueryResult } from "react-query";
import axios from "axios";

interface resultType {
  fundId: number;
  fundName: string;
  managerNickname: string;
  industry: string;
  minimumAmount: number;
  targetAmount: number;
  fundAsset: number;
  participantCount: number;
  capacity: number;
  status: string;
  feeType: string;
  period: number;
  roi: number;
  startDate: null;
  endDate: null;
}

interface FundManagerInfo {
  result: resultType[];
}

export default function UserRecordInfoManagerFund() {
  const router = useRouter();
  const params = useParams<{ userId?: string }>();
  const id: string | undefined = params.userId;

  const fetchFundManagerBoard = async () => {
    const response = await axios({
      method: "get",
      url: `https://j10a207.p.ssafy.io/api/fund/other-managing-list?managerId=${id}`,
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
      },
    });
    return response.data;
  };

  const { data, isLoading, error }: UseQueryResult<FundManagerInfo, Error> =
    useQuery("fundManagerInfo", fetchFundManagerBoard);

  if (isLoading) {
    return <div className="rainbow"></div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }
  const { result }: { result: resultType[] | null } = data
    ? data
    : { result: null };

  console.log(result);
  return (
    <div className="shadow row-span-5 overflow-auto max-h-96 p-4">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              펀드이름
            </th>
            <th scope="col" className="px-6 py-3">
              상태
            </th>
            <th scope="col" className="px-6 py-3">
              펀드 자금
            </th>
            <th scope="col" className="px-6 py-3">
              산업군
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
                key={i}
                className="cursor-pointer bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                onClick={() => {
                  router.push(
                    item.status == "RUNNING"
                      ? `/fund/in-progress/${item.fundId}`
                      : `/fund/recruiting/${item.fundId}`
                  );
                }}
              >
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {item.fundName}
                </th>
                <td className="px-6 py-4">{item.status}</td>
                <td className="px-6 py-4">{item.targetAmount}원</td>
                <td className="px-6 py-4">{item.industry}</td>
                <td className="px-6 py-4">{item.roi}%</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
