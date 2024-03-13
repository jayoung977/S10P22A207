import styles from '@/public/src/styles/multi/roomInfo.module.css'


export default function RoomInfo() {
  return (
    <div className="border row-span-3 grid grid-rows-3">
      <div className='row-span-1 items-center text-lg font-bold m-1'>게임규칙</div>
      <div className='row-span-1 grid grid-cols-12 items-center'>
        <div className='col-span-3'>라운드: </div>
        <div className='col-span-3'>
          <input id="3round" type="checkbox" className="col-span-1 w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-600 dark:border-gray-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"  />
          <label htmlFor="3round" className="col-span-2 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">3</label>
        </div>
        <div className='col-span-3'>
          <input id="5round" type="checkbox"  className="col-span-1 w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-600 dark:border-gray-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"  />
          <label htmlFor="5round" className="col-span-2 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">5</label>
        </div>
        <div className='col-span-3'>
          <input id="7round" type="checkbox"  className="col-span-1 w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-600 dark:border-gray-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"  />
          <label htmlFor="7round" className="col-span-2 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">7</label>
        </div>
      </div>
      <div className='row-span-1 border items-center'>
        <div className='text-lg'>
          시드머니: 10,000,000원
          </div>
      </div>
    </div>
  )
}