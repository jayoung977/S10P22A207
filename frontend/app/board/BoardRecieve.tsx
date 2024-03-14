"use client";
import Image from "next/image";
import penguin from "./../../public/src/assets/images/penguin.png";
import Swal from "sweetalert2";
export default function BoardReceive() {
  const data = [
    { name: "민구", content: "내용" },
    { name: "원형", content: "내용" },
    { name: "제현", content: "내용" },
    { name: "창효", content: "내용" },
    { name: "자앙", content: "내용" },
  ];
  const handleDelete = (): void => {
    Swal.fire({
      title: "정말로 삭제하시겠습니까?",
      text: "이 작업은 되돌릴 수 없습니다!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "삭제하기",
      cancelButtonText: "삭제안하기",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("삭제됨!", "성공적으로 삭제되었습니다.", "success");
      }
    });
  };
  return (
    <div style={{ maxHeight: "40vh" }} className="overflow-auto">
      {data.map((item, i) => {
        return (
          <div key={i}>
            <div className=" grid grid-cols-12">
              <div className="col-start-4 col-end-9 min-h-40 rounded-md bg-small-14 m-2 w-200 h-100 shadow-lg hover:-translate-y-1 transition ease-in-out duration-500">
                <div className="m-4 grid-rows-4">
                  <div className="flex justify-between">
                    <div className="px-2 bg-white rounded-md">{item.name}</div>
                    <div
                      className="px-2 bg-white rounded-md hover:cursor-pointer"
                      onClick={() => handleDelete()}
                    >
                      삭제
                    </div>
                  </div>
                  <div className="my-2 py-2 min-h-40 bg-white rounded-md">
                    <div className="m-4">{item.content}</div>
                  </div>
                </div>
              </div>
              <div className="flex justify-center items-center">
                <Image
                  className="w-24 h-24 p-1 rounded-full ring-2 ring-gray-300 dark:ring-gray-500"
                  src={penguin}
                  alt="Extra large avatar"
                  width={100}
                  height={100}
                ></Image>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
