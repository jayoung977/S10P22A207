'use client'

import ProfileImage from '@/public/src/assets/images/profile-image.png'
import Image from 'next/image'

export default function FinalUser(){

  return(
    <div
      className="row-span-1 grid grid-cols-12 border rounded-md p-2 m-1 items-center bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
      <div className='col-span-1'>
        <div className='border rounded-md px-2 py-1 text-center bg-gray-300'>2등</div>
      </div>
      <div className=' col-start-3 col-span-2'>
        <Image
          src={ProfileImage}
          alt='profile-image'
          width={60}
          height={60}
          style={{borderRadius: '50%'}}
          />
      </div>
      <div className='col-span-6'>
        <div className='text-lg'>김민규나라지키러감</div>
      </div>
      <div className="col-span-2">
        <div> +50%</div>
      </div>
    </div>
  )
}