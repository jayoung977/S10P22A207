import styles from '@/public/src/styles/multi/tradeButtons.module.css'

export default function TradeButtons(){
  return(
    <div className={styles.tradeButtons}>
      <div className={styles.buttons}>
        <button>매수</button>
        <button>매도</button>
        <button>공매도</button>
        <button>건너뛰기</button>
      </div>
    </div>
  )
}