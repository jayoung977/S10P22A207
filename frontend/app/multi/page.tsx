"use client";

import Navbar from "../Navbar";
import Profile from "./profile";
import Ranking from "./Ranking";
import GameRoomSetting from "./gameroomSetting";
import PeacefulBgm from "@/public/src/components/bgm/PeacefulBgm";
import { QueryClient, QueryClientProvider } from "react-query";
import useFetchUserInfo from "@/public/src/hooks/useFetchUserInfo";
import { Boxes } from "../../public/src/components/ui/background-boxes";
import { cn } from "../../public/src/utils/cn";
import userStore from "@/public/src/stores/user/userStore";
import axios from "axios";
const queryClient = new QueryClient();

interface userType {
  memberId: number;
  email: string;
  nickname: string;
  birthYear: number;
  gender: string;
  asset: number;
  rankPoint: number;
  win: number;
  lose: number;
  singleAvgRoi: number;
  multiAvgRoi: number;
}

export default function Multi() {
  useFetchUserInfo();
  const rooms: string[] = [
    "게임방",
    "게임방",
    "게임방",
    "게임방",
    "게임방",
    "게임방",
  ];
  type ColorClass = { [key: number]: string };
  const RoomColor: ColorClass = {
    0: "bg-small-1",
    1: "bg-small-10",
    2: "bg-small-4",
    3: "bg-small-3",
    4: "bg-small-6",
    5: "bg-small-8",
  };

  return (
    <QueryClientProvider client={queryClient}>
      <div className="relative bg-background-1">
        <div className="grid grid-rows-12 h-screen border-separate">
          <PeacefulBgm></PeacefulBgm>
          <Navbar />
          <div className="bg-big-1 rounded-md row-span-11 grid grid-rows-12 mx-auto xl:max-w-screen-xl">
            {/* 상단 */}
            <div className="grid grid-cols-12 gap-4 row-span-4 z-10">
              <Profile />
              <div className="col-span-8 relative w-full overflow-hidden bg-small-1 flex flex-col items-center justify-center rounded-lg ">
                <div className="absolute inset-0 w-full bg-small-1 z-20 [mask-image:radial-gradient(transparent,white)] pointer-events-none" />
                <Boxes />
                <h1
                  className={cn("md:text-4xl text-xl text-white relative z-20")}
                >
                  함께할 때 우리는 더 강해진다.
                </h1>
                <p className="text-center mt-2 text-white relative z-20">
                  Expanding Investment Capabilities with Multi-Play
                </p>
              </div>
            </div>

            {/* 하단 */}
            <div className="grid grid-cols-12 gap-4 row-span-8 mt-4 px-2">
              <aside className="col-span-4 mt-2">
                <Ranking />
              </aside>
              <GameRoomSetting />
            </div>
          </div>
        </div>
      </div>
    </QueryClientProvider>
  );
}
