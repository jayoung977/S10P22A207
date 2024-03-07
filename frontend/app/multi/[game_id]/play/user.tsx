import styles from '@/public/src/styles/multi/user.module.css'
import Image from 'next/image'
import ProfileImage from '@/public/src/assets/images/profile-image.png'

export default function User(){
  return (
    <div className={styles.user}>
      <div className='col-span-3'>
        <Image
          src={ProfileImage}
          alt='profile'
        />
        <div>개미는차갑다</div>
      </div>
      <div className='col-span-9'>
        <div className='bg-blue-200'>(27/50)</div>
        <div className='bg-gray-300'>10,000,000원 (-%)</div>

      </div>
    </div>
  )
}