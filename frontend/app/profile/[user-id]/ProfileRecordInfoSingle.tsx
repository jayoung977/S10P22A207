"use client";

import { useRouter } from "next/navigation";

export default function UserRecordInfoSingle() {
  const router = useRouter();
  return (
    <div className="row-span-5 grid grid-rows-6">
      <div className="row-span-1 grid grid-cols-3">
        <div className="col-span-1 border border-black">시드머니</div>
        <div className="col-span-1 border border-black">수익</div>
        <div className="col-span-1 border border-black">수익률</div>
      </div>
      <div
        className="row-span-5 grid grid-rows-6"
        onClick={() => {
          router.push("1/single/1");
        }}
      >
        <div className="row-span-1">2024년2월29일</div>
        <div className="row-span-1 grid grid-cols-3">
          <div className="col-span-1">500,000,000원</div>
          <div className="col-span-1">333,222,111원</div>
          <div className="col-span-1">+42.22%</div>
        </div>
        <div className="row-span-1 grid grid-cols-3">
          <div className="col-span-1">500,000,000원</div>
          <div className="col-span-1">333,222,111원</div>
          <div className="col-span-1">+42.22%</div>
        </div>
        <div className="row-span-1">2024년2월28일</div>
        <div className="row-span-1 grid grid-cols-3">
          <div className="col-span-1">500,000,000원</div>
          <div className="col-span-1">333,222,111원</div>
          <div className="col-span-1">+42.22%</div>
        </div>
        <div className="row-span-1 grid grid-cols-3">
          <div className="col-span-1">500,000,000원</div>
          <div className="col-span-1">333,222,111원</div>
          <div className="col-span-1">+42.22%</div>
        </div>
      </div>
    </div>
  );
}
