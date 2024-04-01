"use client";
import { useRouter } from "next/navigation";
import { useState, useLayoutEffect, useCallback } from "react";
import Image from "next/image";
import penguin from "../public/src/assets/images/penguin.png";
import logo from "../public/src/assets/images/logo.png";
import NavbarGameModal from "./NavbarGameModal";
import NavbarAlarmModal from "./NavbarAlarmModal";
import useFetchUserInfo from "@/public/src/hooks/useFetchUserInfo";
import userStore from "@/public/src/stores/user/userStore";
import fundCrudStore from "@/public/src/stores/fund/crud/FundCrudStore";
import socketStore from "@/public/src/stores/websocket/socketStore";
import useGetProfileImage from "@/public/src/hooks/useGetProfileImage";
import useClickSound from "@/public/src/components/clickSound/DefaultClick";

export default function Navbar() {
  useFetchUserInfo();
  const { setToggleButton } = fundCrudStore();
  const { memberId } = userStore();
  const [currentTime, setCurrentTime] = useState<Date>(new Date());
  const playClickSound = useClickSound();

  useLayoutEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const router = useRouter();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [alarmOpen, setAlarmOpen] = useState(false);
  const { receiveAlarm, setReceiveAlarm } = socketStore();

  const toggleDropdown = () => {
    playClickSound();
    setDropdownOpen(!dropdownOpen);
  };

  const toggleAlarm = () => {
    playClickSound();
    setAlarmOpen(!alarmOpen);
    setReceiveAlarm(false);
  };

  const handleLogout = () => {
    playClickSound();
    sessionStorage.removeItem("accessToken");
    document.cookie =
      "refreshToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    router.push("/");
  };

  return (
    <nav className="row-span-1 opacity-90 bg-background-1 border-gray-200 dark:bg-gray-900 dark:border-gray-700 z-50">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <a className="flex items-center space-x-3 rtl:space-x-reverse">
          <Image
            src={useGetProfileImage(30000000)}
            alt="Logo"
            className="bg-background-1"
            width={60}
          />
          <span
            className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white hover:cursor-pointer"
            onClick={() => {
              playClickSound();
              router.push("/multi")
            }}
          >
            지금이니
          </span>
        </a>
        <div className="hidden w-full md:block md:w-auto" id="navbar-dropdown">
          <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            <li>
              <button
                id="dropdownNavbarLink"
                className="cursor-pointer flex items-center justify-between w-full py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 md:w-auto dark:text-white md:dark:hover:text-blue-500 dark:focus:text-white dark:border-gray-700 dark:hover:bg-gray-700 md:dark:hover:bg-transparent"
                onClick={()=>{
                  playClickSound();
                  toggleDropdown()
                }
              }
              >
                게임
                <svg
                  className="w-2.5 h-2.5 ms-2.5"
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
                className={`fixed font-normal bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600 ${
                  dropdownOpen ? "" : "hidden"
                }`}
              >
                <NavbarGameModal></NavbarGameModal>
              </div>
            </li>
            <li>
              <a
                className="cursor-pointer block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                onClick={() => {
                  playClickSound();
                  router.push("/fund/recruiting");
                  setToggleButton("recruiting");
                }}
              >
                펀드
              </a>
            </li>
            <li>
              <a
                className="cursor-pointer block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                onClick={() => {
                    playClickSound();
                    router.push("/board")
                  }}
              >
                커뮤니티
              </a>
            </li>
            <li>
              <a
                className="cursor-pointer block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray -700 dark:hover:text-white md:dark:hover:bg-transparent"
                onClick={() => {
                    playClickSound();
                    router.push(`/profile/${memberId}`)
                  }}
              >
                프로필
              </a>
            </li>
            {/*NavBar에 시간 넣을까 ? 말까 ? 의견 주세요 ~_~*/}
            {/* <li className="">
              <p suppressHydrationWarning>{currentTime.toLocaleTimeString()}</p>
            </li> */}
            <li>
              <button
                id="dropdownNotificationButton"
                data-dropdown-toggle="dropdownNotification"
                className="relative inline-flex items-center text-sm font-medium text-center text-gray-500 hover:text-gray-900 focus:outline-none dark:hover:text-white dark:text-gray-400"
                type="button"
                onClick={toggleAlarm}
              >
                {receiveAlarm ? (
                  <svg
                    className="w-6 h-6 text-gray-800 dark:text-white hover:cursor-pointer"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M17.133 12.632v-1.8a5.407 5.407 0 0 0-4.154-5.262.955.955 0 0 0 .021-.106V3.1a1 1 0 0 0-2 0v2.364a.933.933 0 0 0 .021.106 5.406 5.406 0 0 0-4.154 5.262v1.8C6.867 15.018 5 15.614 5 16.807 5 17.4 5 18 5.538 18h12.924C19 18 19 17.4 19 16.807c0-1.193-1.867-1.789-1.867-4.175Zm-13.267-.8a1 1 0 0 1-1-1 9.424 9.424 0 0 1 2.517-6.391A1.001 1.001 0 1 1 6.854 5.8a7.43 7.43 0 0 0-1.988 5.037 1 1 0 0 1-1 .995Zm16.268 0a1 1 0 0 1-1-1A7.431 7.431 0 0 0 17.146 5.8a1 1 0 0 1 1.471-1.354 9.424 9.424 0 0 1 2.517 6.391 1 1 0 0 1-1 .995ZM8.823 19a3.453 3.453 0 0 0 6.354 0H8.823Z" />
                  </svg>
                ) : (
                  <svg
                    className="w-6 h-6 text-small-800 dark:text-white hover:cursor-pointer"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 5.365V3m0 2.365a5.338 5.338 0 0 1 5.133 5.368v1.8c0 2.386 1.867 2.982 1.867 4.175 0 .593 0 1.292-.538 1.292H5.538C5 18 5 17.301 5 16.708c0-1.193 1.867-1.789 1.867-4.175v-1.8A5.338 5.338 0 0 1 12 5.365ZM8.733 18c.094.852.306 1.54.944 2.112a3.48 3.48 0 0 0 4.646 0c.638-.572 1.236-1.26 1.33-2.112h-6.92Z"
                    />
                  </svg>
                )}
              </button>
              <div
                id="alarmNavbar"
                className={`absolute font-normal bg-white divide-y divide-gray-100 rounded-lg shadow w-auto dark:bg-gray-700 dark:divide-gray-600 ${
                  alarmOpen ? "" : "hidden"
                }`}
              >
                <NavbarAlarmModal />
              </div>
            </li>

            <li>
              <a
                className="cursor-pointer block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                onClick={() => handleLogout()}
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
