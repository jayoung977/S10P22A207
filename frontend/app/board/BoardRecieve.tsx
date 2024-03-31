"use client";
import Image from "next/image";
import penguin from "./../../public/src/assets/images/penguin.png";
import Swal from "sweetalert2";
import { useQuery, UseQueryResult, useQueryClient } from "react-query";
import { useMutation } from "react-query";
import axios, { AxiosResponse } from "axios";
import useFetchUserInfo from "@/public/src/hooks/useFetchUserInfo";
import userStore from "@/public/src/stores/user/userStore";
import useGetProfileImage from "@/public/src/hooks/useGetProfileImage";

interface ResultType {
  id: number;
  nickname: string;
  content: string;
  communityFileList: string[];
}

interface BoardInfo {
  result: ResultType[];
}

interface DeleteBoardResponse {
  message: string;
}

const deleteBoard = async (
  boardId: number
): Promise<AxiosResponse<DeleteBoardResponse>> => {
  const response = await axios({
    method: "delete",
    url: `https://j10a207.p.ssafy.io/api/community?communityId=${boardId}`,
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
    },
  });
  return response;
};

const fetchBoardInfo = async () => {
  const response = await axios({
    method: "get",
    url: "https://j10a207.p.ssafy.io/api/community/all",
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
    },
  });
  return response.data;
};

export default function BoardReceive() {
  const queryClient = useQueryClient();
  const { mutate } = useMutation(deleteBoard, {
    onSuccess: () => {
      Swal.fire("삭제됨!", "성공적으로 삭제되었습니다.", "success");
      queryClient.invalidateQueries("boardInfo");
    },
    onError: (error) => {
      console.error("삭제 실패:", error);
      Swal.fire("실패!", "삭제에 실패했습니다.", "error");
    },
  });

  useFetchUserInfo();
  const { nickname, memberId } = userStore();
  const { data, isLoading, error }: UseQueryResult<BoardInfo, Error> = useQuery(
    "boardInfo",
    fetchBoardInfo
  );
  if (isLoading) {
    return <div className="rainbow"></div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const { result }: { result: ResultType[] | null } = data
    ? data
    : { result: null };
  const handleDelete = (boardId: number): void => {
    Swal.fire({
      title: "정말로 삭제하시겠습니까?",
      text: "이 작업은 되돌릴 수 없습니다!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "삭제하기",
      cancelButtonText: "삭제안하기",
    }).then((result) => {
      if (result.isConfirmed) {
        mutate(boardId);
      }
    });
  };

  return (
    <div style={{ maxHeight: "60vh" }} className="overflow-auto">
      {result?.map((item, i) => {
        return (
          <div key={i}>
            <div className="grid grid-cols-12">
              <div
                className={`col-start-2 col-end-11 min-h-40 rounded-md bg-small-${
                  (item.id % 15) + 1
                } m-2 w-200 h-100 shadow-lg hover:-translate-y-1 transition ease-in-out duration-500`}
              >
                <div className="m-4 grid-rows-4">
                  <div className="flex justify-between">
                    <div className="px-2 bg-white rounded-md">
                      {item.nickname}
                    </div>
                    {item.nickname == nickname ? (
                      <div
                        className="px-2 bg-white rounded-md hover:cursor-pointer"
                        onClick={() => handleDelete(item.id)}
                      >
                        삭제
                      </div>
                    ) : (
                      <div></div>
                    )}
                  </div>
                  <div className="my-2 py-2 min-h-40 bg-white rounded-md">
                    <div className="p-4 m-4">
                      {item.content}
                      {item.communityFileList.map((photo, i) => {
                        return (
                          <img
                            key={i}
                            className="w-full"
                            src={photo}
                            alt={`${i}번째사진`}
                          ></img>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex justify-center items-center">
                <Image
                  className="rounded-full ring-1 ring-background-1 dark:ring-gray-500"
                  src={useGetProfileImage(0)}
                  alt="Extra large avatar"
                  width={90}
                ></Image>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
