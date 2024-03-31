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
  useQueryClient,
  useMutation,
} from "react-query";
interface resultType {
  id: number;
  nickname: string;
  content: string;
  communityFileList: string[];
}

interface DetailPageInfo {
  result: resultType;
}

export default function ProfileBoardDetail({
  isBoardOpen,
  setIsBoardOpen,
}: any) {
  const params = useParams<{ userId?: string }>();
  const id: string | undefined = params.userId;
  const { memberId } = userStore();
  const fetchCommunityDetail = async () => {
    const response = await axios({
      url: `https://j10a207.p.ssafy.io/api/community?communityId=${isBoardOpen}`,
      method: "get",
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
      },
    });
    return response.data;
  };

  const queryClient = useQueryClient();

  const { mutate: deleteBoard } = useMutation(
    (isBoardOpen: number) =>
      axios({
        method: "delete",
        url: `https://j10a207.p.ssafy.io/api/community?communityId=${isBoardOpen}`,
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
        },
      }),
    {
      onSuccess: () => {
        console.log(isBoardOpen);
        queryClient.invalidateQueries("userBoardInfo");
        setIsBoardOpen(null);
      },
    }
  );

  const { data, isLoading, error }: UseQueryResult<DetailPageInfo, Error> =
    useQuery("DetailPageInfo", fetchCommunityDetail);

  if (isLoading) {
    return <div className="rainbow"></div>;
  }
  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const { result }: { result: resultType | null } = data
    ? data
    : { result: null };

  return (
    <div
      className={"absolute z-40 w-full h-full flex justify-center items-center"}
    >
      <div className="relative p-4 w-full max-w-2xl max-h-full ">
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700 ">
          <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 ">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              게시글 상세 페이지
            </h3>
            <button
              type="button"
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              onClick={() => {
                setIsBoardOpen(null);
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
            {/* 아이디 */}
            <div className="bg-gray-100 rounded-md p-4">
              <h3 className="text-lg font-semibold mb-2">글번호</h3>
              <p className="text-gray-700">{result?.id}</p>
            </div>

            {/* 내용 */}
            <div className="bg-gray-100 rounded-md p-4">
              <h3 className="text-lg font-semibold mb-2">내용</h3>
              <p className="text-gray-700 whitespace-pre-line">
                {result?.content}
              </p>
            </div>

            {/* 사진 */}
            <div className="bg-gray-100 rounded-md p-4">
              <h3 className="text-lg font-semibold mb-4">사진</h3>
              {result?.communityFileList.map((item, i) => (
                <img
                  key={i}
                  src={item}
                  alt=""
                  className="rounded-md object-cover w-full"
                />
              ))}
            </div>
            {memberId == Number(id) && (
              <div className="flex justify-center">
                <button
                  onClick={() => {
                    deleteBoard(isBoardOpen);
                  }}
                  className="w-48 text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700 "
                >
                  게시글 삭제
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
