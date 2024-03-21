'use client'

import { useState, useEffect, ReactNode } from "react"
import { useRouter } from "next/navigation"
import fundCrudStore from "@/public/src/stores/fund/crud/FundCrudStore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

export default function FundTabs(){
  const router = useRouter();
  const { toggleButton, setToggleButton, searchQuery, setSearchQuery } = fundCrudStore();

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
  }

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
        <div>
          <input 
            type="text"
            id="default-search"
            value={searchQuery}
            onChange={handleSearch}
             className="block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="펀드이름 검색" required />
        </div>
      </div>
      
    </div>
  )
}