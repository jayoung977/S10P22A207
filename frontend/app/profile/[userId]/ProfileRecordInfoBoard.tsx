"use client";
import { useRouter, useParams } from "next/navigation";
import { useQuery, UseQueryResult } from "react-query";
import axios from "axios";
import profileStore from "@/public/src/stores/profile/profileStore";
import useClickSound from "@/public/src/components/clickSound/DefaultClick";

interface resultType {
  id: number;
  nickname: string;
  content: string;
}

interface BoardInfo {
  result: resultType[];
}

export default function UserRecordInfoBoard() {
  const playClickSound = useClickSound();
  const router = useRouter();
  const params = useParams<{ userId?: string }>();
  const id: string | undefined = params.userId;
  const { isBoardOpen, setIsBoardOpen } = profileStore();
  const fetchUserBoard = async () => {
    const response = await axios({
      method: "get",
      url: `https://j10a207.p.ssafy.io/api/community/mylist?loginUserId=${id}`,
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
      },
    });
    return response.data;
  };

  const { data, isLoading, error }: UseQueryResult<BoardInfo, Error> = useQuery(
    "userBoardInfo",
    fetchUserBoard
  );

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
    <div className="shadow row-span-5 overflow-auto p-4" style={{ maxHeight: "50vh" }}>
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs bg-small-component-3 text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              글번호
            </th>
            <th scope="col" className="px-6 py-3">
              내용
            </th>
          </tr>
        </thead>
        <tbody>
          {result?.map((item, i) => {
            return (
              <tr
                className="cursor-pointer bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                key={i}
                onClick={() => {
                  playClickSound();
                  setIsBoardOpen(item.id);
                }}
              >
                <th
                  scope="row"
                  className=" px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {item.id}
                </th>
                <td className="px-6 py-4">{item.content}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
