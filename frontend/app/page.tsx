"use client";
import KakaoLogin from "./KakaoLogin";
import { LandingPage } from "./LandingPage";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const [progress, setProgress] = useState(0);
  const router = useRouter();
  const updateProgressBar = () => {
    // 전체 문서의 높이
    const totalHeight =
      document.documentElement.scrollHeight - window.innerHeight;
    // 현재 스크롤 위치
    const windowScroll = window.pageYOffset;
    // 진행 상태 계산
    const currentProgress = (windowScroll / totalHeight) * 100;
    setProgress(currentProgress);
  };

  useEffect(() => {
    window.addEventListener("scroll", updateProgressBar);
    return () => window.removeEventListener("scroll", updateProgressBar);
  }, []);

  useEffect(() => {
    if (sessionStorage.getItem("isLogin") == "true") {
      router.push("/multi");
    }
  }, []);

  return (
    <div className="bg-background-1">
      <div
        id="progressBar"
        className="fixed top-0 left-0 h-1 bg-small-1 z-10"
        style={{ width: `${progress}%` }}
      ></div>
      <LandingPage></LandingPage>
      <KakaoLogin></KakaoLogin>
    </div>
  );
}
