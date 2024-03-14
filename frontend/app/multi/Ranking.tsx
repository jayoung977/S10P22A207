import UserRanking from "./userRanking"
import SearchBar from "./searchBar"


export default function Ranking(){
  return (
      <div className="grid grid-rows-12 shadow-md shadow-gray-400 rounded-md">
        <div className="row-span-1 grid grid-cols-3 justify-around text-sm font-medium text-center text-textColor-1">
            <button  className="p-1 border rounded-tl-lg">전체랭킹</button>
            <button  className="p-1 text-textColor-2 border bg-small-11">친구랭킹</button>
            <button  className="p-1 border-b-2 border-transparent rounded-tr-lg">검색하기</button>
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