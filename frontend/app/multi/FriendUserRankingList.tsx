"use client";
import UserRanking from "./userRanking";
import { useQuery, UseQueryResult } from "react-query";
import axios from "axios";

interface userType {
  memberId: number;
  nickname: string;
  assets: number;
}

interface userInfo {
  result: userType[];
}

export default function FriendUserRankingList() {
  const fetchFriendUserRankingInfo: any = async () => {
    const response = await axios({
      url: `https://j10a207.p.ssafy.io/api/friend/list`,
      method: "get",
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
      },
    });
    return response;
  };
  const { data, isLoading, error }: UseQueryResult<userInfo, Error> = useQuery(
    "friendUserRankingInfo",
    fetchFriendUserRankingInfo
  );

  if (isLoading) {
    return <div className="rainbow"></div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }
  console.log(data);
  const { result }: { result: userType[] | null } = data
    ? data
    : { result: null };
  return (
    <>
      <div
        className="row-span-9 overflow-auto border"
        style={{ height: "calc(42vh)" }}
      >
        {result?.map((x, index) => (
          <UserRanking key={x.memberId} user={x} />
        ))}
      </div>
    </>
  );
}
