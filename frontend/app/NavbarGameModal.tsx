'use client'

import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import axios from 'axios'


type stockChartData = {
  marketPrice: number
  highPrice: number
  lowPrice: number
  endPrice: number
  date: Date
}

interface result {
  gameLogId: number,
  singleGameChance: number,
  stockChartDataList: [stockChartData],
}


interface RoomInfo {
  result: result
}



export default function NavbarGameModal() {
  const router = useRouter();
    const openSinglePlay = () => {
    axios.get('https://j10a207.p.ssafy.io/api/single')
    .then((res) => {
      console.log(res)
    })
    .catch((error)=>{
      console.error(error)
    })
    Swal.fire({
        title: "기존 기록이 없습니다",
        text: '플레이 하시겠습니까?',
        showCancelButton: true,
        confirmButtonText: "플레이",
        confirmButtonColor: "#1454FF",
        cancelButtonText: "취소",
      }).then((result) => {
        if (result.isConfirmed) {
          // 플레이 버튼을 클릭한 경우
          console.log("플레이 버튼을 클릭했습니다.");
          router.push("/single/1/play");
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          // 취소 버튼을 클릭한 경우
          console.log("취소 버튼을 클릭했습니다.");
        }
      });

  };

  return (
    <ul
      className="py-2 text-sm text-gray-700 dark:text-gray-400"
      aria-labelledby="dropdownLargeButton"
    >
      <li>
        <a
          className="cursor-pointer block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
          onClick={() => router.push("/multi")}
        >
          멀티 플레이
        </a>
      </li>
      <li>
        <a
          data-modal-target="popup-modal"
          data-modal-toggle="popup-modal"
          className="cursor-pointer block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
          onClick={() =>openSinglePlay()}
        >
          싱글 플레이
        </a>
      </li>

      <li>
        <a
          className="cursor-pointer block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
          onClick={() => router.push("/quiz")}
        >
          퀴즈
        </a>
      </li>
    </ul>
  );
}
