"use client";
// 퀴즈 페이지
import Navbar from "@/app/Navbar";
import QuizGiven from "./QuizGiven";
import PeacefulBgm from "@/public/src/components/bgm/PeacefulBgm";
import { QueryClient, QueryClientProvider } from "react-query";
import WaitingBgm from "@/public/src/components/bgm/WaitingBgm";
import { useEffect } from "react";
const queryClient = new QueryClient();

export default function Quiz() {
  const preventClose = (e: BeforeUnloadEvent) => {
    e.preventDefault();
    e.returnValue = ""; // for chrome. deprectaed.
  };

  useEffect(() => {
    window.addEventListener("beforeunload", preventClose);
    return () => {
      window.removeEventListener("beforeunload", preventClose);
    };
  }, []);
  // 새로고침 방지 로직

  const preventGoBack = () => {
    history.pushState(null, "", location.href);
  };
  useEffect(() => {
    history.pushState(null, "", location.href);
    window.addEventListener("popstate", preventGoBack);
    return () => {
      window.removeEventListener("popstate", preventGoBack);
    };
  }, []);
  //  뒤로가기 방지 로직
  
  return (
    <QueryClientProvider client={queryClient}>
      <div className="grid grid-rows-12 h-screen bg-background-1  ">
        <WaitingBgm></WaitingBgm>
        <Navbar />
        <QuizGiven />
      </div>
    </QueryClientProvider>
  );
}
