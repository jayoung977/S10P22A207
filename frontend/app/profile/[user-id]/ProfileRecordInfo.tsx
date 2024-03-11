"use client";
import UserRecordInfoBoard from "./ProfileRecordInfoBoard";
import UserRecordInfoFund from "./ProfileRecordInfoFund";
import UserRecordInfoSingle from "./ProfileRecordInfoSingle";
import UserRecordInfoMulti from "./ProfileRecordInfoMulti";
import profileStore from "@/public/src/stores/profile/profileStore";

export default function UserRecordInfo() {
  const { toggleButton, setToggleButton } = profileStore();
  return (
    <div className="row-start-4 row-end-13 grid grid-rows-6">
      <div className="row-span-1 grid grid-cols-4">
        <div className="flex items-center justify-center col-span-1">
          <button
            onClick={() => {
              setToggleButton("single");
            }}
          >
            싱글기록
          </button>
        </div>
        <div className="flex items-center justify-center col-span-1">
          <button
            onClick={() => {
              setToggleButton("multi");
            }}
          >
            멀티기록
          </button>
        </div>
        <div className="flex items-center justify-center col-span-1">
          <button
            onClick={() => {
              setToggleButton("fund");
            }}
          >
            펀드
          </button>
        </div>
        <div className="flex items-center justify-center col-span-1">
          <button
            onClick={() => {
              setToggleButton("board");
            }}
          >
            게시글
          </button>
        </div>
      </div>
      {toggleButton === "single" && (
        <UserRecordInfoSingle></UserRecordInfoSingle>
      )}
      {toggleButton === "multi" && <UserRecordInfoMulti></UserRecordInfoMulti>}
      {toggleButton === "fund" && <UserRecordInfoFund></UserRecordInfoFund>}
      {toggleButton === "board" && <UserRecordInfoBoard></UserRecordInfoBoard>}
    </div>
  );
}
