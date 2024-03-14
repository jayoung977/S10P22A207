import styles from '@/public/src/styles/multi/user.module.css'
import Image from 'next/image'
import ProfileImage from '@/public/src/assets/images/jaedragon.jpg'

export default function GameUser(){
  return (
  <div className="row-span-1 grid grid-cols-12 items-center bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
    <div className="col-span-3 ms-2 items-center text-gray-900 whitespace-nowrap dark:text-white">
      <Image
        src={ProfileImage}
        alt='프로필'
        width={50}
        height={50}
        style={{
          borderRadius: '50%'
        }}
        />
    </div>
    <div className="col-span-5 text-base font-semibold">부자가될거야</div>
    <div className="col-span-4 grid grid-rows-2 px-4 py-4">
      <div className='bg-red-500 text-white text-center py-1 rounded-md '>준비완료</div>
    </div>
  </div>  
  )
}