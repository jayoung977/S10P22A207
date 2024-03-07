import styles from '@/public/src/styles/multi/roomInfo.module.css'


export default function RoomInfo() {
  return (
    <div className={styles.roomInfo}>
      <div>게임규칙</div>
      <div>라운드</div>
      <div>시드머니</div>
    </div>
  )
}