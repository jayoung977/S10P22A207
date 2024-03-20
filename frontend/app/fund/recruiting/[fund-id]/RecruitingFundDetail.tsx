import Image from "next/image";
import ProfileImage from '@/public/src/assets/images/profile-image.png'
import { useRouter } from "next/navigation"
import { useMutation, UseMutationResult, useQuery, UseQueryResult } from "react-query";
import type { FundDetail } from "@/public/src/stores/fund/crud/FundCrudStore";
import axios, { AxiosError } from "axios";
import { useState } from "react";

type FundRegister = {
  fundId: number,
  investmentAmount: number,
}

const fetchFundDetail = async() => {
  const response = await fetch(`https://j10a207.p.ssafy.io/api/fund/fund-detail?fundId=1`);
  return response.json()
}

const RegisterFund = async(register:FundRegister) => {
  const { data } = await axios.post('https://j10a207.p.ssafy.io/api/fund/register?loginUserId=1',register);
  return data
}

export default function RecruitingFundDetail(){
  const [investmoney, setInvestmoney] = useState(0)
  type Member = {
    nickname : string
    money: number 
  }

  
  const router = useRouter();
  const fundMembers: Member[] = [
    {nickname: "최강창호", money: 15000000},
    {nickname: "이재용", money: 10000000},
    {nickname: "이제헌", money: 25000000},
    {nickname: "권원영보스", money: 10000000},
    {nickname: "자영안자영", money: 5000000},
    {nickname: "용수리언덕", money: 5000000},
    {nickname: "김민규친척아님", money: 2000000},
  ]
  
  let fundMoney = 0
  fundMembers.forEach((fund)=> {
    fundMoney += fund.money
  })
  
  const {
    mutate,
    isLoading: isMutationLoading,
    isError: isMutationError,
    error: mutationError,
    isSuccess: isMutationSuccess,
  }: UseMutationResult<FundRegister, AxiosError, FundRegister, unknown> = useMutation<FundRegister, AxiosError, FundRegister>(RegisterFund);
  
  const {
    data,
    isLoading: isQueryLoading,
    error: queryError,
  }: UseQueryResult<FundDetail, Error> = useQuery('FundDetail', fetchFundDetail);



  if (isQueryLoading) {
    return <div>Loading...</div>
  }

  if (queryError) {
    return <div>Error: {queryError.message}</div>
  }

  const { result }: {result: FundDetail | null } = data ? data : {result: null};
  console.log(data)

  return (
    <div className='bg-big-1 p-2 rounded-md row-span-11 grid grid-rows-12 gap-2 mx-auto xl:max-w-screen-xl'>
      {
        isMutationLoading ? (
          '펀드 생성 중...'
        ) : (
          <>
            {isMutationError && <p>error: {mutationError.message}</p>}
            
            {isMutationSuccess && <p>펀드 생성 성공!</p>}
          </>
        )
      }
      {/* 펀드 소개 */}
      <div className="row-span-3 p-4 bg-small-1 rounded-lg text-textColor-2 border grid grid-rows-4">
        <div className="row-span-1 items-center text-center">
          <div className="text-xl font-bold">민규는 뭐든지 할 수 있어</div>
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
                    borderRadius: '50%'
                  }}
                />
              </div>
              <div className="col-span-3">
                <div>
                  민규가한대요
                </div>
              </div>
            </div>
          </div>
          <div className="col-span-2 grid grid-rows-3">
              <div className="row-span-1 text-lg">기간</div>
              <div>시작: 2024.03.05</div>
              <div>끝:  2024.03.11</div>
          </div>
          <div className="col-span-1 grid grid-rows-3">
              <div className="row-span-1 text-lg">종목</div>
              <div>철강, 조선</div>
          </div>
          <div className="col-span-1 grid grid-rows-3">
              <div className="row-span-1 text-lg">목표금액</div>
              <div>100,000,000원</div>
          </div>
        </div>
      </div>
      {/* 가입자 */}
      <div className="row-span-7 border rounded-md overflow-y-auto" style={{height: 'calc(50vh)'}}>
        <table className="w-full  text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400"   >
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
            {
            fundMembers.map((fundmember, i:number)=> {
              return (
              <tr key={i} className="bg-white border-b text-md dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {fundmember.nickname}
                </th>
                <td className="px-6 py-4">
                    {fundmember.money.toLocaleString()} 원
                </td>
              </tr>
              )
            }) 
            }
          </tbody>
        </table>
      </div>
      {/* 가입신청 */}
      <div className="row-span-3 grid grid-rows-2 gap-4">
        <div className="row-span-1 bg-background-1 rounded-md grid grid-cols-2">
          <div className="col-span-1 text-lg mt-2 ms-10">{fundMembers.length}/20</div>
          <div className="col-span-1 ms-4 text-lg mt-2">{fundMoney.toLocaleString()} 원</div>
        </div>
        <div className="row-span-1 rounded-md gap-4 grid grid-cols-2">
          <div className="col-span-1">
            <input 
              type="text"
              id="simple-search"
              value={investmoney}
              onChange={()=>{setInvestmoney(investmoney)}}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="투자 금액을 입력하세요. (,없이 원 단위)" required />
          </div>
          <button
            onClick={()=>{mutate({
              fundId: 2,
              investmentAmount: Number(investmoney),
            })}}
           className="col-span-1 text-textColor-2 text-xl bg-button-1 rounded-md items-center">가입신청</button>
        </div> 
      </div>
    </div>
  )
}