import styles from '@/public/src/styles/multi/user.module.css'
import Image from 'next/image'
import ProfileImage from '@/public/src/assets/images/profile-image.png'

export default function User(){
  return (
    <div className={styles.user}>
      <div className='col-span-3'>
        <Image
        src={ProfileImage}
        alt='프로필'
        />
        <div>개미는차갑다</div>
      </div>
      <div className='col-span-9 flex justify-end'>
        
        <button className='text-white border shadow bg-red-500 rounded-md p-2 m-2'>준비완료</button>
      </div>
    </div>
  )
}