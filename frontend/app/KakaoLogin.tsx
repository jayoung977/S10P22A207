"use client";
import Image from "next/image";
import kakaoLoginImg from "./../public/src/assets/images/kakao.svg";
import { TypewriterEffectSmooth } from "../public/src/components/ui/typewriter-effect";
import backgroundVideo from "./../static/videos/bg.mp4";
// https://www.pexels.com/ko-kr/video/5726497/

export default function KakaoLogin() {
  const words = [
    {
      text: "지",
      className: "text-small-1",
    },
    {
      text: "금",
      className: "text-small-1",
    },
    {
      text: "이",
      className: "text-small-1",
    },
    {
      text: "니",
      className: "text-small-1",
    },
    {
      text: "?",
      className: "text-small-1",
    },
    {
      text: "!",
      className: "text-small-1",
    },
  ];
  const loginHandler = () => {
    if (typeof window !== "undefined") {
      const API_URL = "https://j10a207.p.ssafy.io";
      const KAKAO_AUTH_URL = `${API_URL}/oauth2/authorization/kakao`;
      window.location.href = KAKAO_AUTH_URL;
    }
  };
  return (
    <div className="relative h-screen opacity-90">
      {/* 비디오 배경 */}
      <video
        autoPlay
        loop
        muted
        className="absolute w-full h-full object-cover"
      >
        <source src={backgroundVideo} type="video/mp4" />
      </video>

      {/* 컨텐츠 */}
      <div className="absolute inset-0 flex flex-col items-center justify-center ">
        <p className="dark:text-neutral-200 text-xs sm:text-base text-white">
          Big Data Stock Trading Game
        </p>
        <TypewriterEffectSmooth words={words} />
        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 space-x-0 md:space-x-4">
          <button
            onClick={() => {
              loginHandler();
            }}
            type="button"
            className="text-black bg-[#FEE500]/70 hover:bg-[#FEE500] focus:ring-4 focus:outline-none focus:ring-[#FEE500]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#FEE500]/55 me-2 mb-2 opacity-85"
          >
            <Image
              className="mr-2"
              src={kakaoLoginImg}
              alt=""
              width={20}
            ></Image>
            카카오톡으로 시작하기
          </button>
        </div>
      </div>
    </div>
  );
}
