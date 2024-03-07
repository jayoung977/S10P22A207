import styles from '@/public/src/styles/multi/gameroomSetting.module.css'


export default function GameroomSetting(){
  return (
    <div className={styles.gameroomSetting}>
      <div className="grid grid-cols-5 col-span-8">
        <div className="col-span-1">전체방</div>
        <div className="col-span-1">대기방</div>
        <div className="col-span-1">3라운드</div>
        <div className="col-span-1">5라운드</div>
        <div className="col-span-1">7라운드</div>
      </div>
      <div className="col-span-2">
        <button>빠른시작</button>
      </div>
      <div className="col-span-2">
        <button>방만들기</button>
      </div>
  </div>
  )
}