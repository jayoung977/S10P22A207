import useClickSound from "@/public/src/components/clickSound/DefaultClick"
import userStore from "@/public/src/stores/user/userStore";
import socketStore from "@/public/src/stores/websocket/socketStore";

export default function RoomInfo() {
  const playClickSound = useClickSound();
  const { memberId } = userStore();
  const { hostId } = socketStore();
  return (
    <div className="border row-span-1 grid grid-rows-3">
      <div className='row-span-1 bg-small-11 text-textColor-2 text-lg font-bold'>게임규칙</div>
      <div className='row-span-1 grid grid-cols-12 items-center'>
        <div className='col-span-3'>라운드: </div>
        <div className='col-span-3'>
          <input disabled={memberId != hostId} id="3round"  name="round" type="radio" value={3} onChange={playClickSound} className="col-span-1 w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-600 dark:border-gray-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"  />
          <label htmlFor="3round" className="col-span-2 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">3</label>
        </div>
        <div className='col-span-3'>
          <input disabled={memberId != hostId} id="5round"  name="round" type="radio" value={5} onChange={playClickSound}  className="col-span-1 w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-600 dark:border-gray-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"  />
          <label htmlFor="5round" className="col-span-2 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">5</label>
        </div>
        <div className='col-span-3'>
          <input disabled={memberId != hostId} id="7round"  name="round" type="radio" value={7} onChange={playClickSound}  className="col-span-1 w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-600 dark:border-gray-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"  />
          <label htmlFor="7round" className="col-span-2 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">7</label>
        </div>
      </div>
      <div className='row-span-1 items-center text-lg'>
          시드머니: 10,000,000원
      </div>
    </div>
  )
}