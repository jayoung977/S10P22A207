"use client";

import useFetchUserInfo from "@/public/src/hooks/useFetchUserInfo";
import FundSettlementModal from "./fund/fundSettlementModal";
import { EventSourcePolyfill, NativeEventSource } from "event-source-polyfill";
import { useEffect, useState } from "react";
import userStore from "@/public/src/stores/user/userStore";
import socketStore from "@/public/src/stores/websocket/socketStore";
import axios from "axios";
import { UseQueryResult, useQuery } from "react-query";
import profileStore from "@/public/src/stores/profile/profileStore";
import ProfileFriendRequest from "./profile/[userId]/ProfileFriendRequest";

interface ResultType {
  alarmType: string;
  member: string;
  sender: string;
  content: string;
}

interface NotificationType {
  result: ResultType[];
}

export default function NavbarAlarmModal() {
  const { isOpen, setIsOpen } = profileStore();
  const [fundSettlementOpen, setFundSettlementOpen] = useState(false);
  useFetchUserInfo();

  const fewtchMyNotification = async () => {
    const response = await axios({
      url: `https://j10a207.p.ssafy.io/api/alarm/my-notification`,
      method: `get`,
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
      },
    });
    console.log(response.data);
    return response.data;
  };

  const { data, isLoading, error }: UseQueryResult<NotificationType, Error> =
    useQuery("userMyNotification", fewtchMyNotification);

  if (isLoading) {
    return <div className="rainbow"></div>;
  }
  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const { result }: { result: ResultType[] | null } = data
    ? data
    : { result: null };
  return (
    <div
      id="dropdownNotification"
      className="z-50 w-full max-w-sm bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-800 dark:divide-gray-700"
    >
      <div className="px-4 py-2 font-medium text-center text-gray-700 rounded-t-lg bg-gray-50 dark:bg-gray-800 dark:text-white flex justify-between">
        <span>알림</span>
        <button>전체삭제</button>
      </div>
      <div className="overflow-auto" style={{ height: "50vh" }}>
        {result?.map((item, i) => {
          return (
            <div className="divide-y divide-gray-100 dark:divide-gray-700">
              <a
                onClick={() => {
                  setIsOpen(!isOpen);
                }}
                className="flex px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700 hover:cursor-pointer"
              >
                <div className="flex-shrink-0"></div>
                <div className="w-full ps-3 text-xs">
                  <div>{item.alarmType}</div>
                  <div className="text-gray-500 text-sm mb-1.5 dark:text-gray-400">
                    {item.content}
                  </div>
                </div>
              </a>
            </div>
          );
        })}
      </div>

      <div className="divide-y divide-gray-100 dark:divide-gray-700">
        <a
          onClick={() => {
            setFundSettlementOpen(true);
          }}
          className="flex px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700 hover:cursor-pointer"
        >
          <div className="flex-shrink-0"></div>
          <div className="w-full ps-3 text-xs">
            <div>펀드</div>
            <div className="text-gray-500 text-sm mb-1.5 dark:text-gray-400">
              AA 펀드 정산이 완료되었습니다.
            </div>
          </div>
        </a>
      </div>

      <FundSettlementModal
        isOpen={fundSettlementOpen}
        onClose={() => {
          setFundSettlementOpen(false);
        }}
      />
    </div>
  );
}
