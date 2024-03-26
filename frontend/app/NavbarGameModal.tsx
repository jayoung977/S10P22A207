"use client";

import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import axios from "axios";

type stockChartData = {
  marketPrice: number;
  highPrice: number;
  lowPrice: number;
  endPrice: number;
  date: Date;
};

interface result {
  gameLogId: number;
  singleGameChance: number;
  stockChartDataList: [stockChartData];
}

interface RoomInfo {
  result: result;
}

export default function NavbarGameModal() {
  const router = useRouter();
  const openSinglePlay = () => {
    // openSinglePlay 호출 시, 해당 사용자의 기존 싱글 게임 기록 유무 확인 api 요청(지금 경로 X)
    // api 요청으로 넘어오는 데이터 : 이어하기 유무(true/false), 게임 방 번호
    // 확인 후 res.data.result 값이 true일 경우, Swal.fire 오픈
    axios.get("https://j10a207.p.ssafy.io/api/single/is-existing-single-game", {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
        }
      }).then((res) => {
          console.table("res : ", res.data);
          // 여기서 singleGameChance도 같이 보내야 하지 않나?
          if (res.data.result == true) {
            Swal.fire({
              title: "기존 기록이 있습니다",
              text: "이이서 하시겠습니까?",
              showCancelButton: true,
              confirmButtonText: "이어하기",
              confirmButtonColor: "#1454FF",
              cancelButtonText: "취소",
            }).then((result) => {
            if (result.isConfirmed) {
              // 이어하기 버튼을 클릭한 경우
              console.log("이어하기 버튼을 클릭했습니다.");
              router.push("/single/play");
            } else if (result.dismiss === Swal.DismissReason.cancel) {
              // 취소 버튼을 클릭한 경우
              console.log("취소 버튼을 클릭했습니다.");
            }
          });
          } else {
            Swal.fire({
              title: "기존 기록이 없습니다",
              text: "플레이 하시겠습니까?",
              showCancelButton: true,
              confirmButtonText: "플레이",
              confirmButtonColor: "#1454FF",
              cancelButtonText: "취소",
            }).then((result) => {
              if (result.isConfirmed) {
                // 플레이 버튼을 클릭한 경우
                console.log("플레이 버튼을 클릭했습니다.");
                router.push("/single/play");
              } else if (result.dismiss === Swal.DismissReason.cancel) {
                // 취소 버튼을 클릭한 경우
                console.log("취소 버튼을 클릭했습니다.");
              }
          });
        }
      }).catch((error) => {
          console.error(error);
        });
  };

  return (
    <ul
      className="py-2 text-sm text-gray-700 dark:text-gray-400"
      aria-labelledby="dropdownLargeButton"
    >
      <li>
        <a
          className="shadow-sm cursor-pointer block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
          onClick={() => router.push("/multi")}
        >
          멀티 플레이
        </a>
      </li>
      <li>
        <a
          data-modal-target="popup-modal"
          data-modal-toggle="popup-modal"
          className="shadow-sm cursor-pointer block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
          onClick={() => openSinglePlay()}
        >
          싱글 플레이
        </a>
      </li>

      <li>
        <a
          className="shadow-sm cursor-pointer block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
          onClick={() => router.push("/quiz")}
        >
          퀴즈
        </a>
      </li>
    </ul>
  );
}
