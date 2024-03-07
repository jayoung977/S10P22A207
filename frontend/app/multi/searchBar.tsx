

export default function SearchBar(){
  return (
    <div className="p-2 flex justify-around">
      <input className="w-auto" type="text" placeholder="유저 검색" />
      <button className="border rounded-md bg-slate-500 text-white p-1">돋보기</button>
    </div>
  )
}