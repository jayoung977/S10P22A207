import Image from "next/image";
import styles from "./page.module.css";
import UserRecord from "./ProfileRecord";
import bronze from "../../../public/src/assets/images/bronze.png";

export default function UserInfo() {
  return (
    <div className="row-start-2 row-end-13 grid grid-cols-10 bg-background-1 ">
      <aside className="m-4 bg-white rounded-md col-start-1 col-end-4 grid grid-rows-12 shadow-lg hover:-translate-y-1 transition ease-in-out duration-500">
        <div className="bg-textColor-1 rounded-md row-start-1 row-end-5 flex justify-center items-center">
          <p className="text-6xl text-textColor-2  dark:text-white">펭귄</p>
          
        </div>
        <div className=" row-start-5 row-end-9 flex justify-center items-center">
          <Image
            className="rounded-full w-40 h-50"
            src={bronze}
            alt="Extra large avatar"
            width={500}
            height={500}
          ></Image>
        </div>
        <div className="row-start-9 row-end-13 flex justify-center items-center">
          브론즈 4
        </div>
      </aside>
      <UserRecord></UserRecord>
    </div>
  );
}
