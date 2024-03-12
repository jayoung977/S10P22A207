import Image from 'next/image'
import ProfileImage from '@/public/src/assets/images/profile-image.png'


export default function Friend(){
  return (
  <div className="grid grid-cols-12 items-center bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
    <div className="col-span-2 items-center text-gray-900 whitespace-nowrap dark:text-white">
      <Image
        src={ProfileImage}
        alt='프로필'
        className='rounded-full'
        />
    </div>
    <div className="col-span-6 text-base font-semibold">Neil Sims</div>
    <div className="col-span-4 px-6 py-4">
      <button className='bg-blue-500 text-white px-2 py-1 rounded-md '>초대</button>
    </div>
  </div>  
  )
}