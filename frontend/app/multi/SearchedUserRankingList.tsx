"use client";
import { easeInOut } from "framer-motion/dom";
import { useState } from "react";
import UserRanking from "./userRanking";
import axios from "axios";

interface ResultType {
  memberId: number;
  nickname: string;
  asset: number;
}

interface EntireUserType {
  result: ResultType[];
}

export default function SearchedUserRankingList() {
  const [search, setSearch] = useState<string>("");
  const [entireUser, setEntireUser] = useState([]);
  const fetchEntireUserData = async (search: string) => {
    const response = await axios({
      method: "get",
      url: `https://j10a207.p.ssafy.io/api/member/search?nickname=${search}`,
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
      },
    });
    console.log(response.data);
    setEntireUser(response.data.result);
  };

  return (
    <div className="row-span-9 grid grid-rows-12">
      <div className="row-span-2 flex ms-3 items-center mt-1">
        <label htmlFor="simple-search" className="sr-only">
          Search
        </label>
        <input
          type="text"
          id="simple-search"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-3/4 ps-3 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          required
          placeholder="사용자 닉네임을 검색하세요."
          onChange={(e) => {
            fetchEntireUserData(e.target.value);
          }}
          onKeyDown={(e) => {
            if (e.key == "Enter") {
              fetchEntireUserData(search);
            }
          }}
        />
        <button
          type="submit"
          className="p-2.5 ms-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          onClick={() => {
            fetchEntireUserData(search);
          }}
        >
          <svg
            className="w-4 h-4"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
            />
          </svg>
          <span className="sr-only">Search</span>
        </button>
      </div>
      <div
        className="row-span-10 overflow-auto border"
        style={{ height: "calc(38vh)" }}
      > 
        {entireUser.length > 0 ? (
          entireUser.map((x, index) => <UserRanking key={index} user={x} />)
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
}
