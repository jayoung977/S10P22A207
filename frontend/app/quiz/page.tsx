"use client";
// 퀴즈 페이지
import Navbar from "@/app/Navbar";
import QuizGiven from "./QuizGiven";
import PeacefulBgm from "@/public/src/components/bgm/PeacefulBgm";
import { QueryClient, QueryClientProvider } from "react-query";
import WaitingBgm from "@/public/src/components/bgm/WaitingBgm";

const queryClient = new QueryClient();

export default function Quiz() {
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
