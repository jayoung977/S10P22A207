import styles from '@/public/src/styles/multi/tradeHistory.module.css'
import StockTrade from './stockTrade'


export default function TradeHistory(){
  return(
    <div className={styles.tradeHistory}>
      <div className="grid grid-cols-12 items-center">
        <div className="col-span-4"> 유형</div>
        <div className="col-span-4">
          <div>가격</div>
          <div>수량</div>
        </div>
        <div className="col-span-4">
          <div>체결 금액</div>
          <div>체결 수량</div>
        </div>
      </div>
      <StockTrade/>
    </div>
  )
}