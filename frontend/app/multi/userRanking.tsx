'use client'
import { useState } from 'react'
import ProfileModal from './ProfileModal'

interface userType {
  memberId: number,
  nickname: string,
  assets: number
}

export default function UserRanking({ user } : { user : userType }){
  const [isOpen, setIsOpen] = useState(false)

  
  const handleClose = () => {
    setIsOpen(false);
  };

  return(
    <div
      onClick={()=>{setIsOpen(true)}}
      className="grid grid-cols-12 border rounded-md p-2 hover:cursor-pointer"
    >
      <div className="col-span-7 test-left">{user.nickname}</div>
      <div className="col-span-5 text-right">{user.assets}원</div>
      <ProfileModal isOpen={isOpen} onClose={() => {setIsOpen(false)}}  memberId={user.memberId}/>
    </div>
  )
}