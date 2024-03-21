"use client";
import Image from "next/image";
import kakaoLoginImg from "./../public/src/assets/images/kakao.svg";
import { useRouter } from "next/navigation";
import { TypewriterEffectSmooth } from "../public/src/components/ui/typewriter-effect";
import backgroundVideo from "./../static/videos/lofi.mp4";

export default function KakaoLogin() {
  const words = [
    {
      text: "Start",
      className: "text-white",
    },
    {
      text: "Time",
      className: "text-white",
    },
    {
      text: "Travel",
      className: "text-white",
    },
    {
      text: "with",
      className: "text-blue-500",
    },
    {
      text: "Charts",
      className: "text-red-500",
    },
  ];
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
    <div className="relative h-screen opacity-80">
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
      <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-50">
        <p className="text-neutral-600 dark:text-neutral-200 text-xs sm:text-base text-white">
          Big Data Stock Trading Game
        </p>
        <TypewriterEffectSmooth words={words} />
        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 space-x-0 md:space-x-4">
          <button
            onClick={() => {
              loginHandler();
            }}
            type="button"
            className="text-black bg-[#FEE500] hover:bg-[#FEE500]/90 focus:ring-4 focus:outline-none focus:ring-[#FEE500]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#FEE500]/55 me-2 mb-2 opacity-85"
          >
            <Image
              className="mr-2"
              src={kakaoLoginImg}
              alt=""
              width={20}
            ></Image>
            Sign in with KakaoTalk
          </button>
        </div>
      </div>
    </div>
  );
}
