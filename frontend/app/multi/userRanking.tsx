'use client'

import { useState } from 'react'
import ProfileModal from './profileModal'

export default function UserRanking(){
  const [isOpen, setIsOpen] = useState(false)

  
  const handleClose = () => {
    setIsOpen(false);
  };

  return(
    <div
      onClick={()=>{setIsOpen(true)}}
       className="grid grid-cols-12 border rounded-md p-2 hover:cursor-pointer">
      <div className="col-span-2">1위</div>
      <div className="col-span-4">이재용</div>
      <div className="col-span-6">10,000,000,000원</div>
      <ProfileModal isOpen={isOpen} onClose={() => {setIsOpen(false)}}/>
    </div>
  )
}