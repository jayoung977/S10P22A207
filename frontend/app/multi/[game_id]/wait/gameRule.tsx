import styles from '@/public/src/styles/multi/gameRule.module.css'


export default function GameRule(){
  return (
    <div className={styles.gameRule}>
      <div className='border'>룰 설명</div>
      <div className='flex-col text-start m-2'>
        <div>1. 라운드당 50턴으로 진행된다.</div>
        <div>2. 1라운드당 150초의 시간이 주어진다.</div>
        <div>3. 모든 라운드가 끝난 후, 자산을 가장 많이 번 플레이어가 우승한다.</div>
      </div>
    </div>
  )
}