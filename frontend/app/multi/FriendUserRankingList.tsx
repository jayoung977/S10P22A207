"use client";
import UserRanking from "./userRanking";
import { useQuery, UseQueryResult } from "react-query";
import axios from "axios";

export interface userType {
  memberId: number;
  nickname: string;
  asset: number;
  isLogin: boolean;
}

export interface userInfo {
  result: userType[];
}

const fetchFriendUserRankingInfo = async() => {
  const response = await fetch(`https://j10a207.p.ssafy.io/api/friend/list`,
  {
    headers: {
      'Authorization': `Bearer ${sessionStorage.getItem("accessToken")}`,
    },
  });
  return response.json();
};


export default function FriendUserRankingList() {
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
  const { result }: { result: userType[] | null } = data
    ? data
    : { result: null };
  console.log(result);

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
