'use client'

import { useRouter } from "next/navigation"
import { ReactHTMLElement, useState } from "react";
import axios from "axios";
import { UseMutationResult, useMutation } from "react-query";
import { AxiosError } from "axios";


interface NewFund {
  fundName: string,
  period: number,
  capacity: number,
  targetAmount: number,
  minimumAmount: number,
  feeType: string,
  industry: string,
} 


const createFund = async(fund: NewFund) => {
  const { data } = await axios.post(`https://j10a207.p.ssafy.io/api/fund/open?loginUserId=1`,fund);
  return data
}



export default function MakeFundModal({isOpen, onClose}: any){

  const router = useRouter();
  const [fundForm, setFundForm] = useState<NewFund>({
    fundName: '',
    industry: '',
    period: 0,
    capacity: 0,
    targetAmount: 0,
    minimumAmount: 0,
    feeType: "POST"
  })


  const handleInputChange = <T extends HTMLInputElement | HTMLSelectElement>(e: React.ChangeEvent<T>) => {
    if (e.target.name) {
      const { name, value } = e.target;
      setFundForm({ ...fundForm, [name]: value });
    }
  }
  
  const { mutate, isLoading, isError, error, isSuccess }:UseMutationResult<NewFund, AxiosError, NewFund, unknown> = useMutation<NewFund, AxiosError, NewFund>(createFund);
  
  
  const submitForm = (data:NewFund) => {
    if (data != null) {
      const newForm = {
        fundName: data.fundName,
        industry: data.industry,
        period: Number(data.period),
        capacity: Number(data.capacity),
        targetAmount: Number(data.targetAmount),
        minimumAmount: Number(data.minimumAmount),
        feeType: data.feeType
      }
      mutate(newForm)
    }
  }



  if(!isOpen) return null;


  return(
    // Main modal
    <div id="authentication-modal" tabIndex={-1} aria-hidden="true" className="overflow-y-auto overflow-x-hidden z-50 fixed translate-x-1/3 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
      {
        isLoading ? (
          '펀드 생성 중...'
        ) : (
          <>
            {isError && <p>error: {error.message}</p>}
            
            {isSuccess && <p>펀드 생성 성공!</p>}
          </>
        )
      }
      <div className="relative p-4 w-full max-w-md max-h-full">
        {/* Modal content */}
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
            {/* Modal header */}
          <div className="p-4 text-center md:p-5 border-b rounded-t dark:border-gray-600">
              <h3 className="font-semibold text-lg text-gray-900 dark:text-white">
                  펀드 개설
              </h3>
          </div>
          {/* Modal body */}
          <div className="p-4 md:p-5">
            <div className="space-y-4" >
              <div>
                  <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">이름</label>
                  <input type="text"  name="fundName" id="fund-name" value={fundForm.fundName} onChange={handleInputChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="최대 30자" />
              </div>
              <div>
                  <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">산업군</label>
                  <input type="text" name="industry"  id="fund-industry" value={fundForm.industry} onChange={handleInputChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="투자하려는 산업 분야" />
              </div>
              <div>
                  <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">기간</label>
                  <div className="flex items-center justify-around">
                    <input type="number" name="period" value={fundForm.period} onChange={handleInputChange} id="fund-period"  className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="2~" /> 
                  </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div className="col-span-1">
                  <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">인원</label>
                  <input type="text" name="capacity" id="fund-members" value={fundForm.capacity} onChange={handleInputChange}  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="2 ~ 100명" />
                </div>
                <div className="col-span-1">
                  <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">펀드수수료 정산</label>
                  <select 
                   id="fund-fee"
                   name="feeType"
                   value={fundForm.feeType}
                   onChange={handleInputChange}
                     className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" >
                    <option value="PRE">펀드수수료 선지급</option>
                    <option value="POST">펀드수수료 후정산</option>
                  </select>
                </div>
              </div>
              <div>
                  <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">자금</label>
                  <input type="text" name="targetAmount" id="fund-target-money" value={fundForm.targetAmount} onChange={handleInputChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="최소 100,000,000원" />
              </div>
              <div>
                  <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">1인당 투자금액</label>
                  <input type="text" name="minimumAmount" id="fund-minimum-money" value={fundForm.minimumAmount} onChange={handleInputChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="1,000,000원 ~ 최대" />
              </div>

              <div className="flex justify-around">
                <button onClick={()=>{onClose()}}  type="button" className="w-1/2 m-1 text-textColor-1 bg-button-2 hover:bg-gray-400 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">취소</button>
                <button onClick={()=>{
                  submitForm(fundForm)
                  // onClose 
                  // // fund number를 받아서 바로 router로 이동
                  // router.push('./recruiting/1')
                }}  
                type="button" className="w-1/2 m-1 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">펀드 개설</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div> 
  )
}