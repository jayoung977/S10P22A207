import Image from "next/image";
import ProfileImage from '@/public/src/assets/images/profile-person-image.png'
import type { FundDetail } from "@/public/src/stores/fund/crud/FundCrudStore";
import { useQuery, UseQueryResult } from "react-query";

const fetchFundDetail = async() => {
  const response = await fetch('https://j10a207.p.ssafy.io/api/fund/fund-detail?fundId=1');
  return response.json();
}


export default function InprogressFundDetail() {
  const { data, isLoading, error }: UseQueryResult<FundDetail,Error> = useQuery('FundDetail', fetchFundDetail) 

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error: {error.message}</div>
  }

  const { result }: {result: FundDetail | null } = data ? data : {result: null};
  console.log(data)

  type Member = {
    nickname : string
    money: number 
  }

  
  const fundMembers: Member[] = [
    {nickname: "삼성전자", money: 15000000},
    {nickname: "현대자동차", money: 10000000},
    {nickname: "LG전자", money: 25000000},
    {nickname: "네이버", money: 10000000},
    {nickname: "NCsoft", money: 5000000},
    {nickname: "Hynix", money: 5000000},
    {nickname: "CJ", money: 2000000},
  ]

  let fundMoney = 0
  fundMembers.forEach((fund)=> {
    fundMoney += fund.money
  })

  return (
    <div className='bg-big-1 p-2 rounded-md row-span-11 grid grid-rows-12 gap-2 mx-auto xl:max-w-screen-xl'>
      {/* 펀드 소개 */}
      <div className="row-span-3 p-4 bg-small-3 rounded-lg text-textColor-2 border grid grid-rows-4">
        <div className="row-span-1 items-center text-center">
          <div className="text-xl font-bold">용수는 돈을 복사해요 0</div>
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
                  용수리언덕
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
            <div className="row-span-1 text-lg">시드머니</div>
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
                  종목명
              </th>
              <th scope="col" className="px-6 py-3">
                  매수금액
              </th>
              <th scope="col" className="px-6 py-3">
                  평가손익
              </th>
              <th scope="col" className="px-6 py-3">
                  수익률
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
                <td className="px-6 py-4">
                  + 20,000,000 원
                </td>
                <td className="px-6 py-4">
                  +20.0%
                </td>
              </tr>
              )
            }) 
            }
          </tbody>
        </table>
      </div>
      {/* 펀드 status */}
      <div className="row-span-2 bg-textColor-1 text-textColor-2 rounded-md grid grid-cols-4">
        <div className="col-span-1 text-lg mt-2 ms-10">총합</div>
        <div className="col-span-1 ms-4 text-lg mt-2">{fundMoney.toLocaleString()} 원</div>
        <div className="col-span-1 text-lg mt-2 ms-10">100,000,000원</div>
        <div className="col-span-1 text-lg mt-2 ms-10">+ 20 %</div>
      </div>
      <div className="row-span-1">
          <button
            onClick={()=> {window.location.href = '/fund/1/play';}}
          className="w-full border rounded-md bg-small-9 hover:bg-teal-400 py-2 text-textColor-2 text-center">펀드 게임하러 가기
          </button>
      </div>
    </div>
  )
}