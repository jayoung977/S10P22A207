'use client'

interface GameMember {
  rank: number,
  nickname: string,
  memberId: number,
  progress: number,
  asset: number,
  roi: number,
}

export default function GameMembers(){
  const gameMembers = [
    { rank: 1, nickname: '권권영', memberId: 1, progress: 22, asset: 15000000, roi: 50 },
    { rank: 2, nickname: '제헌법연구소',  memberId: 2, progress: 20, asset: 14000000, roi: 40 },
    { rank: 3, nickname: '최강창호',  memberId: 3, progress: 29, asset: 13000000, roi: 30 },
    { rank: 4, nickname: '용수리',  memberId: 4, progress: 28, asset: 12000000, roi: 20 },
    { rank: 5, nickname: '자영안자영',  memberId: 5, progress: 22, asset: 11000000, roi: 10 },
    { rank: 6, nickname: '김민규소',  memberId: 6, progress: 24, asset: 10000000, roi: 0 },
  ]
  type RankColor = { [key: number]: string };
  const rank: RankColor = {
    1: "bg-yellow-300",
    2: "bg-gray-300",
    3: "bg-red-300",
    4: "bg-gray-500 text-white",
    5: "bg-gray-500 text-white",
    6: "bg-gray-500 text-white",
  };

  return (
    <div className="col-span-2 grid grid-rows-6 text-sm">
      {
        gameMembers.map((user: GameMember, i: number)=> {
          const color = rank[user.rank]
          return(
            <div key={i}  className="border gap-1 row-span-1">
              <div className='grid grid-cols-12 text-center items-center'>
                <div 
                  className={`col-span-3 border p-1 m-1 ${color} rounded-lg`}>{user.rank}위</div>
                <div className='col-start-4 col-end-13'>{user.nickname}</div>
              </div>
              <div className='m-1 text-center'>
                <div className="w-full bg-gray-200 rounded-full dark:bg-gray-700">
                  <div className="bg-blue-600 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full" style={{width: `${(user.progress/50)*100}%`}}> ({user.progress}/50)</div>
                </div>
                <div>{user.asset.toLocaleString()}원 ({user.roi}%)</div>
              </div>
            </div>
          )
        })
      }
    </div>
  )
}