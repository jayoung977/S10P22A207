import styles from '@/public/src/styles/multi/stockTrade.module.css'


export default function StockTrade(){
  return (
    <div className={styles.stockTrade}>
      <div className="col-span-4">
        <div>17/50</div>
        <div>매 수</div>
      </div>
      <div className="col-span-4">
        <div>16,800</div>
        <div>3</div>
      </div>
      <div className="col-span-4">
        <div>16,800</div>
        <div>3</div>
      </div>
    </div>
  )
}