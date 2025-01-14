"use client";
import Image from "next/image";
import styles from "./page.module.css";
import UserRecord from "./ProfileRecord";
import bronze from "../../../public/src/assets/images/Tier/diamond.png";
import profileStore from "@/public/src/stores/profile/profileStore";
import { useQuery, UseQueryResult } from "react-query";
import { useParams } from "next/navigation";
import axios from "axios";
import userStore from "@/public/src/stores/user/userStore";
import Swal from "sweetalert2";
import { useMutation, useQueryClient } from "react-query";

import ProfileFriendRequest from "./ProfileFriendRequest";
import useGetProfileRank from "@/public/src/hooks/useGetProfileRank";
import useClickSound from "@/public/src/components/clickSound/DefaultClick";

interface resultType {
  memberID: number;
  email: string;
  nickname: string;
  birthYear: number;
  gender: string;
  asset: number;
  rankPoint: number;
  win: number;
  lose: number;
  singleAvgRoi: number;
  multiAvgRoi: number;
}

interface UserInfo {
  result: resultType;
}

export default function UserInfo() {
  const params = useParams<{ userId?: string }>();
  const id: string | undefined = params.userId;
  const { memberId } = userStore();
  const { isOpen, setIsOpen, setFriendRequests, friendRequests } =
    profileStore();
  const playClickSound = useClickSound();

  const fetchUserInfo = async () => {
    const response = await axios({
      method: "get",
      url: `https://zayoung21.store/api/member/profile?memberId=${id}`,
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
      },
    });
    return response.data;
  };

  const { toggleButton, setToggleButton } = profileStore();
  const {
    data: userInfoData,
    isLoading: userInfoLoading,
    error: userInfoError,
  }: UseQueryResult<UserInfo, Error> = useQuery("userInfo", fetchUserInfo);

  const checkFriendRequest = async () => {
    const response = await axios({
      method: "get",
      url: `https://zayoung21.store/api/friend/check-friend?followingId=${id}`,
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
      },
    });
    return response.data;
  };

  const {
    data: isFriendData,
    isLoading: isFriendLoading,
    error: isFriendError,
  }: UseQueryResult<any, Error> = useQuery("isFriend", checkFriendRequest);

  const queryClient = useQueryClient();

  const { mutate: sendFriendRequest } = useMutation(
    (request: any) =>
      axios({
        method: "post",
        url: "https://zayoung21.store/api/friend-ask",
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
        },
        data: request,
      }),
    {
      onSuccess: () => {
        Swal.fire("친구 하기 요청을 보냈어요!");
        // 필요한 경우 특정 쿼리를 무효화할 수 있습니다.
        queryClient.invalidateQueries("isFriend");
      },
    }
  );

  const { mutate: sendNoFriendRequest } = useMutation(
    () =>
      axios({
        method: "delete",
        url: `https://zayoung21.store/api/friend/delete?followingId=${id}`,
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
        },
      }),
    {
      onSuccess: () => {
        Swal.fire("친구 안하기 요청을 보냈어요!");
        // 필요한 경우 특정 쿼리를 무효화할 수 있습니다.
        queryClient.invalidateQueries("isFriend");
      },
    }
  );

  if (userInfoLoading || isFriendLoading) {
    return <div className="rainbow"></div>;
  }

  if (userInfoError || isFriendError) {
    return (
      <div>
        Error: {userInfoError?.message} & {isFriendError?.message}
      </div>
    );
  }

  const { result }: { result: resultType | null } = userInfoData
    ? userInfoData
    : { result: null };

  const myFriend = isFriendData?.result;

  const handleFriendRequest = () => {
    const request = { nickname: result?.nickname };
    sendFriendRequest(request);
  };

  return (
    <div className="row-start-2 row-end-13 grid grid-cols-10 bg-background-1 ">
      <aside className="m-4 bg-white rounded-md col-start-1 col-end-4 grid grid-rows-12 shadow-lg hover:-translate-y-1 transition ease-in-out duration-500">
        <div
          className={`${toggleButton === "single" && `bg-small-6`} ${
            toggleButton === "multi" && `bg-small-4`
          } ${toggleButton === "managerFund" && `bg-small-10`}
           ${toggleButton === "memberFund" && `bg-small-1`} ${
            toggleButton === "board" && `bg-small-5`
          } rounded-md row-start-1 row-end-5 flex justify-center items-center relative`}
        >
          {/* 프로필 id와 내 id가 다르면 보여주기 */}
          {Number(memberId) != Number(id) ? (
            myFriend !== true ? (
              <button
                type="button"
                className="w-48 text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700 absolute bottom-2 "
                onClick={() => {
                  playClickSound();
                  handleFriendRequest();
                }}
              >
                친구 요청
              </button>
            ) : (
              <button
                type="button"
                className="w-48 text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700 absolute bottom-2 "
                onClick={() => {
                  playClickSound();
                  sendNoFriendRequest();
                }}
              >
                친구 삭제
              </button>
            )
          ) : (
            <button
              type="button"
              className="w-48 text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700 absolute bottom-2 "
              onClick={() => {
                playClickSound();
                setIsOpen(!isOpen);
              }}
            >
              친구 요청 목록
            </button>
          )}
          {/* 만약 팔로우가 되어있을때는 언팔로우를 보여주기 반대는 반대 */}
          <p className="text-6xl text-textColor-2  dark:text-white">
            {result?.nickname}
          </p>
        </div>
        <div className="row-start-5 row-end-9 flex justify-center items-center">
          <Image
            className="ring-2 rounded-full ring-background-1"
            src={useGetProfileRank(result?.rankPoint)}
            alt="Tier Image"
            width={150}
          ></Image>
        </div>
        <div className="row-start-9 row-end-13 flex justify-center items-center">
          {result?.rankPoint}점
        </div>
      </aside>
      <UserRecord></UserRecord>
    </div>
  );
}
