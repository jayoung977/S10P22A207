import Image from "next/image";
import styles from "./page.module.css";
import UserRecord from "./ProfileRecord";

export default function UserInfo() {
  return (
    <div className="row-start-2 row-end-13 border border-black grid grid-cols-10">
      <aside className="col-start-1 col-end-4 border border-black grid grid-rows-12">
        <div className="row-start-1 row-end-5 border border-black">닉네임</div>
        <div className="row-start-5 row-end-9 border border-black">
          티어이미지
        </div>
        <div className="row-start-9 row-end-13 border border-black">티어명</div>
      </aside>
      <UserRecord></UserRecord>
    </div>
  );
}
