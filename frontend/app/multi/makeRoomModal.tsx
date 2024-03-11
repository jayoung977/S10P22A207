import styles from '@/public/src/styles/multi/makeRoomModal.module.css'

export default function MakeRoomModal(){
  return (
      <div id="gameroom-modal" tabIndex={0} aria-hidden="true" className={styles.modal}>
        <div className="relative p-4 w-full max-h-full">
            {/* <!-- Modal content --> */}
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                {/* <!-- Modal body --> */}
                <div className="p-4 md:p-5">
                    <form className="space-y-4" action="#">
                      <div className='grid grid-cols-12 items-center gap-y-4 gap-x-2'>
                        <div className='col-span-4'>
                            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">방제목</label>
                        </div>
                        <div className='col-span-8'>
                            <input type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"  required />
                        </div>
                          <div className='col-span-6'>라운드</div>
                          <div className='col-span-6'>공개 여부</div>
                        <div className="col-span-6">
                          <div className="grid grid-cols-3 gap-2">
                            <div className='col-span-1 flex items-center h-5'>
                              <input id="3round" type="checkbox" value="" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-600 dark:border-gray-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800" required />
                              <label htmlFor="3round" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">3라운드</label>
                            </div>
                            <div className='col-span-1 flex items-center h-5'>
                              <input id="5round" type="checkbox" value="" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-600 dark:border-gray-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800" required />
                              <label htmlFor="5round" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">5라운드</label>
                            </div>
                            <div className='col-span-1 flex items-center h-5'>
                              <input id="7round" type="checkbox" value="" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-600 dark:border-gray-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800" required />
                              <label htmlFor="7round" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">7라운드</label>
                            </div>
                          </div>
                        </div>
                        <div className="col-span-6">
                          <div className="grid grid-cols-2 gap-2">
                            <div className='col-span-1 flex items-center h-5'>
                              <input id="3round" type="checkbox" value="" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-600 dark:border-gray-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800" required />
                              <label htmlFor="3round" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">공개</label>
                            </div>
                            <div className='col-span-1 flex items-center h-5'>
                              <input id="5round" type="checkbox" value="" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-600 dark:border-gray-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800" required />
                              <label htmlFor="5round" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">비공개</label>
                            </div>

                          </div>
                        </div>
                        <div className='col-span-4'>
                            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">비밀번호</label>
                        </div>
                        <div className='col-span-4'>
                            <input type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required />
                        </div>
                      </div>
                      <div className='grid grid-cols-2 gap-x-4'>
                        <div className='col-span-1'>
                          <button type="submit" className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">방만들기</button>
                        </div>
                        <div className='col-span-1'>
                          <button type="button" className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">취소</button>
                        </div>
                      </div>
                    </form>
                </div>
            </div>
        </div>
    </div> 
    
  )
}