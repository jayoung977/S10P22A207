import UserRanking from "./userRanking"
import SearchBar from "./searchBar"


export default function Ranking(){
  return (
      <div className="grid grid-rows-12">
        <div className="row-span-1 grid grid-cols-12 items-center text-center border rounded-t-md">
          <div className="col-span-4 bg-gray-200">전체랭킹</div>
          <div className="col-span-4">친구랭킹</div>
          <div className="col-span-4">검색하기</div>
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