import Image from 'next/image'
import chartImage from '@/public/src/assets/images/chart-sample-image.png'

export default function ChartImage(){
  return(
    <div className='row-span-9'>
      <Image
        src={chartImage}
        alt='chartimage'
        height={400}
      />
    </div>
  )
}