import styles from '@/public/src/styles/multi/user.module.css'
import Image from 'next/image'
import ProfileImage from '@/public/src/assets/images/profile-image.png'

export default function User(){
  return (
    <div className={styles.user}>
      <div className='col-span-4 text-center'>
        <div className='imageContainer'>
          <Image
            src={ProfileImage}
            alt='profile'
          />
        </div>
        <div>개미는뚠뚠</div>
      </div>
      <div className='col-span-8'>
        <div className='border'>(27/50)</div>
        <div>1,000,000원 (-%)</div>

      </div>
    </div>
  )
}