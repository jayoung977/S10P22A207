'use client'

import Image from "next/image";
import { useRouter } from "next/navigation";

export default function FundSettlementModal({isOpen, onClose}:any){

  type Member = {
    nickname : string
    investMoney: number  
    profit: number
  }


  const router = useRouter();
  const fundMembers: Member[] = [
    {nickname: "최강창호", investMoney: 15000000, profit: 1000000},
    {nickname: "이제헌신짝", investMoney: 10000000, profit: 2000000},
    {nickname: "김민규동", investMoney: 25000000, profit: 1500000},
    {nickname: "권원영보스", investMoney: 10000000, profit: 1100000},
    {nickname: "자영안자영", investMoney: 5000000, profit: 1204000},
    {nickname: "이용수리언덕", investMoney: 5000000, profit: 3300000},
    {nickname: "박민철분다량함유", investMoney: 2000000, profit: 1300000},
  ]

  let fundMoney = 0
  if(!isOpen) return null;

  return(
        <div className='fixed z-50 left-1/2 -translate-x-1/2 top-0 bg-big-1 w-[800px] h-[600px] shadow-lg shadow-gray-400 rounded-md row-span-11 grid grid-rows-12 gap-2 mx-auto '>
          {/* 펀드 소개 */}
          <div className="row-span-3 p-4 bg-small-15 rounded-t-lg text-textColor-2 border grid grid-rows-4">
            <div className="row-span-1 items-center text-center">
              <div className="text-xl font-bold">용수는 돈을 복사해요 0</div>
            </div>
            <div className="row-span-3 grid grid-cols-6 gap-4 mt-3">
              <div className="col-span-2 grid grid-rows-3">
                <div className="row-span-1 text-lg">펀드매니저</div>
                <div>용수리언덕</div>
              </div>
              <div className="col-span-2 grid grid-rows-3">
                <div className="row-span-1 text-lg">기간</div>
                <div>2024.03.05 ~ 2024.03.11</div>
              </div>
              <div className="col-span-1 grid grid-rows-3">
                <div className="row-span-1 text-lg">종목</div>
                <div>철강, 조선</div>
              </div>
              <div className="col-span-1 grid grid-rows-3">
                <div className="row-span-1 text-lg">시드머니</div>
                <div>100,000,000원</div>
              </div>
            </div>
          </div>
          {/* 가입자 */}
          <div className="row-span-6 border rounded-md overflow-y-auto" style={{height: 'calc(35vh)'}}>
            <table className="w-full  text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400"   >
              <thead className="text-md border-b bg-background-1 text-gray-700 uppercase dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                      가입자
                  </th>
                  <th scope="col" className="px-6 py-3">
                      투자금액
                  </th>
                  <th scope="col" className="px-6 py-3">
                      최종손익
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
                        {fundmember.investMoney.toLocaleString()} 원
                    </td>
                    <td className="px-6 py-4">
                      {fundmember.profit.toLocaleString()} 원
                    </td>
                  </tr>
                  )
                }) 
                }
              </tbody>
            </table>
          </div>
          {/* 가입신청 */}
          <div className="row-span-3 m-1 bg-textColor-1 text-textColor-2 rounded-md grid grid-cols-6">
            <div className="col-span-1 grid grid-rows-2 mt-2 ms-5">
              <div>펀드 수수료</div>
              <div>평가손익</div>
            </div>
            <div className="col-span-2 grid grid-rows-2 ms-4 text-lg mt-2">
              <div> 3 % </div>
              <div>+10,000,000 원</div>
            </div>
            <div className="col-span-1 grid grid-rows-2 mt-2 ms-5">
              <div>최종손익</div>
              <div>돌려받는 금액</div>
            </div>
            <div className="col-span-2 grid grid-rows-2 ms-4 text-lg mt-2">
              <div> +9,700,000 원</div>
              <div>109,7000,000 원</div>
            </div>

          </div>
          <div className="row-span-1 m-2">
              <button onClick={()=>{onClose()}} className="w-full border rounded-md bg-small-3 hover:bg-red-400 py-2 text-textColor-2 text-center">종료하기</button>
          </div>
        </div>
  )
}