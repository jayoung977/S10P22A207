'use client'

import Image from 'next/image'
import ProfileImage from '@/public/src/assets/images/profile-person-image.png'
import useClickSound from '@/public/src/components/clickSound/DefaultClick'


interface GameMember {
  rank: number,
  nickname: string,
  memberId: number,
  status: string,
}

export default function GameMembers(){
  const gameMembers = [
    { rank: 1, nickname: '권권영', memberId: 1, status: 'MANAGER'},
    { rank: 2, nickname: '제헌법연구소',  memberId: 2, status: 'READY'},
    { rank: 3, nickname: '최강창호',  memberId: 3, status: 'NOT'},
    { rank: 4, nickname: '용수리',  memberId: 4, status: 'NOT'},
    { rank: 5, nickname: '자영안자영',  memberId: 5, status: 'READY'},
    { rank: 6, nickname: '김민규소',  memberId: 6, status: 'NOT'},
  ]

  const playClickSound = useClickSound();
  const kickUser = (id: number) => {
    console.log(`${id}번,넌 나가라!`)
  }


  return (
    <div className="col-span-3 border-s grid grid-rows-6">
      {
        gameMembers.map((user: GameMember, i: number)=> {
          return(
            <div key={i} className="row-span-1 grid grid-cols-12 items-center bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
              <div className="col-span-3 ms-3 text-gray-900 whitespace-nowrap dark:text-white">
                <Image
                  src={ProfileImage}
                  alt='프로필'
                  width={60}
                  style={{
                    borderRadius: '50%'
                  }}
                  />
              </div>
              <div className="col-span-5 text-base font-semibold">
                <div>{user.nickname}</div>
                <div>
                  { user.status === 'READY' ? (
                    <button className=' bg-small-11 text-white text-center text-sm py-0.5 px-3 rounded-md '>준비</button>
                  ) : (
                    <span></span>
                  )}
                </div>
              </div>
              <div className="col-span-4 px-4">
                { user.status === 'NOT' ? (
                    <div onClick={()=>{
                      playClickSound();
                      kickUser(user.memberId)
                    }} className=' bg-red-500 text-white text-center py-1 rounded-md hover:cursor-pointer'>내보내기</div>
                  ) : (
                    <div></div>
                  )
                }
              </div>
            </div>  
          )
        })
      }
    </div>
  )
}