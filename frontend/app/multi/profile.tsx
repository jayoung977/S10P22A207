import ProfileImage from '@/public/src/assets/images/penguin.png'
import TierImage from '@/public/src/assets/images/bronze.png'
import Image from 'next/image'

interface userType {
  memberId : number;
  email : string;
  nickname : string;
  birthYear : number;
  gender: string;
  asset : number;
  rankPoint : number;
  win : number;
  lose : number;
  singleAvgRoi : number,
  multiAvgRoi : number
}

export default function Profile({ user } :{ user :userType }){
  return (
    <div className="col-span-4 bg-background-1 rounded-md grid grid-rows-5 gap-2 shadow-md m-2">
      {/* 프로필 상단 */}
      <div className='row-span-3 bg-big-1 m-1 grid grid-cols-6'>
        <div className='col-span-3 border grid grid-rows-4 justify-items-center'>
          <div className='row-span-3 m-2'>
            <Image
              src={ProfileImage}
              alt="Profile-image"
              width={60}
              height={60}
              />
          </div>
          <div className='row-span-1'>{user.nickname}</div>
        </div>
        <div className='col-span-3 border grid grid-rows-4 justify-items-center'>
          <div className='row-span-3 m-2'>
            <Image
                src={TierImage}
                alt="Tier-image"
                width={60}
                height={60}
                />
          </div>
          <div className='row-span-1'>{user.rankPoint}</div>
        </div>
      </div>
      {/* 프로필 하단 */}
      <div className='row-span-2 bg-small-1 rounded-md p-1 text-textColor-2 text-center grid grid-cols-8'>
        <div className='col-span-8'>{user.win}승 {user.lose}패 ({user.win + user.lose > 0 && (user.win/(user.win+user.lose) * 100)}%)</div>
        <div className='col-span-4'>
          <div>시드머니</div>
          <div>평균수익률</div>
        </div>
        <div className='col-span-4'>
          <div>{user.asset}원</div>
          <div>+{user.multiAvgRoi}%</div>
        </div>
      </div>
    </div>

  )
}