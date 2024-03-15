import Image from "next/image";
import styles from "./page.module.css";
import UserInfo from "./ProfileInfo";
import Navbar from "@/app/Navbar";
import { BackgroundBoxesDemo } from "@/app/Background-Boxes";
import PeacefulBgm from "@/public/src/components/PeacefulBgm";
export default function page() {
  return (
    <div className="grid grid-rows-12 h-screen">
      <PeacefulBgm></PeacefulBgm>
      <Navbar></Navbar>
      <UserInfo></UserInfo>
    </div>
  );
}
