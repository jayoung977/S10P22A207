import Image from "next/image";
import styles from "./page.module.css";
import UserInfo from "./ProfileInfo";
import Navbar from "@/app/Navbar";

export default function page() {
  return (
    <div className="grid grid-rows-12 h-screen">
      <Navbar></Navbar>
      <UserInfo></UserInfo>
    </div>
  );
}
