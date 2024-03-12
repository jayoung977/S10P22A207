import styles from '@/public/src/styles/multi/gameroom.module.css'
import JoinRoomModal from './joinRoomModal';



export default function Gameroom() {
  return (
    <div className={styles.gameroom}>
      <a href="/multi/1/wait" className="block p-2 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
        <h5 className="mb-1 text-md font-bold tracking-tight text-gray-900 dark:text-white">파산할 때까지 가보자</h5>
        <div className="flex justify-end gap-4 text-sm text-gray-700 dark:text-gray-400">
          <div>3라운드</div>
          <div>3명</div>
        </div>
      </a>

      <JoinRoomModal/>
    </div>
  )
}