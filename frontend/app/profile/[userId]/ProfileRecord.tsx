import UserRecordInfo from "./ProfileRecordInfo";
import Image from "next/image";
import penguin from "../../../public/src/assets/images/penguin.png";
import { useQuery, UseQueryResult } from "react-query";
import { useParams } from "next/navigation";
import profileStore from "@/public/src/stores/profile/profileStore";
import axios from "axios";
import useGetProfileImage from "@/public/src/hooks/useGetProfileImage";

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

export default function UserRecord() {
  const { toggleButton } = profileStore();
  const params = useParams<{ userId?: string }>();
  const id: string | undefined = params.userId;
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

  return (
    <div className="m-4 bg-white rounded-md col-start-4 col-end-11 grid grid-rows-12 shadow-lg hover:-translate-y-1 transition ease-in-out duration-500">
      <div className="shadow row-start-1 row-end-4 grid grid-cols-12">
        <div className="col-start-1 col-end-5 flex justify-center items-center ">
          <Image
            className="rounded-full ring-2 ring-background-1 dark:ring-background-1"
            src={useGetProfileImage(result?.asset)}
            alt="Extra large avatar"
            width={120}
          ></Image>
        </div>
        <div className="col-start-5 col-end-13 grid grid-rows-12">
          <div className="grid m-4 row-start-1 row-end-13 justify-center items-center  grid-cols-4">
            <div className="flex-col justify-center items-center col-span-1">
              <div className="text-center font-extrabold text-xl">
                {result?.asset.toLocaleString()}원
              </div>
              <div className="text-center text-textColor-1">시드</div>
            </div>
            <div className="flex-col justify-center items-center col-span-1">
              <div className="text-center font-extrabold text-xl">
                {result?.win}승 {result?.lose}패
              </div>
              <div className="text-center text-textColor-1">전적</div>
            </div>
            <div className="flex-col justify-center items-center col-span-1">
              <div className="text-center font-extrabold text-xl text-red-500">
                {result &&
                  (result.win + result.lose == 0
                    ? `0%`
                    : `${(
                        (result.win / (result.win + result.lose)) *
                        100
                      ).toFixed(2)}%`)}
              </div>
              <div className="text-center text-textColor-1">승률</div>
            </div>
            <div className="flex-col justify-center items-center col-span-1">
              <div className="text-center font-extrabold text-xl text-red-500">
                {toggleButton == "single"
                  ? result &&
                    `${
                      result.singleAvgRoi !== null
                        ? result.singleAvgRoi.toFixed(2)
                        : 0
                    }%`
                  : result &&
                    `${
                      result.multiAvgRoi !== null
                        ? result.multiAvgRoi.toFixed(2)
                        : 0
                    }%`}
              </div>
              <div className="text-center text-textColor-1">평균 수익률</div>
            </div>
          </div>
        </div>
      </div>
      <UserRecordInfo></UserRecordInfo>
    </div>
  );
}
