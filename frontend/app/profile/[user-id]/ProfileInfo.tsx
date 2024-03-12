import Image from "next/image";
import styles from "./page.module.css";
import UserRecord from "./ProfileRecord";
import bronze from "../../../public/src/assets/images/bronze.png";

export default function UserInfo() {
  return (
    <div className="row-start-2 row-end-13 grid grid-cols-10">
      <aside className="shadow col-start-1 col-end-4 grid grid-rows-12">
        <div className="text-6xl text-gray-900 dark:text-white row-start-1 row-end-5  flex justify-center items-center">
          펭귄
          <button
            type="button"
            className="absolute left-50 top-60 text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
          >
            언팔로우
          </button>
        </div>
        <div className="row-start-5 row-end-9 flex justify-center items-center">
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
