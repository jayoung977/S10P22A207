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
            className="hover:text-small-6 text-textColor-2 bg-small-6 text-gray-900 border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
            onClick={() => {
              setToggleButton("single");
            }}
          >
            싱글기록
          </button>
        </div>
        <div className="flex items-center justify-center col-span-1">
          <button
            className="hover:text-small-4 text-textColor-2 bg-small-4 text-gray-900 border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
            onClick={() => {
              setToggleButton("multi");
            }}
          >
            멀티기록
          </button>
        </div>
        <div className="flex items-center justify-center col-span-1">
          <button
            className="hover:text-small-10 text-textColor-2 bg-small-10 text-gray-900 border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
            onClick={() => {
              setToggleButton("fund");
            }}
          >
            펀드
          </button>
        </div>
        <div className="flex items-center justify-center col-span-1">
          <button
            className="hover:text-small-5 text-textColor-2 bg-small-5 text-gray-900 border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
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
