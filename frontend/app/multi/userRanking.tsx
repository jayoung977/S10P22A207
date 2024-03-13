import styles from '@/public/src/styles/multi/userRanking.module.css'
import ProfileModal from './profileModal'

export default function UserRanking(){
  return(
    <div className="grid grid-cols-12 border rounded-md p-2">
      <div className="col-span-2">1위</div>
      <div className="col-span-4">이재용</div>
      <div className="col-span-6">10,000,000,000원</div>
      <ProfileModal/>
    </div>
  )
}