import SearchBar from '../../searchBar'
import Image from 'next/image'
import ProfileImage from '@/public/src/assets/images/profile-image.png'
import Swal from 'sweetalert2'
import multigameStore from '@/public/src/stores/multi/MultiGameStore'
import { useEffect, useState } from 'react'
import { useQuery, UseQueryResult } from 'react-query'
import { Friend, FriendInfo } from '@/public/src/stores/user/userStore'

const fetchFriendInfo = async() => {
  const token = sessionStorage.getItem('accessToken')
  const response = await fetch('https://j10a207.p.ssafy.io/api/friend/list',{
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  return response.json()
}


export default function FriendSearch() {
  const {data, isLoading, error}: UseQueryResult<FriendInfo,Error> = useQuery('FriendInfo', fetchFriendInfo) 
  
  
  // 친구목록 react-query로 구현
  const { result }: { result: Friend[] } = data
  ? data
  : { result: [] };
  

  
  const { searchFriend } = multigameStore();
  const [filteredFriendList, setfilteredFriendList] = useState<Friend[]>([])
  
  useEffect(() => {
    const filtered: Friend[] = result.filter((friend) =>
    friend.nickname.includes(searchFriend)
    );
    setfilteredFriendList(filtered);
  }, [searchFriend, result]);
  
  const inviteFriend = (nickname: string) => {
    console.log(`${nickname} 초대!`)
    Swal.fire({
      text: `${nickname}에게 초대를 발송했습니다.`,
      icon: 'success'
    })
  }
  
  
  if (isLoading) {
    return <div className="rainbow"></div>;
  }
  
  if (error) {
    return <div>Error: {error.message}</div>;
  }

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
