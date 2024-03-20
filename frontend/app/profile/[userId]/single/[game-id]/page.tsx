import Image from "next/image";
import styles from "./page.module.css";
import Navbar from "@/app/Navbar";
import SingleTradeHistory from "./ReviewSingleTradeHistory";
import SingleChart from "./ReviewSingleChart";
import SingleStockTicker from "./ReviewSingleStockTicker";
import SingleRanking from "./ReviewSingleRanking";
import PeacefulBgm from "@/public/src/components/PeacefulBgm";
export default function page() {
  return (
    <div className=" grid grid-rows-12 h-screen">
      <PeacefulBgm></PeacefulBgm>
      <Navbar></Navbar>
      <header className="flex justify-end items-center row-span-2 shadow bg-background-1">
        <div className="text-6xl m-4 text-textColor-1">삼성전자</div>
      </header>
      <main className=" row-span-10 grid grid-cols-12 bg-background-1">
        <SingleTradeHistory></SingleTradeHistory>
        <SingleChart></SingleChart>
        <div className="col-span-3 grid grid-rows-12">
          <SingleStockTicker></SingleStockTicker>
          <SingleRanking></SingleRanking>
        </div>
      </main>
    </div>
  );
}
