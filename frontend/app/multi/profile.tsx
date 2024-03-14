import styles from '@/public/src/styles/multi/profile.module.css'
import ProfileImage from '@/public/src/assets/images/penguin.png'
import TierImage from '@/public/src/assets/images/bronze.png'
import Image from 'next/image'


export default function Profile(){
  return (
    <div className="col-span-4 bg-background-1 rounded-md grid grid-rows-5 gap-2 shadow-md m-2">
      {/* 프로필 상단 */}
      <div className='row-span-3 bg-big-1 m-1 grid grid-cols-6'>
        <div className='col-span-3 border grid grid-rows-4 justify-items-center'>
          <div className='row-span-3 m-2'>
            <Image
              src={ProfileImage}
              alt="Profile-image"
              width={60}
              height={60}
              />
          </div>
          <div className='row-span-1'>대펭귄</div>
        </div>
        <div className='col-span-3 border grid grid-rows-4 justify-items-center'>
          <div className='row-span-3 m-2'>
            <Image
                src={TierImage}
                alt="Tier-image"
                width={60}
                height={60}
                />
          </div>
          <div className='row-span-1'>브론즈따리</div>
        </div>
      </div>
      {/* 프로필 하단 */}
      <div className='row-span-2 bg-small-1 rounded-md p-1 text-textColor-2 text-center grid grid-cols-8'>
        <div className='col-span-8'>1승 300패 (0.3%)</div>
        <div className='col-span-4'>
          <div>시드머니</div>
          <div>평균수익률</div>
        </div>
        <div className='col-span-4'>
          <div>20,000,000원</div>
          <div>+10.0%</div>
        </div>
      </div>
    </div>

  )
}