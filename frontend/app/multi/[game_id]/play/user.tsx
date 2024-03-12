import styles from '@/public/src/styles/multi/user.module.css'
import Image from 'next/image'
import ProfileImage from '@/app/multi/profileImage'

export default function User(){
  return (
    <div className={styles.user}>
      <div className='grid grid-cols-12 text-center items-center'>
        <div className='col-span-3 border p-1 m-1 bg-yellow-300 rounded-lg'>1위</div>
        <div className='col-start-4 col-end-13'>난딴돈의반만가져가</div>
      </div>
      <div className='m-1 text-center'>
        <div className="w-full bg-gray-200 rounded-full dark:bg-gray-700">
          <div className="bg-blue-600 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full" style={{width: "54%"}}> (27/50)</div>
        </div>
        <div>1,000,000원 (-%)</div>
      </div>
    </div>
  )
}