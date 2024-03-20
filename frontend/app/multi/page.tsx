"use client";
import Navbar from "../Navbar";
import Profile from "./profile";
import Ranking from "./Ranking";
import GameRoomSetting from "./gameroomSetting";
import GameRoom from "./gameroom";
import Pagination from "./pagination";
import PeacefulBgm from "@/public/src/components/bgm/PeacefulBgm";
import { QueryClient, QueryClientProvider } from "react-query";
import userStore from "@/public/src/stores/user/userStore";
import useFetchUserInfo from "@/public/src/hooks/useFetchUserInfo";

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

  // 이후 세션에서 받아올 로그인 사용자 데이터 이거 userStore에 담아놨어~~~~~~~~~~~~~~

  return (
    <QueryClientProvider client={queryClient}>
      <div className="relative bg-background-1">
        <div className="grid grid-rows-12 h-screen border-separate">
          <PeacefulBgm></PeacefulBgm>
          <Navbar />
          <div className="bg-big-1 rounded-md row-span-11 grid grid-rows-12 mx-auto xl:max-w-screen-xl">
            {/* 상단 */}
            <div className="grid grid-cols-12 gap-4 row-span-4">
              <Profile/>
            </div>
            {/* 하단 */}
            <div className="grid grid-cols-12 gap-4 row-span-8 mt-4 px-2">
              <aside className="col-span-4 mt-2">
                <Ranking />
              </aside>
              <article className="col-span-8 grid grid-rows-12 p-2">
                <GameRoomSetting />
                {/* 게임방 목록 */}
                <div className="bg-background-1 row-span-8 rounded-md grid grid-cols-12 shadow-md gap-1">
                  {rooms.map((room: string, i: number) => (
                    <div className="col-span-6 p-1 m-1 rounded-md" key={i}>
                      <GameRoom color={RoomColor[i]} />
                    </div>
                  ))}
                </div>
                <section className="row-span-2 flex justify-center">
                  <Pagination />
                </section>
              </article>
            </div>
          </div>
        </div>
      </div>
    </QueryClientProvider>
  );
}
