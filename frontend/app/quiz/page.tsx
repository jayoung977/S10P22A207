// 퀴즈 페이지
import Navbar from "@/app/Navbar";
import QuizGiven from "./QuizGiven";
import PeacefulBgm from "@/public/src/components/bgm/PeacefulBgm";
export default function Quiz() {
  return (
    <div className="grid grid-rows-12 h-screen bg-background-1  ">
      <PeacefulBgm></PeacefulBgm>
      <Navbar />
      <QuizGiven />
    </div>
  );
}
