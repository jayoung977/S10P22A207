import Image from "next/image";
import styles from "./page.module.css";
import KakaoLogin from "./KakaoLogin";
import { BackgroundBoxesDemo } from "./Background-Boxes";

export default function Home() {
  return (
    <div>
      <KakaoLogin></KakaoLogin>
    </div>
  );
}
