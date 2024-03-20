"use client";
import Image from "next/image";
import styles from "./page.module.css";
import kakaoLoginImg from "./../public/src/assets/images/kakao.svg";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";

export default function KakaoLogin() {
  const router = useRouter();
  const loginHandler = () => {
    if (typeof window !== "undefined") {
      const frontendUrl = `${window.location.protocol}//${window.location.host}`;
      const API_URL = "https://j10a207.p.ssafy.io";
      const KAKAO_AUTH_URL = `${API_URL}/oauth2/authorization/kakao`;
      window.location.href = KAKAO_AUTH_URL;
    }
  };
  return (
    <div className="flex justify-center items-center h-screen">
      <button
        onClick={() => {
          loginHandler();
        }}
        type="button"
        className="text-black bg-[#FEE500] hover:bg-[#FEE500]/90 focus:ring-4 focus:outline-none focus:ring-[#FEE500]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#FEE500]/55 me-2 mb-2 opacity-85"
      >
        <Image className="mr-2" src={kakaoLoginImg} alt="" width={20}></Image>
        Sign in with KakaoTalk
      </button>
    </div>
  );
}
