import styles from '@/public/src/styles/multi/profile.module.css'

export default function Profile(){
  return (
    <div className="col-span-4 grid grid-rows-4 gap-2 border m-2 border-collapse">
      {/* 프로필 상단 */}
      <div className='row-span-2 border grid grid-cols-8'>
        <div className='col-span-3 border grid grid-rows-4 justify-items-center'>
          <div className='row-span-3'>프로필 사진</div>
          <div className='row-span-1'>닉네임</div>
        </div>
        <div className="col-span-3 border grid grid-rows-4">
          <div className='row-span-3'>티어 이미지</div>
          <div className='row-span-1'>티어 이름</div>
        </div>
        <div className="col-span-2 grid grid-rows-4">
          <div className='row-start-2 row-end-3'>1승 300패</div>
          <div className='row-start-3 row-end-4'>0.3%</div>
        </div>
      </div>
      {/* 프로필 하단 */}
      <div className='row-span-1 border items-center grid grid-cols-8'>
        <div className="col-span-3">
          <div>시드머니</div>
        </div>
        <div className="col-span-5">
          <div>20,000,000원</div>
        </div>
      </div>
      <div className='row-span-1 items-center border grid grid-cols-8'>
        <div className="col-span-3">
          <div>평균수익률</div>
        </div>
        <div className="col-span-5">
          <div>+10.0%</div>
        </div>
      </div>
    </div>

  )
}