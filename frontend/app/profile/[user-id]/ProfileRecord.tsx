import UserRecordInfo from "./ProfileRecordInfo";
import Image from "next/image";
import penguin from "../../../public/src/assets/images/penguin.png";

export default function UserRecord() {
  return (
    <div className="col-start-4 col-end-11 grid grid-rows-12">
      <div className="shadow row-start-1 row-end-4 grid grid-cols-12">
        <div className="col-start-1 col-end-5 flex justify-center items-center">
          <Image
            className="w-32 h-32 p-1 rounded-full ring-2 ring-gray-300 dark:ring-gray-500"
            src={penguin}
            alt="Extra large avatar"
            width={100}
            height={100}
          ></Image>
        </div>
        <div className="col-start-5 col-end-13 grid grid-rows-12">
          <div className=" m-4 row-start-1 row-end-13 flex justify-center items-center grid grid-cols-4">
            <div className="flex-col justify-center items-center col-span-1">
              <div className="text-center font-extrabold text-xl">
                2,345,654,324,212
              </div>
              <div className="text-center">시드</div>
            </div>
            <div className="flex-col justify-center items-center col-span-1">
              <div className="text-center font-extrabold text-xl">
                1승 300패
              </div>
              <div className="text-center">전적</div>
            </div>
            <div className="flex-col justify-center items-center col-span-1">
              <div className="text-center font-extrabold text-xl">0.3%</div>
              <div className="text-center">승률</div>
            </div>
            <div className="flex-col justify-center items-center col-span-1">
              <div className="text-center font-extrabold text-xl">+10.1%</div>
              <div className="text-center">평균 수익률</div>
            </div>
          </div>
        </div>
      </div>
      <UserRecordInfo></UserRecordInfo>
    </div>
  );
}
