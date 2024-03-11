import styles from '@/public/src/styles/multi/chart.module.css'
import Image from 'next/image'
import chartImage from '@/public/src/assets/images/chart-sample-image.png'

export default function Chart(){
  return(
    <div className={styles.chart}>
      <Image
        src={chartImage}
        alt='chartimage'
      />
    </div>
  )
}