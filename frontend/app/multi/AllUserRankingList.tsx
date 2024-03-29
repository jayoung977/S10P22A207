"use client";
import UserRanking from "./userRanking";
import { useQuery, UseQueryResult } from "react-query";
import axios from "axios";
import { userType, userInfo } from "./FriendUserRankingList";

const fetchAllUserRankingInfo = async () => {
  // 전체 랭킹 불러오는 api 개발 전
  // 우선 친구 랭킹 불러오는 api 사용
  const response = await fetch(`https://j10a207.p.ssafy.io/api/friend/list`,
  {
    headers: {
      'Authorization': `Bearer ${sessionStorage.getItem("accessToken")}`,
    },
  });
  return response.json();
};

export default function AllUserRankingList() {
  const { data, isLoading, error }: UseQueryResult<userInfo, Error> = useQuery(
    "allUserRankingInfo",
    fetchAllUserRankingInfo
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

  console.log(data);
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
