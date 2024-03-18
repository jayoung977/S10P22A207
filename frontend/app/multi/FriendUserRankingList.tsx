'use client'
import UserRanking from './UserRanking';
import { useQuery, UseQueryResult } from 'react-query';

interface userType {
   memberId: number,
   nickname: string,
   assets: number
}

interface userInfo {
    result : userType[];
}

export default function FriendUserRankingList () {
    const fetchFriendUserRankingInfo = async () => {
        const response = await fetch(`https://j10a207.p.ssafy.io/api/friend/list?followerId=${1}`)
        return response.json()
    }    
    const { data, isLoading, error } :UseQueryResult<userInfo, Error> = useQuery(
        'friendUserRankingInfo', 
        fetchFriendUserRankingInfo 
    )

    if (isLoading) {
        return <div className='rainbow'></div>
    }

    if (error) {
        return <div>Error: {error.message}</div>
    }
    console.log(data)
    const { result }: { result: userType[] | null } = data ? data : { result: null };
    return (
        <>  
            <div className="text-center mt-1 text-lg">친구랭킹</div>
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