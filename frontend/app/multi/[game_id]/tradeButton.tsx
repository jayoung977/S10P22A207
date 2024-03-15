import styles from '@/public/src/styles/multi/tradeButtons.module.css'

export default function TradeButtons(){
  return(
    <div className='col-span-2'>
      <div className="gap-1 grid grid-rows-4">
        <button className='border p-1 m-2 rounded-md text-white font-bold bg-red-500 hover:bg-red-400'>매수</button>
        <button className='border p-1 m-2 rounded-md text-white font-bold bg-blue-500 hover:bg-small-1'>매도</button>
        <button className='border p-1 m-2 rounded-md text-white font-bold bg-yellow-500 hover:bg-small-10'>공매도</button>
      </div>
    </div>
  )
}