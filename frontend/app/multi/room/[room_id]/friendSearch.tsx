import SearchBar from "../../searchBar";
import Image from "next/image";
import ProfileImage from "@/public/src/assets/images/profile-image.png";
import Swal from "sweetalert2";
import multigameStore from "@/public/src/stores/multi/MultiGameStore";
import { useEffect, useState } from "react";
import { useQuery, UseQueryResult } from "react-query";
import { Friend, FriendInfo } from "@/public/src/stores/user/userStore";
import axios from "axios";
import { useParams } from "next/navigation";
import useClickSound from "@/public/src/components/clickSound/DefaultClick";

const fetchFriendInfo = async () => {
  const token = sessionStorage.getItem("accessToken");
  const response = await fetch("https://j10a207.p.ssafy.io/api/friend/list", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.json();
};

export default function FriendSearch() {
  const { data, isLoading, error }: UseQueryResult<FriendInfo, Error> =
    useQuery("FriendInfo", fetchFriendInfo);

  // 친구목록 react-query로 구현
  const { result }: { result: Friend[] } = data ? data : { result: [] };
  const { searchFriend } = multigameStore();
  const [filteredFriendList, setfilteredFriendList] = useState<Friend[]>([]);
  const playClickSound = useClickSound();

  const invitationRequest = async (request: any) => {
    const response = await axios({
      method: "post",
      url: "https://j10a207.p.ssafy.io/api/multi/invite",
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
      },
      data: request,
    });
    console.log(response.data);
    return response.data;
  };

  const params = useParams<{ room_id?: string }>();
  const room_id: string | undefined = params.room_id;
  const inviteFriend = (friend: any) => {
  const data = {
      roomId: room_id,
      receiver: friend.memberId,
    };
    console.log();
    invitationRequest(data);
    Swal.fire({
      text: `${friend.nickname}님에게 초대를 발송했습니다.`,
      icon: "success",
    });
  };

  if (isLoading) {
    return <div className="rainbow"></div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }
  // console.log(result);
  return (
    <div className="row-span-3 border-e grid grid-rows-8">
      <div className="row-span-1 flex justify-center bg-small-6 text-xl text-textColor-2 border-b gap-2 items-center">
        <div>친구초대</div>
      </div>
      <div
        className="overflow-auto row-span-7"
        style={{ height: "calc(35vh)" }}
      >
        {result.map((friend: Friend, i: number) => {
          return (
            <div
              key={i}
              // className={`${
              //   friend.isLogin == false && `hidden`
              // } grid grid-cols-12 items-center bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600`}

              className={`grid grid-cols-12 items-center bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600`}
            >
              <div className="col-span-2 items-center text-gray-900 whitespace-nowrap dark:text-white">
                <Image
                  src={ProfileImage}
                  alt="프로필"
                  className="rounded-full"
                />
              </div>
              <div className="col-span-6 text-base font-semibold">
                {friend.nickname}
              </div>
              <div className="col-span-4 px-6 py-4">
                <button
                  onClick={() => {
                    playClickSound();
                    inviteFriend(friend);
                  }}
                  className="bg-blue-500 text-white px-2 py-1 rounded-md "
                >
                  초대
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
