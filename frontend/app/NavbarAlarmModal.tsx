"use client";

import useFetchUserInfo from "@/public/src/hooks/useFetchUserInfo";
import FundSettlementModal from "./fund/fundSettlementModal";
import { EventSourcePolyfill, NativeEventSource } from "event-source-polyfill";
import { useEffect, useState } from "react";
import userStore from "@/public/src/stores/user/userStore";

export default function NavbarAlarmModal() {
  const [fundSettlementOpen, setFundSettlementOpen] = useState(false);
  useFetchUserInfo();
  const { memberId } = userStore();
  // useEffect(() => {
  //   const EventSource = EventSourcePolyfill || NativeEventSource;
  //   const sse = new EventSource(
  //     "https://j10a207.p.ssafy.io/api/sse/connect/alarm",
  //     {
  //       headers: {
  //         Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
  //       },
  //       withCredentials: true,
  //     }
  //   );
  //   sse.addEventListener(`${memberId}:INVITATION`, (event: any) => {
  //     // const data = JSON.parse(event.data);
  //     // console.log(event);
  //     // console.log(data);
  //     console.log("Invitation Accept!")
  //     console.log(event.data);
  //   });

  //   sse.addEventListener(`connect`, (event: any) => {
  //     console.log("data Connect!")
  //     console.log(event.data);
  //   });

  //   sse.onerror = (error) => {
  //     //에러 발생시 할 동작
  //     console.error(error);
  //     sse.close(); //연결 끊기
  //   };
  //   return () => {
  //     sse.close();
  //   };
  // }, [memberId]);

  return (
    <div
      id="dropdownNotification"
      className="z-50 w-full max-w-sm bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-800 dark:divide-gray-700"
      aria-labelledby="dropdownNotificationButton"
    >
      <div className="block px-4 py-2 font-medium text-center text-gray-700 rounded-t-lg bg-gray-50 dark:bg-gray-800 dark:text-white">
        알림
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
