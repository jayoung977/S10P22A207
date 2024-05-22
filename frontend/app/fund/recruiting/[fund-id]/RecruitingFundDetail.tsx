"use client";

import Image from "next/image";
import ProfileImage from "@/public/src/assets/images/profile-image.png";
import { useParams, useRouter } from "next/navigation";
import { useQuery, useQueryClient, UseQueryResult } from "react-query";
import type {
  FundDetail,
  FundMembers,
} from "@/public/src/stores/fund/crud/FundCrudStore";
import axios from "axios";
import { useState, useEffect } from "react";
import userStore from "@/public/src/stores/user/userStore";
import Swal from "sweetalert2";
import useFetchUserInfo from "@/public/src/hooks/useFetchUserInfo";
import useClickSound from "@/public/src/components/clickSound/DefaultClick";

type FundRegister = {
  fundId: number;
  investmentAmount: number;
};

const fetchFundDetail = async (fundId: string, token: string | null) => {
  const response = await fetch(
    `https://zayoung21.store/api/fund/fund-detail?fundId=${fundId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.json();
};

export default function RecruitingFundDetail() {
  const router = useRouter();
  useFetchUserInfo();
  const playClickSound = useClickSound();
  const queryClient = useQueryClient();
  const { nickname, asset } = userStore();
  const token =
    typeof window !== "undefined"
      ? sessionStorage.getItem("accessToken")
      : null;
  const [fundDetail, setFundDetail] = useState<FundDetail | null>(null);
  const [investmoney, setInvestmoney] = useState("");
  const [isMember, setIsMember] = useState(false);
  const params = useParams();
  const fundId = params["fund-id"] as string;

  let totalFundAsset = 0;
  fundDetail?.fundMembers.forEach((fundmember: FundMembers) => {
    totalFundAsset += fundmember.investmentAmount;
  });

  const {
    data,
    isLoading: isQueryLoading,
    error: queryError,
  }: UseQueryResult<FundDetail, Error> = useQuery(
    ["FundDetail", fundId, token],
    () => fetchFundDetail(fundId, token),
    {
      onSuccess: (response) => {
        console.log("펀드 상세 정보:", response.result);
      },
      onError: (error) => {
        console.error(error);
      },
    }
  );

  useEffect(() => {
    if (data?.result) {
      setFundDetail(data.result);
    }
    const fundData = data?.result;
    fundData?.fundMembers.forEach((fundmember) => {
      if (fundmember.nickname === nickname) {
        setIsMember(true);
      }
    });
  }, [data]);

  const RegisterFund = async (fundId: string, investmoney: string) => {
    const minmoney = data?.result.minimumAmount;
    if (minmoney && Number(investmoney) < minmoney) {
      Swal.fire({
        text: "설정된 1인당 최소투자금액보다 적습니다.",
        icon: "error",
      });
      return;
    }

    if (asset && Number(investmoney) > asset) {
      Swal.fire({
        text: "본인 자산을 넘어설 수 없습니다.",
        icon: "error",
      });
      return;
    }

    const registerForm = {
      fundId: Number(fundId),
      investmentAmount: Number(investmoney),
    };
    await axios
      .post("https://zayoung21.store/api/fund/register", registerForm, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log(response.data);
        Swal.fire({
          title: "펀드 가입에 성공하셨습니다",
          icon: "success",
        });
        router.push("/fund/recruiting");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const StartFund = async (fundId: string, fundName: string) => {
    const fundInfo = {
      fundId: Number(fundId),
      fundName: fundName,
    };
    await axios
      .put("https://zayoung21.store/api/fund/start", fundInfo, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log(response.data);
        const status = response.data.status;
        if (status == 200) {
          Swal.fire({
            title: "펀드를 시작합니다!",
            icon: "success",
          });
          queryClient.invalidateQueries(["MemberFundInfo"]);
          queryClient.invalidateQueries(["ManagerFundInfo"]);
          queryClient.invalidateQueries(["InprogressFundInfo"]);
          queryClient.invalidateQueries(["RecruitingFundInfo"]);
          router.push(`/fund/in-progress/${fundId}`);
        }

        if (status == 400) {
          Swal.fire({
            title: `${response.data.message}`,
            icon: "error",
          });
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  if (isQueryLoading) {
    return <div className="rainbow"></div>;
  }
  if (queryError) {
    return <div>Error: {queryError.message}</div>;
  }

  const { result }: { result: FundDetail | null } = data
    ? data
    : { result: null };

  const fundName = result?.fundName as string;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInvestmoney(e.target.value);
  };

  return (
    <div className="bg-big-1 p-2 rounded-md row-span-11 grid grid-rows-12 gap-2 mx-auto xl:max-w-screen-xl">
      {/* 펀드 소개 */}
      <div className="row-span-4 p-4 bg-small-1 rounded-lg text-textColor-2 border grid grid-rows-4">
        <div className="relative row-span-1 w-full grid grid-cols-3 items-center text-center">
            <div className="absolute left-0 top-0 col-span-1">
              <button onClick={()=> {
                playClickSound();
                router.back()
                }} className="py-1 px-2 bg-small-14 text-textColor-1 font-bold rounded-md hover:bg-gray-300">뒤로가기</button>
            </div>
            <div className="col-start-2 col-end-3 text-xl font-bold">{fundDetail?.fundName}</div>
          <div></div>
        </div>
        <div className="row-span-3 grid grid-cols-6 items-center">
          <div className="col-span-3 grid grid-rows-3 items-center">
            <div className="row-span-1 grid grid-cols-3 items-center">
              <div className="col-span-1 text-lg">펀드매니저:</div>
              <div className="col-span-2 flex items-center">
                <div className="me-2">
                  <Image
                    src={ProfileImage}
                    alt="profile-image"
                    width={40}
                    height={40}
                    style={{
                      borderRadius: "50%",
                    }}
                  />
                </div>
                <div>{fundDetail?.managerNickname}</div>
              </div>
            </div>
            <div className="row-span-2 grid grid-cols-3">
              <div className="col-span-1 text-lg">기간:</div>
              <div className="col-span-2">{fundDetail?.period} 일</div>
              <div className="col-span-1 text-lg">종목:</div>
              <div className="colp-span-2">{fundDetail?.industry}</div>
            </div>
          </div>
          <div className="col-span-3 gap-4 grid grid-rows-3">
            <div className="grid grid-cols-3 gap-8">
              <div className="col-span-1 text-lg">목표금액:</div>
              <div className="col-span-2">
                {fundDetail?.targetAmount.toLocaleString()}원
              </div>
            </div>
            <div className="grid grid-cols-3 gap-8">
              <div className="col-span-1 text-lg">최소투자금액:</div>
              <div className="col-span-2">
                {fundDetail?.minimumAmount.toLocaleString()}원
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* 가입자 */}
      <div
        className="row-span-6 border rounded-md overflow-y-auto"
        style={{ height: "calc(50vh)" }}
      >
        <table className="w-full  text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-md border-b bg-background-1 text-gray-700 uppercase dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                이름
              </th>
              <th scope="col" className="px-6 py-3">
                투자금액
              </th>
            </tr>
          </thead>
          <tbody>
            {fundDetail?.fundMembers.length === 0 ? (
              <tr>
                <td className="col-span-4 px-6 py-4 text-center text-lg text-gray-900 dark:text-white">
                  현재 펀드멤버 없음
                </td>
              </tr>
            ) : (
              fundDetail?.fundMembers.map(
                (fundmember: FundMembers, i: number) => {
                  return (
                    <tr
                      key={i}
                      className="bg-white border-b text-md dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                    >
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        {fundmember.nickname}
                      </th>
                      <td className="px-6 py-4">
                        {fundmember.investmentAmount.toLocaleString()} 원
                      </td>
                    </tr>
                  );
                }
              )
            )}
          </tbody>
        </table>
      </div>
      {/* 가입신청 */}
      <div className="row-span-3 grid grid-rows-2 gap-4">
        <div className="row-span-1 bg-background-1 rounded-md grid grid-cols-2">
          <div className="col-span-1 text-lg mt-2 ms-10">
            {fundDetail?.fundMembers.length} / {fundDetail?.capacity} 명
          </div>
          <div className="col-span-1 ms-4 text-lg mt-2">
            {totalFundAsset.toLocaleString()} 원
          </div>
        </div>
        {nickname && fundDetail?.managerNickname === nickname ? (
          <div className="row-span-1 rounded-md">
            <button
              onClick={() => {
                playClickSound();
                StartFund(fundId, fundName);
              }}
              className="w-full mb-2 p-2 text-textColor-2 text-xl bg-button-1 rounded-md items-center"
            >
              펀드시작
            </button>
          </div>
        ) : isMember ? (
          <div className="row-span-1 rounded-md text-center">
            이미 펀드 회원입니다.
          </div>
        ) : (
          <div className="row-span-1 rounded-md gap-4 grid grid-cols-2">
            <div className="col-span-1">
              <input
                type="text"
                id="invest-money"
                value={investmoney}
                onChange={handleInputChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-2.5 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="투자 금액을 입력하세요. (,없이 원 단위)"
                required
              />
            </div>
            <button
              onClick={() => {
                playClickSound();
                RegisterFund(fundId, investmoney);
              }}
              className="col-span-1 text-textColor-2 text-xl bg-button-1 rounded-md items-center"
            >
              가입신청
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
