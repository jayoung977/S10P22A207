import Image from "next/image";
import styles from "./page.module.css";
import Navbar from "@/app/Navbar";
import MultiTradeHistroy from "./ReviewMultiTradeHistory";
import MultiRanking from "./ReviewMultiRanking";
import MultiChart from "./ReviewMultiChart";
export default function page() {
  return (
    <div className=" grid grid-rows-12 h-screen">
      <Navbar></Navbar>
      <header className="flex justify-end items-center row-span-2 bg-background-1">
        <div className="text-6xl m-4 text-textColor-1">삼성전자</div>
      </header>
      <main className=" row-span-10 grid grid-cols-12 bg-background-1 ">
        <div className="p-4 col-start-2 col-end-5 grid grid-rows-12">
          <MultiTradeHistroy></MultiTradeHistroy>
          <MultiRanking></MultiRanking>
        </div>
        <MultiChart></MultiChart>
      </main>
    </div>
  );
}
