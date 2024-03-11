import Image from "next/image";
import styles from "./page.module.css";
import Navbar from "@/app/Navbar";
import MultiTradeHistroy from "./ReviewMultiTradeHistory";
import MultiRanking from "./ReviewMultiRanking";
import MultiChart from "./ReviewMultiChart";
export default function page() {
  return (
    <div className="border border-black grid grid-rows-12 h-screen">
      <Navbar></Navbar>
      <header className="row-span-2 border border-black">
        <div>삼성전자</div>
      </header>
      <main className="border border-black row-span-10 grid grid-cols-12">
        <div className="p-4 col-start-2 col-end-5 grid grid-rows-12">
          <MultiTradeHistroy></MultiTradeHistroy>
          <MultiRanking></MultiRanking>
        </div>
        <MultiChart></MultiChart>
      </main>
    </div>
  );
}
