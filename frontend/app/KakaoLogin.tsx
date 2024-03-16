"use client";
import Image from "next/image";
import styles from "./page.module.css";
import kakaoLoginImg from "./../public/src/assets/images/kakao_login_medium_narrow.png";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";

export default function KakaoLogin() {
  const router = useRouter();
  return (
    <div className="flex justify-center items-center h-screen">
      <button
        onClick={() => {
          router.push("/multi");
        }}
        type="button"
        className="text-black bg-[#FEE500] hover:bg-[#FEE500]/90 focus:ring-4 focus:outline-none focus:ring-[#FEE500]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#FEE500]/55 me-2 mb-2 opacity-85"
      >
        Sign in with KAKAO
      </button>
    </div>
  );
}
