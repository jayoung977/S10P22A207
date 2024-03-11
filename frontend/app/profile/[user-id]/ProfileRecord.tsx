import UserRecordInfo from "./ProfileRecordInfo";
import Image from "next/image";
import penguin from "../../../public/src/assets/images/penguin.png";

export default function UserRecord() {
  return (
    <div className="col-start-4 col-end-11 grid grid-rows-12">
      <div className="row-start-1 row-end-4 grid grid-cols-12">
        <div className="col-start-1 col-end-5 flex justify-center items-center">
          <Image
            className="rounded w-32 h-32"
            src={penguin}
            alt="Extra large avatar"
            width={100}
            height={100}
          ></Image>
        </div>
        <div className="col-start-5 col-end-13 grid grid-rows-12">
          <div className="row-start-1 row-end-6 flex items-center grid grid-cols-4">
            <div className="col-span-1">2,345,654,321원</div>
            <div className="col-span-1">1승 300패</div>
            <div className="col-span-1">0.3%</div>
            <div className="col-span-1">+10.1%</div>
          </div>
          <div className="row-start-6 row-end-13 flex items-center grid grid-cols-4">
            <div className="col-span-1">시드머니</div>
            <div className="col-span-1">전적</div>
            <div className="col-span-1">승률</div>
            <div className="col-span-1">평균 수익률</div>
          </div>
        </div>
      </div>
      <UserRecordInfo></UserRecordInfo>
    </div>
  );
}
