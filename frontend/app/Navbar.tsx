"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";
import penguin from "../public/src/assets/images/penguin.png";
import Swal from "sweetalert2";
export default function Navbar() {
  const router = useRouter();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };
  const openSinglePlay = () => {
    Swal.fire({
      title: "기존 기록이 없습니다",
      text: "플레이 하시겠습니까?",
      showCancelButton: true,
      confirmButtonText: "플레이",
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
    <nav className="shadow row-span-1 bg-white border-gray-200 dark:bg-gray-900 dark:border-gray-700">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <a className="flex items-center space-x-3 rtl:space-x-reverse">
          <Image
            src={penguin}
            alt="Logo"
            className="h-8"
            width={32}
            height={32}
          />
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            지금이니
          </span>
        </a>
        <div className="hidden w-full md:block md:w-auto" id="navbar-dropdown">
          <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            <li>
              <button
                id="dropdownNavbarLink"
                className="cursor-pointer flex items-center justify-between w-full py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 md:w-auto dark:text-white md:dark:hover:text-blue-500 dark:focus:text-white dark:border-gray-700 dark:hover:bg-gray-700 md:dark:hover:bg-transparent"
                onClick={toggleDropdown}
              >
                게임
                <svg
                  className="w-2.5 h-2.5 ms-2.5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 10 6"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 4 4 4-4"
                  />
                </svg>
              </button>
              <div
                id="dropdownNavbar"
                className={`absolute z-10 font-normal bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600 ${
                  dropdownOpen ? "" : "hidden"
                }`}
              >
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
                      // onClick={() => router.push("/single/1/play")}
                      onClick={() => openSinglePlay()}
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
              </div>
            </li>
            <li>
              <a
                className="cursor-pointer block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                onClick={() => router.push("/fund/recruiting")}
              >
                펀드
              </a>
            </li>
            <li>
              <a
                className="cursor-pointer block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                onClick={() => router.push("/board")}
              >
                커뮤니티
              </a>
            </li>
            <li>
              <a
                className="cursor-pointer block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray -700 dark:hover:text-white md:dark:hover:bg-transparent"
                onClick={() => router.push("/profile/1")}
              >
                프로필
              </a>
            </li>
            <li>
              <a
                className="cursor-pointer block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                onClick={() => router.push("/")}
              >
                로그아웃
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
