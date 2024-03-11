import styles from '@/public/src/styles/multi/tradeButtons.module.css'

export default function TradeButtons(){
  return(
    <div className={styles.buttons}>
      <button className='bg-red-500'>매수</button>
      <button className='bg-blue-500'>매도</button>
      <button className='bg-yellow-500'>공매도</button>
      <button className='bg-gray-500'>건너뛰기</button>
    </div>
  )
}