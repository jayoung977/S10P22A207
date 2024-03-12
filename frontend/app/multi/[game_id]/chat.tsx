import styles from '@/public/src/styles/multi/chat.module.css'
import TradeButtons from './tradeButton'

export default function Chat(){
  return (
      <div className={styles.chat}>
        <div className='col-span-10 border relative'>
          <div className='overflow-auto gap p-2' style={{height: 'calc(30vh)'}}>
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
          <div className='absolute bottom-0 w-full border bg-gray-200 flex justify-between'>
            <input type="text" placeholder='진짜 사이트 개못생겼다' />
            <button className='bg-green-500 hover:bg-green-400'>채팅 입력</button>
          </div>
        </div>
        <div className='col-span-2'>
          <TradeButtons/>
        </div>
      </div>

  )
}