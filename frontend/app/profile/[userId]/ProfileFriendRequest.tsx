import { useState, useEffect } from "react";
import axios from "axios";
import profileStore from "@/public/src/stores/profile/profileStore";
import Image from "next/image";
import penguin from "../../../public/src/assets/images/penguin.png";
export default function ProfileFriendRequest() {
  const { isOpen, setIsOpen, setFriendRequests, friendRequests } =
    profileStore();
  if (!isOpen) return null;

  const acceptFriendRequest = async (nickname: string) => {
    // 친구 요청 수락 처리
    console.log("수락");
    const response = await axios({
      method: "post",
      url: "https://j10a207.p.ssafy.io/api/friend-ask/accept",
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
      },
      data: { nickname },
    });
    console.log(response.data);
    return response.data;
  };

  const rejectFriendRequest = async (nickname: string) => {
    // 친구 요청 거절 처리
    const response = await axios({
      method: "delete",
      url: `https://j10a207.p.ssafy.io/api/friend-ask/reject?nickname=${nickname}`,
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
      },
    });
    console.log(response.data);
    return response.data;
  };

  return (
    <div className="fixed z-50 w-full h-full flex justify-center items-center">
      <div className="relative p-4 w-full max-w-2xl max-h-full ">
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700 ">
          <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 ">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              친구 요청 목록
            </h3>
            <button
              type="button"
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              onClick={() => {
                setIsOpen(!isOpen);
              }}
            >
              <svg
                className="w-3 h-3"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
          </div>
          <div className="p-4 md:p-5 space-y-4 h-96 overflow-auto">
            {friendRequests.map((item, i) => {
              return (
                <div
                  key={i}
                  className="m-4 p-4 flex justify-between items-center"
                >
                  <div className="flex justify-between items-center">
                    <Image
                      className="rounded-full w-10 h-10 m-2"
                      src={penguin}
                      alt="Extra large avatar"
                      width={50}
                    ></Image>
                    <span className="m-2 text-xl">{item.nickname}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <button
                      type="button"
                      className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 m-2"
                      onClick={() => {
                        acceptFriendRequest(item.nickname);
                      }}
                    >
                      수락
                    </button>
                    <button
                      type="button"
                      className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 m-2"
                      onClick={() => {
                        rejectFriendRequest(item.nickname);
                      }}
                    >
                      거절
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
