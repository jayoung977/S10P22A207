import styles from '@/public/src/styles/multi/profile.module.css'
import ProfileImage from '@/public/src/assets/images/penguin.png'
import TierImage from '@/public/src/assets/images/bronze.png'
import Image from 'next/image'


export default function Profile(){
  return (
    <div className="col-span-4 grid grid-rows-4 gap-2 border m-2 border-collapse">
      {/* 프로필 상단 */}
      <div className='row-span-2 border grid grid-cols-6'>
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
      <div className='row-span-2 border items-center text-center grid grid-cols-8'>
          <div className='col-start-3 col-end-6 m-2'>1승 300패</div>
          <div className='col-span-3 m-2'>0.3%</div>
          <div className='col-span-4 m-2'>
            <div>시드머니</div>
            <div>평균수익률</div>
          </div>
          <div className='col-span-4 m-2'>
            <div>20,000,000원</div>
            <div>+10.0%</div>
          </div>
      </div>
    </div>

  )
}