import Image from 'next/image'
import ProfileImage from '@/public/src/assets/images/profile-person-image.png'

export default function GameUser(){
  return (
  <div className="row-span-1 grid grid-cols-12 items-center bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
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
      <div>부자가될거야</div>
      <div>
        <button className=' bg-small-11 text-white text-center text-sm py-0.5 px-3 rounded-md '>준비</button>
      </div>
    </div>
    <div className="col-span-4 px-4">
      <div className=' bg-red-500 text-white text-center py-1 rounded-md '>내보내기</div>
    </div>
  </div>  
  )
}