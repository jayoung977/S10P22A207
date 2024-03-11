

export default function SearchBar(){
  return (
    <div className="p-1 m-1 flex justify-between border rounded-md">
      <input className="w-auto rounded-md" type="text" placeholder="유저 검색" />
      <button className="border rounded-md bg-slate-500 text-white p-1">click</button>
    </div>
  )
}