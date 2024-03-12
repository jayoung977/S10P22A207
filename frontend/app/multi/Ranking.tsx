import UserRanking from "./userRanking"
import SearchBar from "./searchBar"


export default function Ranking(){
  return (
      <div className="grid grid-rows-12 border-2 rounded-md border-collapse">
        <div className="row-span-1 grid grid-cols-3 justify-around text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700">
            <button  className="p-1 border rounded-s-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300">전체랭킹</button>
            <button  className="p-1 text-blue-600 border border-blue-600  active dark:text-blue-500 dark:border-blue-500">친구랭캥</button>
            <button  className="p-1 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300">검색하기</button>
        </div>
        <div className="row-span-2 border">
          <SearchBar/>
        </div>
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