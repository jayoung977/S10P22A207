import penguin from '@/public/src/assets/images/penguin.png'
import Image from 'next/image'


export default function Header(){
  return( 
  <header className="row-span-1 grid grid-cols-12 border items-center">
    <div className="col-start-2 col-end-3 flex items-center">
      <div className="flex gap-2 items-center">
        <Image
          src={penguin}
          alt="Logo"
          className="h-8"
          width={32}
          height={32}
        />
        <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
          지금이니
        </span>
      </div>
    </div>
    <div className="col-span-7 flex justify-center">
      <div>맞짱 까든가</div>
    </div>
    <div className="col-span-3 grid grid-rows-2 items-center m-1" >
      <div className='row-span-1 grid grid-cols-3 text-sm'>
        <div className='col-span-1'>라운드: 3/3</div>
        <div className='col-span-2'>현재 라운드: 27/50</div>
      </div>
      <div className='row-span-1 flex justify-items-center text-center'>
        <div className="w-full bg-gray-200 rounded-full dark:bg-gray-700">
          <div className="bg-blue-600 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full" style={{width: "83%"}}> (127/150)</div>
        </div>
      </div>
    </div>
  </header>
  )
}