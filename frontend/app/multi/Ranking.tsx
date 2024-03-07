import UserRanking from "./userRanking"
import SearchBar from "./searchBar"


export default function Ranking(){
  return (
    <aside className="col-span-4 border">
      <div className="grid grid-cols-12 border">
        <div className="col-span-4 border bg-gray-200">전체랭킹</div>
        <div className="col-span-4 border">친구랭킹</div>
        <div className="col-span-4 border">검색하기</div>
      </div>
      <div>
        <SearchBar/>
      </div>
      <div>
        {/* 반복문으로 출력 */}
        <UserRanking/>
      </div>
    </aside>
  )
}