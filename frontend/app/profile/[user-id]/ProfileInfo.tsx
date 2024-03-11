import Image from "next/image";
import styles from "./page.module.css";
import UserRecord from "./ProfileRecord";
import bronze from "../../../public/src/assets/images/bronze.png";

export default function UserInfo() {
  return (
    <div className="row-start-2 row-end-13 border border-black grid grid-cols-10">
      <aside className="col-start-1 col-end-4 border border-black grid grid-rows-12">
        <div className="row-start-1 row-end-5  flex justify-center items-center">
          펭귄
        </div>
        <div className="row-start-5 row-end-9 flex justify-center items-center">
          <Image
            className="rounded w-40 h-50"
            src={bronze}
            alt="Extra large avatar"
            width={500}
            height={500}
          ></Image>
        </div>
        <div className="row-start-9 row-end-13 flex justify-center items-center">다이아 4</div>
      </aside>
      <UserRecord></UserRecord>
    </div>
  );
}
