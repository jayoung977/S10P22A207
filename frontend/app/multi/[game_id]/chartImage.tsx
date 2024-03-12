import Image from 'next/image'
import chartImage from '@/public/src/assets/images/chart-sample-image.png'

export default function ChartImage(){
  return(
    <div className="border row-span-8">
      <Image
        src={chartImage}
        alt='chartimage'
        height={350}
      />
    </div>
  )
}