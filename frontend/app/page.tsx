import Image from "next/image";
import styles from "./page.module.css";
import KakaoLogin from "./KakaoLogin";
export default function Home() {
  return (
    <div className="grid grid-rows-12 h-screen">
      <header className="row-start-1 row-end-2 border border-black">
        홈페이지에용
      </header>
      <main className="row-start-2 row-end-12 border border-black">
        <KakaoLogin></KakaoLogin>주 내용
      </main>
      <footer className="row-start-12 row-end-13 border border-black">
        푸터
      </footer>
    </div>
  );
}
