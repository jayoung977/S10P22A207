'use client'
import UserRanking from './UserRanking';
import { useQuery, UseQueryResult } from 'react-query';

type userType = {
    memberId: number,
    nickname: string,
    assets: number
}

interface userInfo {
    result : userType[];
}

export default function UserRankingList () {
    const fetchAllUserRankingInfo = async () => {
        // 전체 랭킹 불러오는 api 개발 전
        // 우선 친구 랭킹 불러오는 api 사용
        const response = await fetch(`https://j10a207.p.ssafy.io/api/friend/list?followerId=1`)
        return response.json()
    }    
    const { data, isLoading, error } :UseQueryResult<userInfo, Error> = useQuery(
        'allUserRankingInfo', 
        fetchAllUserRankingInfo
    )
    
    if (isLoading) {
        return <div className='rainbow'></div>
    }

    if (error) {
        return <div>Error: {error.message}</div>
    }

    const {result} : {result: userType[] | null} = data ? data : {result : null}

    return (
        <>  
            <div className="text-center mt-1 text-lg">전체랭킹</div>
            <div className='row-span-9 overflow-auto border' style={{ height: 'calc(42vh)'}}>
                {
                    result?.map((x, index) => (
                        <UserRanking key={index} user={x}/>
                        )
                    )
                }
            </div>
        </>
    )
}