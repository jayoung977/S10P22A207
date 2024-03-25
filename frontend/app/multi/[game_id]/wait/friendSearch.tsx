import SearchBar from '../../searchBar'
import Image from 'next/image'
import ProfileImage from '@/public/src/assets/images/profile-image.png'
import Swal from 'sweetalert2'
import multigameStore from '@/public/src/stores/multi/MultiGameStore'
import { useEffect, useState } from 'react'

interface Friend {
  nickname: string,
  memberId: number
}

export default function FriendSearch() {
  const { searchFriend } = multigameStore();
  const [filteredFriendList, setfilteredFriendList] = useState<Friend[]>([])

  const friendList = [
    {nickname:'김가영', memberId: 1},
    {nickname:'김나영', memberId: 2},
    {nickname:'김다영', memberId: 3},
    {nickname:'김라영', memberId: 4},
    {nickname:'김마영', memberId: 5},
    {nickname:'김바영', memberId: 6},
    {nickname:'김사영', memberId: 7}]
  
  const inviteFriend = (nickname: string) => {
    console.log(`${nickname} 초대!`)
    Swal.fire({
      text: `${nickname}에게 초대를 발송했습니다.`,
      icon: 'success'
    })
  }

  useEffect(() => {
    // searchQuery 기반으로 FundList filtering
    const filtered: Friend[] = friendList.filter((friend) => friend.nickname.includes(searchFriend));
    setfilteredFriendList(filtered);
  }, [searchFriend]); 

  return (
    <div className="row-span-3 border-e grid grid-rows-6">
      <div className='row-span-1 flex justify-center border-b gap-2 items-center'>
        <div>친구초대</div>
        <SearchBar/>
      </div>
      <div className='overflow-auto row-span-5' style={{height: 'calc(35vh)'}}>
        {
          filteredFriendList.map((friend: Friend, i: number)=> {
            return(
              <div key={i}  className="grid grid-cols-12 items-center bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
              <div className="col-span-2 items-center text-gray-900 whitespace-nowrap dark:text-white">
                <Image
                  src={ProfileImage}
                  alt='프로필'
                  className='rounded-full'
                  />
              </div>
              <div className="col-span-6 text-base font-semibold">{friend.nickname}</div>
              <div className="col-span-4 px-6 py-4">
                <button onClick={()=>{
                  inviteFriend(friend.nickname)
                  }} className='bg-blue-500 text-white px-2 py-1 rounded-md '>초대</button>
              </div>
            </div>  
            )
          })
        }
      </div>
    </div>
  )
}
