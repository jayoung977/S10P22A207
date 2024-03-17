import { useRouter } from 'next/navigation';

export default function MakeRoomModal({isOpen ,onClose} : any){
  const router = useRouter();
  if (!isOpen) return null;

  return (
      <div id="gameroom-modal" tabIndex={-1} aria-hidden="true" className="fixed -translate-x-1/2 translate-y-1/4 inset-0 left-1/2 justify-center items-center">
        <div className="relative p-4 w-full max-h-full">
            {/* <!-- Modal content --> */}
            <div className="relative bg-white rounded-lg border shadow dark:bg-gray-700">
                {/* <!-- Modal body --> */}
                <div className="p-4 md:p-5">
                    <div className="space-y-4" >
                      <div className='grid grid-cols-12 items-center gap-y-8 gap-x-2'>
                        <div className='col-span-2'>
                            <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">방제목</label>
                        </div>
                        <div className='col-span-6'>
                            <input type="name" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"  />
                        </div>
                        <div className='col-span-12'>라운드</div>
                        <div className="col-span-12">
                          <div className="grid grid-cols-6 gap-2">
                            <div className='col-span-1 flex items-center h-5'>
                              <input id="3round" type="checkbox" value="" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-600 dark:border-gray-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"  />
                              <label htmlFor="3round" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">3라운드</label>
                            </div>
                            <div className='col-span-1 flex items-center h-5'>
                              <input id="5round" type="checkbox" value="" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-600 dark:border-gray-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"  />
                              <label htmlFor="5round" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">5라운드</label>
                            </div>
                            <div className='col-span-1 flex items-center h-5'>
                              <input id="7round" type="checkbox" value="" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-600 dark:border-gray-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"  />
                              <label htmlFor="7round" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">7라운드</label>
                            </div>
                          </div>
                        </div>
                        <div className='col-span-12'>공개 여부</div>
                        <div className="col-span-12">
                          <div className="grid grid-cols-4 gap-2">
                            <div className='col-span-1 flex items-center h-5'>
                              <input id="3round" type="checkbox" value="" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-600 dark:border-gray-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"  />
                              <label htmlFor="3round" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">공개</label>
                            </div>
                            <div className='col-span-1 flex items-center h-5'>
                              <input id="5round" type="checkbox" value="" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-600 dark:border-gray-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"  />
                              <label htmlFor="5round" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">비공개</label>
                            </div>

                          </div>
                        </div>
                        <div className='col-span-4'>
                            <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">비밀번호</label>
                        </div>
                        <div className='col-span-4'>
                            <input type="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"  />
                        </div>
                      </div>
                      <div className='grid grid-cols-2 gap-x-4'>
                        <div className='col-span-1'>
                          <button 
                            onClick={()=> {
                              onClose
                              router.push('/multi/1/wait')
                            }} className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">방만들기</button>
                        </div>
                        <div className='col-span-1'>
                          <button onClick={()=> {onClose()}}className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">취소</button>
                        </div>
                      </div>
                    </div>
                </div>
            </div>
        </div>
    </div> 
    
  )
}