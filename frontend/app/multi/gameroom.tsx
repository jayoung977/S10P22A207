import styles from '@/public/src/styles/multi/gameroom.module.css'

export default function Gameroom() {
  return (
    <div className={styles.gameroom}>
      <div>게임방</div>
      <div className='flex justify-end gap-2'>
        <div>3라운드</div>
        <div>3명</div>
      </div>
    </div>
  )
}