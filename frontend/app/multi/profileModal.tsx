"use client";
import multigameStore from "@/public/src/stores/multi/MultiGameStore";
import ProfileImage from "@/public/src/assets/images/penguin.png";
import TierImage from "@/public/src/assets/images/Tier/challenger.png";
import Image from "next/image";
import { UseQueryResult, useQuery, useQueryClient } from "react-query";
import { UserInfo, UserProfile } from "@/public/src/stores/user/userStore";
import axios from "axios";
import useGetProfileImage from "@/public/src/hooks/useGetProfileImage";
import useGetProfileRank from "@/public/src/hooks/useGetProfileRank";
import useClickSound from "@/public/src/components/clickSound/DefaultClick";
import Swal from "sweetalert2";


const fetchProfile = async (userId: number) => {
  const token = sessionStorage.getItem("accessToken");
  const response = await fetch(
    `https://j10a207.p.ssafy.io/api/member/profile?memberId=${userId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    );
    return response.json();
  };
  
  const checkFriend = async(followingId: number) => {
    const response = await fetch(
    `https://j10a207.p.ssafy.io/api/friend/check-friend?followingId=${followingId}`,{
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
      },
    }
    )
    return response.json();
  }
  
export default function ProfileModal() {
  const { lobbyModal, setLobbyModal, userId, setUserId } = multigameStore();
  const { data, isLoading, error }: UseQueryResult<UserInfo, Error> = useQuery(
    "OtherProfile",
    () => fetchProfile(userId)
    );
    
  const { data: isFriend, 
    isLoading: friendCheckLoading,
    error: friendCheckError 
  }: UseQueryResult<any, Error> = useQuery(
    "FriendCheck",
    () => checkFriend(userId)
    );
  
  const queryClient = useQueryClient();

  function requestFriend(nickname: string) {
    const token = sessionStorage.getItem("accessToken");
    axios({
      method: "post",
      url: "https://j10a207.p.ssafy.io/api/friend-ask",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: {
        nickname: nickname,
      },
    })
    .then((response) => {
      console.log(response.data);
      Swal.fire({
        title: "너 내 도도독!",
        icon: 'success'
      })
    })
    .catch((error) => {
      console.error(error);
    });
  }
      
const playClickSound = useClickSound();

function handleClose() {
  setLobbyModal(false);
}

function deleteFriend(userId: number) {
  const token = sessionStorage.getItem("accessToken");
  axios({
    method: "delete",
    url: `https://j10a207.p.ssafy.io/api/friend/delete?followingId=${userId}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  .then((response) => {
    console.log(response.data);
    Swal.fire({
      title: "헤어져!",
      icon: 'warning'
    })
    queryClient.invalidateQueries(['FriendCheck'])
    queryClient.invalidateQueries(['friendUserRankingInfo'])
    console.log(isFriend.result)

  })
  .catch((error) => {
    console.error(error);
  });
}



if (isLoading || friendCheckLoading) {
  return <div className="rainbow"></div>;
}

if (error || friendCheckError ) {
  return <div>Error: {error?.message}</div>;
}

const { result }: { result: UserProfile | null } = data
? data
: { result: null };
// console.table(result)


return (
  <div className="bg-slate-100 w-[500px] h-[250px] fixed -translate-x-1/2 translate-y-1/2 inset-0 left-1/2 border items-center justify-center rounded-md grid grid-cols-4 gap-2 z-30">
    <div className="col-span-3">
      <div className="col-span-4 bg-background-1 rounded-md grid grid-rows-5 gap-2 shadow-md m-2">
        {/* 프로필 상단 */}
        <div className="row-span-3 bg-big-1 m-1 grid grid-cols-6">
          <div className="col-span-3 border grid grid-rows-4 justify-items-center">
            <div className="row-span-3 m-2">
              <Image
                src={useGetProfileImage(result?.asset)}
                alt="Profile-image"
                width={80}
              />
            </div>
            <div className="row-span-1">{result?.nickname}</div>
          </div>
          <div className="col-span-3 border grid grid-rows-4 justify-items-center">
            <div className="row-span-3 m-2">
              <Image
                src={useGetProfileRank(result?.rankPoint)}
                alt="Tier-image"
                width={80}
              />
            </div>
            <div className="row-span-1">
              {result?.rankPoint != null ? result?.rankPoint : `브론즈`}점
            </div>
          </div>
        </div>
        {/* 프로필 하단 */}
        <div className="row-span-2 bg-small-1 rounded-md p-1 text-textColor-2 text-center grid grid-cols-8">
          <div className="col-span-8">
            {result?.win != null ? result?.win : 0}승{" "}
            {result?.lose != null ? result?.lose : 0} 패 (
            {result?.win != null && result?.lose != null
              ? result?.win + result?.lose > 0
                ? (
                    (result?.win / (result?.win + result?.lose)) *
                    100
                  ).toFixed(1)
                : 0
              : 0}
            %)
          </div>
          <div className="col-span-4">
            <div>시드머니</div>
            <div>평균수익률</div>
          </div>
          <div className="col-span-4">
            <div>{result?.asset?.toLocaleString()}원</div>
            <div>
              +{result?.multiAvgRoi != null ? result?.multiAvgRoi : 0}%
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="col-span-1 justify-items-center">
      <div>
        <button
        onClick={()=>{
          playClickSound();
        }}
        className="bg-blue-500 m-2 p-2 text-white rounded-md">
          같이하기
        </button>
      </div>
      <div>
        {
          isFriend.result ? (
            <button
            onClick={() => {
              playClickSound();
              deleteFriend(userId);
            }}
            className="bg-blue-500 m-2 p-2 text-white rounded-md"
          >
            친구삭제
          </button>
          ): (
          <button
            onClick={() => {
              playClickSound();
              if (result) requestFriend(result?.nickname);
            }}
            className="bg-blue-500 m-2 p-2 text-white rounded-md"
          >
            친구신청
          </button>

          )
        }
      </div>
      <div>
        <button
          onClick={() => {
            playClickSound();
            handleClose();
          }}
          type="button"
          className="bg-red-500 m-2 p-2 text-white rounded-md hover:bg-small-3"
        >
          뒤로가기
        </button>
      </div>
    </div>
  </div>
  );
}
