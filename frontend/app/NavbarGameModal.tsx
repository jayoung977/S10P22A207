"use client";

import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import axios from "axios";
import useClickSound from "@/public/src/components/clickSound/DefaultClick";

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
  const playClickSound = useClickSound();
  const openSinglePlay = () => {
    // openSinglePlay 호출 시, 해당 사용자의 기존 싱글 게임 기록 유무 확인 api 요청(지금 경로 X)
    // api 요청으로 넘어오는 데이터 : 이어하기 유무(true/false), 게임 방 번호
    // 확인 후 res.data.result 값이 true일 경우, Swal.fire 오픈
    axios
      .get("https://zayoung21.store/api/single/is-existing-single-game", {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
        },
      })
      .then((res) => {
        console.table("res : ", res.data);
        // 여기서 singleGameChance도 같이 보내야 하지 않나?
        if (res.data.result.isExistSingleGame == true) {
          Swal.fire({
            title: "기존 기록이 있습니다",
            text: "이어서 하시겠습니까?",
            showCancelButton: true,
            confirmButtonText: "이어하기",
            confirmButtonColor: "#1454FF",
            cancelButtonText: "취소",
          }).then((result) => {
            // 이어하기 버튼 클릭 시
            if (result.isConfirmed) {
              router.push("/single/play");
              // 취소 버튼 클릭 시
            } else if (result.dismiss === Swal.DismissReason.cancel) {
            }
          });
        } else if (res.data.result.singleGameChance > 0) {
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
              router.push("/single/play");
            } else if (result.dismiss === Swal.DismissReason.cancel) {
              // 취소 버튼을 클릭한 경우
            }
          });
        } else {
          Swal.fire({
            title: "현재 싱글 게임을 할 수 없습니다!",
            text: "목숨이 생기면 돌아와라",
            confirmButtonText: "플레이",
            confirmButtonColor: "#1454FF",
          }).then((result) => {
            if (result.isConfirmed) {
            }
          });
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <ul className="py-2 text-sm text-gray-700 dark:text-gray-400">
      <li>
        <a
          className="shadow-sm cursor-pointer block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
          onClick={() => {
            playClickSound();
            router.push("/multi");
          }}
        >
          멀티 플레이
        </a>
      </li>
      <li>
        <a
          className="shadow-sm cursor-pointer block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
          onClick={() => {
            playClickSound();
            openSinglePlay();
          }}
        >
          싱글 플레이
        </a>
      </li>

      <li>
        <a
          className="shadow-sm cursor-pointer block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
          onClick={() => {
            playClickSound();
            router.push("/quiz");
          }}
        >
          퀴즈
        </a>
      </li>
    </ul>
  );
}
