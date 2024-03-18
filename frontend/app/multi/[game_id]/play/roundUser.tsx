export default function RoundUser(){

  return(
    <div
      onClick={() => {console.log('click!')}}
      className="row-span-1 grid grid-cols-12 border rounded-md p-2 m-1 items-center bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
      <div className='col-span-2'>
        <div>1위</div>
      </div>
      <div className='col-span-2'>
        <div>사진</div>
        <div className='text-sm'>바보</div>
      </div>
      <div className='col-span-8'>
        <div>(^ 50%) 15,000,000원</div>
      </div>
    </div>
  )
}