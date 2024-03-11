'use client'

import { useRouter } from "next/navigation"

export default function Header(){
  const router = useRouter();

  const handleGameStart = () => {
    router.push('/multi/1/play')
  }
  return( 
    <header className="row-span-1 grid grid-cols-12 border items-center">
    <div className="col-span-2 grid grid-cols-3 justify-items-center">
      <div className="col-span-1 flex items-center">로고</div>
      <div className="col-span-2 flex items-center">지금이니?!</div>
    </div>
    <div className="col-span-8 flex justify-center">
      <div>맞짱 까든가</div>
    </div>
    <div className="col-span-2 flex justify-center gap-4">
    <button
     className="border p-2 rounded-md bg-red-500 text-white"
     onClick={handleGameStart}>시작하기</button>
      <button className="border p-2 rounded-md border-red-500">나가기</button>
    </div>
  </header>
  )
}