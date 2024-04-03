"use client";

import socketStore from "@/public/src/stores/websocket/socketStore";

interface GameMember {
  rank: number;
  nickname: string;
  memberId: number;
  progress: number;
}

export default function GameMembers() {
  const { players } = socketStore();
  const gameMembers = [
    { rank: 1, nickname: '권권영', memberId: 1, progress: 0 },
    { rank: 2, nickname: '제헌법연구소',  memberId: 2, progress: 0 },
    { rank: 3, nickname: '최강창호',  memberId: 3, progress: 0 },
    { rank: 4, nickname: '용수리',  memberId: 4, progress: 0 },
    { rank: 5, nickname: '자영안자영',  memberId: 5, progress: 0 },
    { rank: 6, nickname: 'aaaaa',  memberId: 6, progress: 0 },
  ]
  type RankColor = { [key: number]: string };
  const rank: RankColor = {
    1: "bg-yellow-300",
    2: "bg-gray-300",
    3: "bg-red-300",
    4: "bg-gray-500 text-white",
    5: "bg-gray-500 text-white",
    6: "bg-gray-500 text-white",
  };

  return (
    <div className="col-span-2 grid grid-rows-6 text-sm">
      {players.map((player, i) => {
        const color = rank[player.rank];
        return (
          <div key={i} className="border gap-1 row-span-1 grid grid-rows-2">
            <div className="row-span-1 grid grid-cols-12 text-center items-center">
              <div className={`col-span-3 border p-1 m-1 ${color} rounded-lg`}>
                {player.rank}위
              </div>
              <div className="col-start-4 col-end-13">{player.nickName}</div>
            </div>
            <div className="row-span-1 m-1 text-center">
              <div className="w-full bg-gray-200 rounded-full dark:bg-gray-700">
                <div
                  className="bg-blue-600 font-medium text-blue-100 text-center p-0.5 leading-none rounded-full"
                  style={{ width: `${(player.day / 50) * 100}%` }}
                >
                  {" "}
                  ({player.day}/50)
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
