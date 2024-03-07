import styles from '@/public/src/styles/multi/userRanking.module.css'

export default function UserRanking(){
  return(
    <div className={styles.userRanking}>
      <div className="col-span-2">1위</div>
      <div className="col-span-4">이재용</div>
      <div className="col-span-6">10,000,000,000원</div>
    </div>
  )
}