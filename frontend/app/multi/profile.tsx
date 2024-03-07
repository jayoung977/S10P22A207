import styles from '@/public/src/styles/multi/profile.module.css'
import ProfileImage from './profileImage'

export default function Profile(){
  return (
    <div className={styles.profile}>
      {/* 프로필 상단 */}
      <div className='row-span-2 border grid grid-cols-8'>
          <ProfileImage/>
        <div className="col-span-5">
          랭킹 티어
        </div>
      </div>
      {/* 프로필 하단 */}
      <div className='row-span-1 border grid grid-cols-8'>
        <div className="col-span-3">
          <div>시드머니</div>
        </div>
        <div className="col-span-5">
          <div>20,000,000원</div>
        </div>
      </div>
      <div className='row-span-1 border grid grid-cols-8'>
        <div className="col-span-3">
          <div>평균수익률</div>
        </div>
        <div className="col-span-5">
          <div>+10.0%</div>
        </div>
      </div>
    </div>
  )
}