import Image from "next/image";
import styles from "./page.module.css";
import Navbar from "@/app/Navbar";
import SingleTradeHistory from "./ReviewSingleTradeHistory";
import SingleChart from "./ReviewSingleChart";
import SingleStockTicker from "./ReviewSingleStockTicker";
import SingleRanking from "./ReviewSingleRanking";
export default function page() {
  return (
    <div className="border border-black grid grid-rows-12 h-screen">
      <Navbar></Navbar>
      <header className="row-span-2 border border-black">
        <div className="text">삼성전자</div>
      </header>
      <main className="border border-black row-span-10 grid grid-cols-12">
        <SingleTradeHistory></SingleTradeHistory>
        <SingleChart></SingleChart>
        <div className="border border-black col-span-3 grid grid-rows-12">
          <SingleStockTicker></SingleStockTicker>
          <SingleRanking></SingleRanking>
        </div>
      </main>
    </div>
  );
}
