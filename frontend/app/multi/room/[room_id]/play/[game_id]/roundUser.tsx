export default function RoundUser(){

  return(
    <div className="grid grid-cols-12 border rounded-md px-2 py-4 m-2 items-center bg-white border-b">
      <div className='col-start-2 col-span-2'>
        <div className="text-lg">rank</div>
      </div>
      <div className='col-span-1'>
        사진
      </div>
      <div className="col-span-4 text-center">
          nickname
      </div>
      <div className='col-span-4'>
        <div>totalAsset (roi)</div>
      </div>
    </div>
  )
}