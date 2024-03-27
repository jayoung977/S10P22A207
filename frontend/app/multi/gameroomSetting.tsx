"use client";
import { useRouter } from "next/navigation";
import MakeRoomModal from "./makeRoomModal";
import { useState } from "react";
import GameRoom from "./gameroom";
import Pagination from "./pagination";
import { useQuery, UseQueryResult } from "react-query";
import {
  MultiRoomInfo,
  MultiRoom,
} from "@/public/src/stores/multi/MultiGameStore";
import axios from "axios";
import multigameStore from "@/public/src/stores/multi/MultiGameStore";

const fetchMultiRoomInfo = async () => {
  const { pagenation } = multigameStore();
  const token = sessionStorage.getItem("accessToken");
  const response = await axios({
    method: "get",
    url: `https://j10a207.p.ssafy.io/api/multi?pageNumber`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data();
};

export default function GameRoomSetting() {
  const { data, isLoading, error }: UseQueryResult<MultiRoomInfo, Error> =
    useQuery("MultiRoomInfo", fetchMultiRoomInfo);
  const rooms: number[] = [1, 2, 3, 4, 5, 6];
  type ColorClass = { [key: number]: string };
  const RoomColor: ColorClass = {
    0: "bg-small-1",
    1: "bg-small-10",
    2: "bg-small-4",
    3: "bg-small-3",
    4: "bg-small-6",
    5: "bg-small-8",
  };

  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [isWaiting, setIsWaiting] = useState(false);
  const [round, setRound] = useState(3);

  const handleQuickstart = () => {
    router.push("multi/1/room");
  };
  if (isLoading) {
    return <div className="rainbow"></div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const { result }: { result: MultiRoom[] | null } = data
    ? data
    : { result: null };
  console.log(result);

  return (
    <div className="col-span-8 grid grid-rows-12 p-2">
      <div className="row-span-2 grid grid-cols-12 border items-center bg-background-1 rounded-lg shadow m-2 p-2 dark:bg-gray-800">
        <div className="col-span-8 grid grid-cols-5 gap-2 justify-center items-center text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0">
          <div className="col-span-1 flex items-center">
            <input
              id="default-checkbox"
              type="checkbox"
              value=""
              checked={isWaiting == false}
              onChange={() => setIsWaiting(false)}
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
            <label
              htmlFor="default-checkbox"
              className="ms-1 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              전체방
            </label>
          </div>
          <div className="col-span-1 flex items-center">
            <input
              id="default-checkbox"
              type="checkbox"
              value=""
              checked={isWaiting == true}
              onChange={() => setIsWaiting(true)}
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
            <label
              htmlFor="default-checkbox"
              className="ms-1 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              대기방
            </label>
          </div>
          <div className="col-span-1 flex items-center">
            <input
              id="default-checkbox"
              type="checkbox"
              value=""
              checked={round == 3}
              onChange={() => setRound(3)}
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
            <label
              htmlFor="default-checkbox"
              className="ms-1 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              3라운드
            </label>
          </div>
          <div className="col-span-1 flex items-center">
            <input
              id="default-checkbox"
              type="checkbox"
              value=""
              checked={round == 5}
              onChange={() => setRound(5)}
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
            <label
              htmlFor="default-checkbox"
              className="ms-1 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              5라운드
            </label>
          </div>
          <div className="col-span-1 flex items-center">
            <input
              id="default-checkbox"
              type="checkbox"
              value=""
              checked={round == 7}
              onChange={() => setRound(7)}
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
            <label
              htmlFor="default-checkbox"
              className="ms-1 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              7라운드
            </label>
          </div>
        </div>
        <div className="col-span-2 justify-items-center ms-4">
          <button
            className="bg-blue-500 hover:bg-blue-400 px-2 py-1 rounded-md text-white"
            onClick={handleQuickstart}
          >
            빠른시작
          </button>
        </div>
        <div className="col-span-2 justify-items-center ms-2">
          <button
            onClick={() => {
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
      <div className="bg-background-1 row-span-8 rounded-md grid grid-cols-12 shadow-md gap-1">
        {rooms.map((room: number, i: number) => (
          <div className="col-span-6 p-1 m-1 rounded-md" key={i}>
            <GameRoom color={RoomColor[i]} />
          </div>
        ))}
      </div>
      <section className="row-span-2 flex justify-center">
        <Pagination />
      </section>
    </div>
  );
}
