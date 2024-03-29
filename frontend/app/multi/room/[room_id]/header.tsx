"use client";
import { useRouter } from "next/navigation";
import Image from "next/image";
import penguin from "@/public/src/assets/images/penguin.png";
import axios from "axios";


export default function Header() {
  const router = useRouter();

  function handleGameStart () {
    // axios({
    //   method: 'post',
    //   url: 
    // })
    // .then((res)=> {
    //   console.log(res.data)
    // })
    router.push('room/1/play')
  }
  return (
    <header className="row-span-1 grid grid-cols-12 border items-center gap-2">
      <div className="col-start-2 col-end-3 flex items-center">
        <div className="flex gap-2 items-center">
          <Image
            src={penguin}
            alt="Logo"
            className="h-8"
            width={32}
            height={32}
          />
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            지금이니
          </span>
        </div>
      </div>
      <div className="col-span-8 flex justify-center font-bold text-xl">
        <div>이겨보시던지</div>
      </div>
      <div className="col-span-2 flex justify-center gap-4">
        <button
          className="border p-2 rounded-md bg-red-500 text-white hover:bg-red-400"
          onClick={() => {
            handleGameStart();
          }}
        >
          시작하기
        </button>
        <button
          onClick={() => {
            router.back();
          }}
          className="border p-2 rounded-md border-red-500 hover:bg-red-100 hover:border-2"
        >
          나가기
        </button>
      </div>
    </header>
  );
}
