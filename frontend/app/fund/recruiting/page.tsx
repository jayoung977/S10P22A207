import Image from "next/image";
import styles from "./page.module.css";
import Navbar from "@/app/Navbar";

export default function page() {
  return (
    <div className="grid grid-rows-12 h-screen">
      <Navbar></Navbar>
      모집중이에용
    </div>
  );
}
