"use client";

import Image from "next/image";
import ProfileImage from "@/public/src/assets/images/profile-image.png";
import { useParams, useRouter } from "next/navigation";
import {
  useQuery,
  UseQueryResult,
} from "react-query";
import type {
  FundDetail,
  FundMembers,
} from "@/public/src/stores/fund/crud/FundCrudStore";
import axios from "axios";
import { useState, useEffect } from "react";

type FundRegister = {
  fundId: number;
  investmentAmount: number;
};

const fetchFundDetail = async (fundId: string, token: string|null) => {
  const response = await fetch(
    `https://j10a207.p.ssafy.io/api/fund/fund-detail?fundId=${fundId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.json();
};


export default function RecruitingFundDetail() {
  const token = typeof window !== 'undefined' ? sessionStorage.getItem('accessToken') : null;
  const [fundManager, setFundManager] = useState(true);
  const [fundDetail, setFundDetail] = useState<FundDetail | null>(null);
  const [investmoney, setInvestmoney] = useState("");
  
  const params = useParams();
  const fundId = params["fund-id"] as string;

  const {
    data,
    isLoading: isQueryLoading,
    error: queryError,
  }: UseQueryResult<FundDetail, Error> = useQuery(
    ["FundDetail", fundId, token],
    () => fetchFundDetail(fundId, token),
    {
      onSuccess: (response) => {console.log("펀드 상세 정보:", response.result);},
      onError: (error) => {console.error(error);},
    }
    );
    
    useEffect(() => {
      if (data?.result) {
        setFundDetail(data.result);
      }
    }, [data]);
  
  const RegisterFund = async (
    fundId: string,
    investmoney: string,
  ) => {
    const registerForm = {
      fundId: Number(fundId),
      investmentAmount: Number(investmoney),
    };
    await axios.post(
      "https://j10a207.p.ssafy.io/api/fund/register?loginUserId=1",
      registerForm,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    .then((response)=> {
      console.log(response.data)
    })
    .catch((error)=> {
      console.error(error)
    })
  };
  
  const StartFund = async (fundId: string, fundName: string ) => {
    const fundInfo = {
      fundId: Number(fundId),
      fundName: fundName,
    };
    await axios.put(
      "https://j10a207.p.ssafy.io/api/fund/start",
      fundInfo,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    .then((response)=> {
      console.log(response.data)
    })
    .catch((error)=> {
      console.error(error)
    })
  };


  if (isQueryLoading) { return <div className="rainbow"></div>; }
  if (queryError) { return <div>Error: {queryError.message}</div>; }

  const { result }: { result: FundDetail | null } = data ? data : { result: null };

  const fundName = result?.fundName as string;

  // 1. 펀드 매니저가 아닌 경우
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInvestmoney(e.target.value);
  };


  return (
    <div className="bg-big-1 p-2 rounded-md row-span-11 grid grid-rows-12 gap-2 mx-auto xl:max-w-screen-xl">
      {/* 펀드 소개 */}
      <div className="row-span-3 p-4 bg-small-1 rounded-lg text-textColor-2 border grid grid-rows-4">
        <div className="row-span-1 items-center text-center">
          <div className="text-xl font-bold">{fundDetail?.fundName}</div>
        </div>
        <div className="row-span-3 grid grid-cols-6 gap-4 mt-4">
          <div className="col-span-2 grid grid-rows-3">
            <div className="row-span-1 text-lg">펀드매니저</div>
            <div className="row-span-2 grid grid-cols-4 items-center">
              <div className="col-span-1">
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
              <div className="col-span-3">
                <div>{fundDetail?.managerNickname}</div>
              </div>
            </div>
          </div>
          <div className="col-span-2 grid grid-rows-3">
            <div className="row-span-1 text-lg">기간</div>
            <div>{fundDetail?.period} 일</div>
          </div>
          <div className="col-span-1 grid grid-rows-3">
            <div className="row-span-1 text-lg">종목</div>
            <div>{fundDetail?.industry}</div>
          </div>
          <div className="col-span-1 grid grid-rows-3">
            <div className="row-span-1 text-lg">목표금액</div>
            <div>{fundDetail?.targetAmount.toLocaleString()}원</div>
          </div>
        </div>
      </div>
      {/* 가입자 */}
      <div
        className="row-span-7 border rounded-md overflow-y-auto"
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
            {fundDetail?.fundMembers.length}/20
          </div>
          <div className="col-span-1 ms-4 text-lg mt-2">
            {/* {fundMoney.toLocaleString()} 원 */}
          </div>
        </div>
        {fundManager ? (
          <div className="row-span-1 rounded-md">
            <button
              onClick={() => {
                StartFund(fundId, fundName);
              }}
              className="w-full mb-2 p-2 text-textColor-2 text-xl bg-button-1 rounded-md items-center"
            >
              펀드시작
            </button>
          </div>
        ) : (
          <div className="row-span-1 rounded-md gap-4 grid grid-cols-2">
            <div className="col-span-1">
              <input
                type="text"
                id="invest-money"
                value={investmoney}
                onChange={handleInputChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="투자 금액을 입력하세요. (,없이 원 단위)"
                required
              />
            </div>
            <button
              onClick={() => {
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
