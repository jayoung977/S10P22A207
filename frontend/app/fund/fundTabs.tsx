'use client'

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import fundCrudStore from "@/public/src/stores/fund/crud/FundCrudStore";

export default function FundTabs(){
  const router = useRouter();
  const { toggleButton, setToggleButton } = fundCrudStore();

  return (
    <div className="row-span-1 grid grid-cols-12 items-center">
      <div className="col-start-2 col-span-7 flex justify-around">
        <label className="inline-flex items-center hover:cursor-pointer">
          <input
            type="radio"
            className="sr-only peer"
            value="recruiting"
            checked={toggleButton == 'recruiting'}
            onChange={()=>{
              setToggleButton('recruiting')
              router.push('./recruiting')
            }}
            />
          <span
            className={`px-6 py-2 text-sm font-medium border border-gray-200 rounded-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 ${
              toggleButton === 'recruiting' ? 'bg-button-1 text-textColor-2' : 'bg-button-2 text-textColor-1'
            } dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white`}
          >
            모집 중
          </span>
        </label>
        <label className="inline-flex items-center hover:cursor-pointer">
          <input
            type="radio"
            className="sr-only peer"
            value="in-progress"
            checked={toggleButton == 'in-progress'}
            onChange={()=>{
              setToggleButton('in-progress')
              router.push('./in-progress')
            }}
            />
          <span
            className={`px-6 py-2 text-sm font-medium border border-gray-200 rounded-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 ${
              toggleButton === 'in-progress' ? 'bg-button-1 text-textColor-2' : 'bg-button-2 text-textColor-1'
            } dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white`}
          >
            운영 중
          </span>
        </label>
        <label className="inline-flex items-center hover:cursor-pointer">
          <input
            type="radio"
            className="sr-only peer"
            value="member"
            checked={toggleButton == 'member'}
            onChange={()=>{
              setToggleButton('member')
              router.push('./member')
            }}
            />
          <span
            className={`px-6 py-2 text-sm font-medium border border-gray-200 rounded-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 ${
              toggleButton === 'member' ? 'bg-button-1 text-textColor-2' : 'bg-button-2 text-textColor-1'
            } dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white`}
          >
            내가 가입한 펀드
          </span>
        </label>
        <label className="inline-flex items-center hover:cursor-pointer">
          <input
            type="radio"
            className="sr-only peer"
            value="manager"
            checked={toggleButton == 'manager'}
            onChange={()=>{
              setToggleButton('manager')
              router.push('./manager')
            }}
            />
          <span
            className={`px-6 py-2 text-sm font-medium border border-gray-200 rounded-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 ${
              toggleButton === 'manager' ? 'bg-button-1 text-textColor-2' : 'bg-button-2 text-textColor-1'
            } dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white`}
          >
            내 펀드
          </span>
        </label>
      </div>
      <div className="col-span-3 max-w-md mx-auto">   
        <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
        <div className="relative">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            </div>
            <input type="search" id="default-search" className="block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="펀드검색" required />
            <button type="button" className="text-white absolute end-0 bottom-0 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">돋보기</button>
        </div>
      </div>
      
    </div>
  )
}