"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import profileStore from "@/public/src/stores/profile/profileStore";
import Image from "next/image";
import useGetProfileImage from "@/public/src/hooks/useGetProfileImage";
import { useParams } from "next/navigation";
import userStore from "@/public/src/stores/user/userStore";
import Swal from "sweetalert2";
import {
  UseQueryResult,
  useQuery,
  useMutation,
  useQueryClient,
} from "react-query";
import useClickSound from "@/public/src/components/clickSound/DefaultClick";

interface resultType {
  memberId: number;
  nickname: string;
  asset: number;
  isLogin: boolean;
}

interface FriendRequestInfo {
  result: resultType[];
}

const fetchFriendRequests = async () => {
  const response = await axios({
    url: "https://j10a207.p.ssafy.io/api/friend-ask/receive-list",
    method: "get",
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
    },
  });
  console.log(response.data);
  return response.data;
};
export default function ProfileFriendRequest() {
  const { setIsOpen, isOpen, isSentOpen, setIsSentOpen } = profileStore();
  const { data, isLoading, error }: UseQueryResult<FriendRequestInfo, Error> =
    useQuery("userFriendRequestsInfo", fetchFriendRequests);

  const queryClient = useQueryClient();
  const playClickSound = useClickSound();

  const { mutate: acceptFriendRequest } = useMutation(
    (nickname: string) =>
      axios({
        method: "post",
        url: "https://j10a207.p.ssafy.io/api/friend-ask/accept",
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
        },
        data: { nickname },
      }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("userFriendRequestsInfo");
      },
    }
  );

  const { mutate: rejectFriendRequest } = useMutation(
    (nickname: string) =>
      axios({
        method: "delete",
        url: `https://j10a207.p.ssafy.io/api/friend-ask/reject?nickname=${nickname}`,
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
        },
      }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("userFriendRequestsInfo");
      },
    }
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
  {
    return (
      <div
        className={
          "absolute z-40 w-full h-full flex justify-center items-center"
        }
      >
        <div className="relative p-4 w-full max-w-2xl max-h-full ">
          <div className="relative bg-white rounded-lg shadow dark:bg-gray-700 ">
            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 ">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                받은 친구 요청 목록
              </h3>
              <button
                onClick={() => {
                  playClickSound();
                  setIsSentOpen(!isSentOpen);
                }}
                className="w-48 text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700 absolute bottom-2 right-2"
              >
                보낸 친구 요청 목록
              </button>
              <button
                type="button"
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                onClick={() => {
                  playClickSound();
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
              {result?.map((item, i) => {
                return (
                  <div
                    key={i}
                    className="m-4 p-4 flex justify-between items-center"
                  >
                    <div className="flex justify-between items-center">
                      <Image
                        className="rounded-full ring-1 ring-background-1 dark:ring-gray-500"
                        src={useGetProfileImage(item.asset)}
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
                          playClickSound();
                          acceptFriendRequest(item.nickname);
                          console.log("전송");
                        }}
                      >
                        수락
                      </button>
                      <button
                        type="button"
                        className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 focus:outline-none dark:focus:ring-red-800 m-2"
                        onClick={() => {
                          playClickSound();
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
}
