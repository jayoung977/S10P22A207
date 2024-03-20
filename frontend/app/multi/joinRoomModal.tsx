export default function JoinRoomModal () {
  return (
      <div id="joinroom-modal" tabIndex={0} aria-hidden="true" className="fixed -translate-x-1/2 translate-y-1/4 inset-0 left-1/2 justify-center items-center hidden">
        <div className="relative p-4 w-full max-h-full">
            {/* <!-- Modal content --> */}
            <div className="relative border bg-white rounded-lg shadow dark:bg-gray-700">
                {/* <!-- Modal body --> */}
                <div className="p-4 md:p-5">
                    <form className="space-y-4" action="#">
                      <div className='grid grid-cols-12 items-center gap-y-2 gap-x-2'>
                        <div className='col-span-4'>
                            <div  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">방제목</div>
                        </div>
                        <div className='col-span-8'>
                            <div  className="  text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" >파산할 때까지 가자고</div>
                        </div>
                        <div className='col-span-4'>
                            <div  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">라운드</div>
                        </div>
                        <div className='col-span-8'>
                            <div  className="  text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" >3라운드</div>
                        </div>
                        <div className='col-span-4'>
                            <div  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">참여인원</div>
                        </div>
                        <div className='col-span-8 grid grid-cols-2 border'>
                            <div  className="col-span-1  text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" >김민규는바보야?</div>
                            <div  className="col-span-1  text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" >김민규는바보야?</div>
                            <div  className="col-span-1  text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" >김민규는바보야?</div>
                            <div  className="col-span-1  text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" >김민규는바보야?</div>
                            <div  className="col-span-1  text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" >김민규는바보야?</div>
                            <div  className="col-span-1  text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" >김민규는바보야?</div>
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
                          <button type="submit" className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">방 참가</button>
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