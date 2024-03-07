import styles from '@/public/src/styles/multi/gameRule.module.css'


export default function GameRule(){
  return (
    <div className={styles.gameRule}>
      <div className='border border-white'>룰 설명</div>
      <div>룰 내용</div>
    </div>
  )
}