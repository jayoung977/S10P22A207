import Image from "next/image";
import penguin from "./../../public/src/assets/images/penguin.png";
import { useMutation, useQueryClient } from "react-query";
import axios, { AxiosResponse } from "axios";
import { useState } from "react";
import userStore from "@/public/src/stores/user/userStore";
import useFetchUserInfo from "@/public/src/hooks/useFetchUserInfo";
import Swal from "sweetalert2";

interface RequestType {
  content: string;
}

export default function BoardSend() {
  useFetchUserInfo();
  const { memberId } = userStore();
  const sendBoard = async (
    request: RequestType
  ): Promise<AxiosResponse<any>> => {
    const response = await axios({
      method: "post",
      url: `https://j10a207.p.ssafy.io/api/community/write?loginUserId=${memberId}`,
      data: request,
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
      },
    });
    return response;
  };

  const queryClient = useQueryClient();
  const mutation = useMutation<AxiosResponse<any>, Error, RequestType>(
    sendBoard,
    {
      onSuccess: () => {
        queryClient.invalidateQueries("boardInfo");
        Swal.fire("성공!", "게시물이 성공적으로 작성되었습니다.", "success");
      },
      onError: (error: any) => {
        console.error("에러발생", error.response?.data || error.message);
      },
      onSettled: () => {
        setContent("");
      },
    }
  );

  const [content, setContent] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const request = { content };
    mutation.mutate(request);
  };

  return (
    <div className="flex justify-center items-center row-span-5 grid grid-cols-12 rounded-md ">
      <div className="col-start-4">
        <Image
          className="w-24 h-24 p-1 rounded-full ring-2 ring-gray-300 dark:ring-gray-500"
          src={penguin}
          alt="Extra large avatar"
          width={100}
          height={100}
        ></Image>
      </div>
      <div className="col-start-5 col-end-10 rounded-lg m-2">
        <form onSubmit={handleSubmit}>
          <label htmlFor="chat" className="sr-only">
            Your message
          </label>
          <div className="flex items-center p-4 rounded-lg shadow dark:bg-gray-700">
            <button
              type="button"
              className="inline-flex justify-center p-2 text-gray-500 rounded-lg cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
            >
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 18"
              >
                <path
                  fill="currentColor"
                  d="M13 5.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0ZM7.565 7.423 4.5 14h11.518l-2.516-3.71L11 13 7.565 7.423Z"
                />
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M18 1H2a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1Z"
                />
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 5.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0ZM7.565 7.423 4.5 14h11.518l-2.516-3.71L11 13 7.565 7.423Z"
                />
              </svg>
              <span className="sr-only">Upload image</span>
            </button>
            <button
              type="button"
              className="p-2 text-gray-500 rounded-lg cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
            >
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13.408 7.5h.01m-6.876 0h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM4.6 11a5.5 5.5 0 0 0 10.81 0H4.6Z"
                />
              </svg>
              <span className="sr-only">Add emoji</span>
            </button>
            <textarea
              id="chat"
              rows={5}
              className="block mx-4 p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Your message..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
            ></textarea>
            <button
              type="submit"
              className="inline-flex justify-center p-2 text-blue-600 rounded-full cursor-pointer hover:bg-blue-100 dark:text-blue-500 dark:hover:bg-gray-600"
            >
              <svg
                className="w-5 h-5 rotate-90 rtl:-rotate-90"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 18 20"
              >
                <path d="m17.914 18.594-8-18a1 1 0 0 0-1.828 0l-8 18a1 1 0 0 0 1.157 1.376L8 18.281V9a1 1 0 0 1 2 0v9.281l6.758 1.689a1 1 0 0 0 1.156-1.376Z" />
              </svg>
              <span className="sr-only">Send message</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
