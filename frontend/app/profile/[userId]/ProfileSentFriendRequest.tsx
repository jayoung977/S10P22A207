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

interface resultType {
  memberId: number;
  nickname: string;
  assets: number;
  isLogin: boolean;
}

interface SentFriendRequestInfo {
  result: resultType[];
}

const fetchSentFriendRequests = async () => {
  const response = await axios({
    url: "https://j10a207.p.ssafy.io/api/friend-ask/send-list",
    method: "get",
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
    },
  });
  return response.data;
};

export default function ProfileSentFriendRequest() {
  const {
    isSentOpen,
    setIsSentOpen,
    setSentFriendRequests,
    sentFriendRequests,
  } = profileStore();

  const {
    data,
    isLoading,
    error,
  }: UseQueryResult<SentFriendRequestInfo, Error> = useQuery(
    "userSentFriendRequestsInfo",
    fetchSentFriendRequests
  );

  const queryClient = useQueryClient();

  const { mutate: deleteFriendRequest } = useMutation(
    (nickname: string) =>
      axios({
        method: "delete",
        url: `https://j10a207.p.ssafy.io/api/friend-ask/cancel?nickname=${nickname}`,
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
        },
      }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("userSentFriendRequestsInfo");
      },
    }
  );

  if (!isSentOpen) return null;
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
      <div className="fixed z-50 w-full h-full flex justify-center items-center">
        <div className="relative p-4 w-full max-w-2xl max-h-full ">
          <div className="relative bg-white rounded-lg shadow dark:bg-gray-700 ">
            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 ">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                보낸 친구 요청 목록
              </h3>
              <button
                type="button"
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                onClick={() => {
                  setIsSentOpen(!isSentOpen);
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
                        src={useGetProfileImage(item.assets)}
                        alt="Extra large avatar"
                        width={50}
                      ></Image>
                      <span className="m-2 text-xl">{item.nickname}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <button
                        type="button"
                        className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 focus:outline-none dark:focus:ring-red-800 m-2"
                        onClick={() => {
                          deleteFriendRequest(item.nickname);
                        }}
                      >
                        취소
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
