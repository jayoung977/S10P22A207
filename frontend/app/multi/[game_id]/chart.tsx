import styles from '@/public/src/styles/multi/chart.module.css'
import Image from 'next/image'
import chartImage from '@/public/src/assets/images/chart-sample-image.png'

export default function Chart(){
  return(
    <div className={styles.chart}>
      멀티게임 차트
      <Image
        src={chartImage}
        alt='chartimage'
      />
    </div>
  )
}