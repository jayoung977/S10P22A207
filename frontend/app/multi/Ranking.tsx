'use client'

import UserRanking from "./userRanking"
import SearchBar from "./searchBar"
import multigameStore from "@/public/src/stores/multi/MultiGameStore"


export default function Ranking(){
  const { toggleTab, setToggleTab } = multigameStore();

  return (
      <div className="grid grid-rows-12 shadow-md shadow-gray-400 rounded-md">
        <div className="row-span-1 grid grid-cols-3 justify-around text-sm font-medium text-center text-textColor-1">
        <label className="inline-flex items-center hover:cursor-pointer">
          <input
            type="radio"
            className="sr-only peer"
            value="all"
            checked={toggleTab == 'all'}
            onChange={()=>{
              setToggleTab('all')
            }}
            />
          <span
            className={`px-6 py-2 text-sm font-medium border border-gray-200 rounded-tl-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 ${
              toggleTab === 'all' ? 'bg-button-1 text-textColor-2' : 'bg-button-2 text-textColor-1'
            } dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white`}
          >
            전체랭킹
          </span>
        </label>
        <label className="inline-flex items-center hover:cursor-pointer">
          <input
            type="radio"
            className="sr-only peer"
            value="friend"
            checked={toggleTab == 'friend'}
            onChange={()=>{
              setToggleTab('friend')
            }}
            />
          <span
            className={`px-6 py-2 text-sm font-medium border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 ${
              toggleTab === 'friend' ? 'bg-button-1 text-textColor-2' : 'bg-button-2 text-textColor-1'
            } dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white`}
          >
            친구랭킹
          </span>
        </label>
        <label className="inline-flex items-center hover:cursor-pointer">
          <input
            type="radio"
            className="sr-only peer"
            value="search"
            checked={toggleTab == 'search'}
            onChange={()=>{
              setToggleTab('search')
            }}
            />
          <span
            className={`px-6 py-2 text-sm font-medium border border-gray-200 rounded-tr-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 ${
              toggleTab === 'search' ? 'bg-button-1 text-textColor-2' : 'bg-button-2 text-textColor-1'
            } dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white`}
          >
            검색하기
          </span>
        </label>
        </div>
          {
            toggleTab == 'search' ?  (
              <div className="row-span-2 border flex items-center justify-center">
                <div><SearchBar/></div>
              </div>
            ) : toggleTab == 'all' ? (
              <div className="text-center mt-1 text-lg">전체랭킹</div>
              ) : (
                <div className="text-center mt-1 text-lg">친구랭킹</div>
            )
          }
        <div className='row-span-9 overflow-auto border' style={{height: 'calc(42vh)'}}>
          <UserRanking/>
          <UserRanking/>
          <UserRanking/>
          <UserRanking/>
          <UserRanking/>
          <UserRanking/>
          <UserRanking/>
          <UserRanking/>
          <UserRanking/>
        </div>
      </div>
  )
}