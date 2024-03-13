import styles from '@/public/src/styles/multi/gameStatus.module.css'


export default function GameStatus(){
  return(
    <div className="border row-span-7 grid grid-rows-12 gap-2 items-center">
      <div className='row-span-1 flex justify-center text-sm'>
        <div>초기자산: 10,000,000원</div>
      </div>
      <div className='row-span-4'>
        <div>총 평가 자산</div>
        <div>12,000,000원</div>
        <div>+2,000,000원(+20%)</div>
      </div>
      <div className='row-span-2 grid grid-cols-12 text-xs'>
        <div className='col-span-6'>
          <div>보유 현금</div>
          <div>9,000,000원</div>
        </div>
        <div className='col-span-6'>
          <div>주식수</div>
          <div>100</div>
        </div>
      </div>
      <div className='row-span-2 grid grid-cols-12 text-xs'>
        <div className='col-span-6'>
          <div>주식 매입금</div>
          <div>10,000,000원</div>
        </div>
        <div className='col-span-6'>
          <div>평단가</div>
          <div>10,000원</div>
        </div>
      </div>
      <div className='row-span-2 grid grid-cols-12 text-xs'>
        <div className='col-span-6'>
          <div>주식 평가금</div>
          <div>3,000,000원</div>
        </div>
        <div className='col-span-6'>
          <div>현재가</div>
          <div>30,000원</div>
        </div>
      </div>
    </div>
  )
}