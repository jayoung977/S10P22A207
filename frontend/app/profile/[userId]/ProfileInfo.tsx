// "use client";
import Image from "next/image";
import styles from "./page.module.css";
import UserRecord from "./ProfileRecord";
import bronze from "../../../public/src/assets/images/bronze.png";
import profileStore from "@/public/src/stores/profile/profileStore";
import { useQuery, UseQueryResult } from "react-query";
import { useParams } from "next/navigation";
import axios from "axios";
import userStore from "@/public/src/stores/user/userStore";
import Swal from "sweetalert2";

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
  const fetchUserInfo = async () => {
    const response = await axios({
      method: "get",
      url: `https://j10a207.p.ssafy.io/api/member/profile?memberId=${id}`,
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
      },
    });
    return response.data;
  };

  const { toggleButton, setToggleButton } = profileStore();
  const { data, isLoading, error }: UseQueryResult<UserInfo, Error> = useQuery(
    "userInfo",
    fetchUserInfo
  );

  if (isLoading) {
    return <div className="rainbow"></div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }
  const { result }: { result: resultType | null } = data
    ? data
    : { result: null };

  const sendFriendRequest = async () => {
    axios({
      method: "post",
      url: "https://j10a207.p.ssafy.io/api/friend-ask",
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
      },
    });
  };
  const handleFriendRequest = () => {
    Swal.fire("친구요청을 보냈어요!");
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
          {Number(memberId) != Number(id) && (
            <button
              type="button"
              className="w-48 text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700 absolute bottom-2 "
              onClick={() => {
                handleFriendRequest();
              }}
            >
              팔로우
            </button>
          )}
          {/* 만약 팔로우가 되어있을때는 언팔로우를 보여주기 반대는 반대 */}
          <p className="text-6xl text-textColor-2  dark:text-white">
            {result?.nickname}
          </p>
        </div>
        <div className=" row-start-5 row-end-9 flex justify-center items-center">
          <Image
            className="rounded-full w-40 h-50"
            src={bronze}
            alt="Extra large avatar"
            width={500}
            height={500}
          ></Image>
        </div>
        <div className="row-start-9 row-end-13 flex justify-center items-center">
          {result?.rankPoint}
        </div>
      </aside>
      <UserRecord></UserRecord>
    </div>
  );
}
