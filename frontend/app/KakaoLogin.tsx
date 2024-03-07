"use client";
import Image from "next/image";
import styles from "./page.module.css";

export default function KakaoLogin() {
  return (
    <div>
      <button
        type="submit"
        onClick={() => {
          console.log("카카오로그인버튼클릭");
        }}
      >
        카카오로그인버튼
      </button>
    </div>
  );
}
