import styles from '@/public/src/styles/multi/pagination.module.css'

export default function Pagination(){
  const pages:number[] = [1,2,3,4,5];
  return(
    <div className={styles.pagination}>
      {
        pages.map((page:number,i:number)=> (
          <div key={i}>
            {page}
          </div>
        ))
      }
    </div>
  )
}