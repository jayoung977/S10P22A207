"use client";
import { useRouter } from "next/navigation";
import MakeRoomModal from "./makeRoomModal";
import { useEffect, useState } from "react";
import GameRoom from "./gameroom";
import Pagination from "./pagination";
import { useQuery, UseQueryResult } from "react-query";
import multigameStore, {
  MultiRoomInfo,
  MultiGameRoomInfoList,
  ResultType,
} from "@/public/src/stores/multi/MultiGameStore";
import axios from "axios";
import useClickSound from "@/public/src/components/clickSound/DefaultClick";

const fetchMultiRoomInfo = async (pageNumber: number) => {
  const token = sessionStorage.getItem("accessToken");
  const response = await fetch(
    `https://zayoung21.store/api/multi?pageNumber=${pageNumber}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.json();
};

export default function GameRoomSetting() {
  const [rooms, setRooms] = useState<MultiGameRoomInfoList[]>([]);
  const { pageNumber, isWaiting, setIsWaiting } = multigameStore();
  const { data, isLoading, error }: UseQueryResult<MultiRoomInfo, Error> =
    // pageNumber를 의존성 변수로 추가하면 pageNumber에 따라 react-query 실행
    useQuery(["MultiRoomInfo", pageNumber], () =>
      fetchMultiRoomInfo(pageNumber)
    );
  type ColorClass = { [key: number]: string };
  const RoomColor: ColorClass = {
    0: "bg-small-1",
    1: "bg-small-10",
    2: "bg-small-4",
    3: "bg-small-3",
    4: "bg-small-6",
    5: "bg-small-8",
    6: "bg-small-13",
    7: "bg-small-2",
    8: "bg-small-5",
    9: "bg-small-7",
    10: "bg-small-9",
    11: "bg-small-11",
    12: "bg-small-12",
  };

  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [round, setRound] = useState(3);
  const playClickSound = useClickSound();

  const handleQuickstart = () => {
    playClickSound();
    axios.get('https://zayoung21.store/api/multi/1', {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`
      }
    })
    .then((res)=> {
      console.log(res.data)
    })
    .catch((e)=> {
      console.error(e)
    })
    router.push("multi/room/1");
  };

  if (isLoading) {
    return <div className="rainbow"></div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const { result }: { result: ResultType | null } = data
    ? data
    : { result: null };
  console.log(result)
  const totalwaitRooms = result ? result.totalWaitRoomCounts : 0;
  const totalGameRooms = result ? result.totalGameRoomCounts : 0;
  return (
    <div className="col-span-8 grid grid-rows-12 p-2">
      <div className="row-span-2 flex justify-end gap-2 border items-center bg-background-1 rounded-lg shadow m-2 p-2 dark:bg-gray-800">
          <div className="mx-2 flex items-center">
            <input
              id="default-checkbox"
              type="checkbox"
              value=""
              checked={isWaiting == true}
              onChange={() =>{
                playClickSound();
                setIsWaiting(true)
              }}
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
            <label
              htmlFor="default-checkbox"
              className="ms-1 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              대기방
            </label>
          </div>
          <div className="mx-2 flex items-center">
            <input
              id="default-checkbox"
              type="checkbox"
              value=""
              checked={isWaiting == false}
              onChange={() => {
                playClickSound();
                setIsWaiting(false)
              }}
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
            <label
              htmlFor="default-checkbox"
              className="ms-1 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              진행중
            </label>
          </div>
          <div className="justify-items-center ms-2">
            <button
              onClick={() => {
                playClickSound();
                setIsOpen(true);
              }}
              className="bg-red-500 hover:bg-red-400 px-2 py-1 rounded-md text-white"
            >
              방만들기
            </button>
          </div>
        <MakeRoomModal
          isOpen={isOpen}
          onClose={() => {
            setIsOpen(false);
          }}
        />
      </div>
      {/* 게임방 목록 */}
      <div className="bg-background-1 row-span-8 rounded-md grid grid-cols-12 grid-rows-3 shadow-md gap-1">
        {
          isWaiting ? (
            result?.multiWaitRoomInfoList.map((room: MultiGameRoomInfoList, i: number) => (
              <div className="col-span-6 row-span-1 p-1 m-1 rounded-md" key={i}>
                <GameRoom
                  color={RoomColor[(pageNumber - 1 + i) % 13]}
                  room={room}
                />
              </div>
            ))
          ): (
            result?.multiGameRoomInfoList.map((room: MultiGameRoomInfoList, i: number) => (
              <div className="col-span-6 row-span-1 p-1 m-1 rounded-md" key={i}>
                <GameRoom
                  color={RoomColor[(pageNumber - 1 + i) % 13]}
                  room={room}
                />
              </div>
            ))
          )
        }
      </div>
      <section className="row-span-2 flex justify-center">
        <Pagination totalwaitRooms={totalwaitRooms} totalGameRooms={totalGameRooms} />
      </section>
    </div>
  );
}
