import Profile from "./profile"
import styles from '@/public/src/styles/multi/profileModal.module.css'

export default function ProfileModal(){
  return (
    <div tabIndex={-1} aria-hidden="true"  className={styles.modal}>
      <div className="col-span-3">
        <Profile/>
      </div>
      <div className="col-span-1 justify-items-center">
        <div>
        <button className="bg-blue-500 m-2 p-2 text-white rounded-md">같이하기</button>
        </div>
        <div>
        <button className="bg-blue-500 m-2 p-2 text-white rounded-md">친구신청</button>
        </div>
        <div>
        <button className="bg-red-500 m-2 p-2 text-white rounded-md">나가기</button>
        </div>
      </div>
    </div>
  )
}