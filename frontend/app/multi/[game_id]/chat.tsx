import styles from '@/public/src/styles/multi/chat.module.css'
import TradeButtons from './tradeButton'

export default function Chat(){
  return (
      <div className={styles.chat}>
        <div className='col-span-10 border'>
          <div className='overflow-auto h-52 gap p-2'>
            <div>채팅창임 ㅋㅋㅋ</div>
            <div>채팅창임 ㅋㅋㅋ</div>
            <div>채팅창임 ㅋㅋㅋ</div>
            <div>채팅창임 ㅋㅋㅋ</div>
            <div>채팅창임 ㅋㅋㅋ</div>
            <div>채팅창임 ㅋㅋㅋ</div>
            <div>채팅창임 ㅋㅋㅋ</div>
            <div>채팅창임 ㅋㅋㅋ</div>
            <div>채팅창임 ㅋㅋㅋ</div>
            <div>채팅창임 ㅋㅋㅋ</div>
            <div>채팅창임 ㅋㅋㅋ</div>
            <div>채팅창임 ㅋㅋㅋ</div>
            <div>채팅창임 ㅋㅋㅋ</div>
            <div>채팅창임 ㅋㅋㅋ</div>
            <div>채팅창임 ㅋㅋㅋ</div>
          </div>
          <div className='border bg-gray-200 flex justify-between'>
            <input type="text" placeholder='진짜 사이트 개못생겼다' />
            <button className='bg-lime-700'>채팅 입력</button>
          </div>
        </div>
        <div className='col-span-2'>
          <TradeButtons/>
        </div>
      </div>

  )
}