'use client'
import ProfileImage from '@/public/src/assets/images/profile-image.png'
import useClickSound from '@/public/src/components/clickSound/DefaultClick'
import Image from 'next/image'

export default function FinalUser(){
  const playClickSound = useClickSound();

  return(
    <div
      onClick={playClickSound}
      className="row-span-1 grid grid-cols-12 border rounded-md p-2 m-1 items-center bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
      <div className='col-span-1'>
        <div className='border rounded-md px-2 py-1 ms-2 text-center bg-gray-300'>rank</div>
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
      <div className='col-span-3'>
        <div className='text-lg'>nickname</div>
      </div>
      <div className="col-span-5">
        <div>totalAsset (roi)</div>
      </div>
    </div>
  )
}