"use client";

import { useRouter } from "next/navigation";

export default function Navbar() {
  const router = useRouter();
  return (
    <div className="row-start-1 row-end-2 grid grid-cols-12 border border-black">
      <div className="col-start-1 col-end-2 border border-black flex items-center justify-center">
        로고 이미지
      </div>
      <div className="col-start-2 col-end-5 border border-black flex items-center justify-center">
        빈칸
      </div>
      <div className="col-start-5 col-end-6 border border-black flex items-center justify-center">
        게임
      </div>
      <div className="col-start-6 col-end-7 border border-black flex items-center justify-center">
        펀드
      </div>
      <div className="col-start-7 col-end-8 border border-black flex items-center justify-center">
        커뮤니티
      </div>
      <div
        className="col-start-8 col-end-11 border border-black flex items-center justify-center"
        onClick={() => {
          router.push("/profile/1");
        }}
      >
        로그인 사용자 정보
      </div>
      <div className="col-start-11 col-end-12 border border-black flex items-center justify-center">
        알림창
      </div>
      <div className="col-start-12 col-end-13 border border-black flex items-center justify-center">
        나가기
      </div>
    </div>
  );
}
