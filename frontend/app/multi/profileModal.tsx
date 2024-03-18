'use client'
import { useQuery, UseQueryResult } from 'react-query';
import Profile from "./Profile"

interface userType {
  memberId : number;
  email : string;
  nickname : string;
  birthYear : number;
  gender : string;
  asset : number;
  rankPoint : number;
  win : number;
  lose : number;
  singleAvgRoi : number;
  multiAvgRoi : number;
}
interface userInfo {
  result : userType;
}

export default function ProfileModal({isOpen, onClose, memberId}: any){
  if(!isOpen) return null;
  const fetchUserInfo = async () => {
    const response = await fetch(`https://j10a207.p.ssafy.io/api/member?loginUserId=${memberId}`)
    return response.json()
  }
  const { data, isLoading, error } :UseQueryResult<any, Error> = useQuery(
    'otherUserInfo', 
    fetchUserInfo 
  )
  if (isLoading) {
    return <div className="rainbow"></div>
  }
  if (error) {
    return <div>Error: {error.message}</div>
  }
  const { result } :{ result: userType | any} = data ? data : { result : {} };
  return (
    <div tabIndex={-1} aria-hidden="true"  className="bg-slate-100 w-[500px] h-[250px] fixed -translate-x-1/2 translate-y-1/2 inset-0 left-1/2 border items-center justify-center rounded-md grid grid-cols-4 gap-2">
      <div className="col-span-3">
        <Profile user={result}/>
      </div>
      <div className="col-span-1 justify-items-center">
        <div>
          <button className="bg-blue-500 m-2 p-2 text-white rounded-md">같이하기</button>
        </div>
        <div>
          <button className="bg-blue-500 m-2 p-2 text-white rounded-md">친구신청</button>
        </div>
        <div>
          <button
            type="button"
            onClick={()=>{onClose()}}
            className="bg-red-500 m-2 py-2 px-4 text-white rounded-md hover:bg-small-3">뒤로가기
          </button>
        </div>
      </div>
    </div>
  )
}