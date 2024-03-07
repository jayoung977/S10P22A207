"use client";
import { useRouter } from "next/navigation";
export default function UserRecordInfoMulti() {
  const router = useRouter();
  return (
    <div className="row-span-5 grid grid-rows-6">
      <div className="row-span-1 grid grid-cols-3">
        <div className="col-span-1 border border-black">같이 한 플레이어</div>
        <div className="col-span-1 border border-black">순위</div>
        <div className="col-span-1 border border-black">수익률</div>
      </div>
      <div className="row-span-5 grid grid-rows-6">
        <div className="row-span-1">2024년2월29일</div>
        <div
          className="row-span-1 grid grid-cols-3"
          onClick={() => {
            router.push("1/multi/1");
          }}
        >
          <div className="col-span-1">김김민규 외 5명</div>
          <div className="col-span-1">1위</div>
          <div className="col-span-1">+42.22%</div>
        </div>

        <div className="row-span-1 grid grid-cols-3">
          <div className="col-span-1">김김민규 외 5명</div>
          <div className="col-span-1">1위</div>
          <div className="col-span-1">+42.22%</div>
        </div>
        <div className="row-span-1">2024년2월28일</div>
        <div className="row-span-1 grid grid-cols-3">
          <div className="col-span-1">김김민규 외 5명</div>
          <div className="col-span-1">1위</div>
          <div className="col-span-1">+42.22%</div>
        </div>

        <div className="row-span-1 grid grid-cols-3">
          <div className="col-span-1">김김민규 외 5명</div>
          <div className="col-span-1">1위</div>
          <div className="col-span-1">+42.22%</div>
        </div>
      </div>
    </div>
  );
}
