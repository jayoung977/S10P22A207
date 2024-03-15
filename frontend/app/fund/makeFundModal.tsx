'use client'

import { useRouter } from "next/navigation"
import { useState } from "react";


export default function MakeFundModal({isOpen, onClose}: any){
  const router = useRouter();
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const handleStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStartDate(e.target.value);
    console.log(e.target.value)
  };

  const handleEndDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEndDate(e.target.value);
    console.log(e.target.value)
  };


  if(!isOpen) return null;

  return(
    // Main modal
    <div id="authentication-modal" tabIndex={-1} aria-hidden="true" className="overflow-y-auto overflow-x-hidden z-50 fixed translate-x-1/3 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
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
                  <input type="text"  id="fund-name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="최대 30자" />
              </div>
              <div>
                  <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">기간</label>
                  <div className="flex items-center justify-around">
                    <input type="date" value={startDate} onChange={handleStartDateChange} id="fund-start"  className="w-1/3 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="YYYY-MM-DD" /> 
                    <div className="text-2xl">  / </div>
                    <input type="date" value={endDate} onChange={handleEndDateChange} id="fund-end" className="w-1/3 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="YYYY-MM-DD" />
                  </div>
              </div>
              <div>
                  <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">인원</label>
                  <input type="text" id="fund-members" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="2 ~ 100명" />
              </div>
              <div>
                  <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">자금</label>
                  <input type="text" id="fund-money" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="최소 100,000,000원" />
              </div>
              <div>
                  <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">1인당 투자금액</label>
                  <input type="text" id="fund-money-person" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="1,000,000원 ~ 최대" />
              </div>

              <div className="flex justify-around">
                <button onClick={()=>{onClose()}}  type="button" className="w-1/2 m-1 text-textColor-1 bg-button-2 hover:bg-gray-400 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">취소</button>
                <button onClick={()=>{
                  onClose 
                  // fund number를 받아서 바로 router로 이동
                  router.push('./recruiting/1')
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