'use client'
import Profile from "./profile"

export default function ProfileModal({ isOpen, onClose, }: any){
  if(!isOpen) return null;
  
  return (
    <div className="bg-slate-100 w-[500px] h-[250px] fixed -translate-x-1/2 translate-y-1/2 inset-0 left-1/2 border items-center justify-center rounded-md grid grid-cols-4 gap-2">
      <div className="col-span-3">
        <Profile />
      </div>
      <div className="col-span-1 justify-items-center">
        <div>
          <button className="bg-blue-500 m-2 p-2 text-white rounded-md">같이하기</button>
        </div>
        <div>
          <button className="bg-blue-500 m-2 p-2 text-white rounded-md">친구신청</button>
        </div>
        <div>
          <button
            onClick={()=>{
              onClose()
            }}
            type="button"
            className="bg-red-500 m-2 py-2 px-4 text-white rounded-md hover:bg-small-3">뒤로 가기
          </button>
        </div>
      </div>
    </div>
  )
}