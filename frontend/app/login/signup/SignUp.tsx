"use client";
import { useEffect, useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import axios, { AxiosResponse } from "axios";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";

interface RequestType {
  nickname: string;
  birth: string;
  gender: string;
}

export default function SignUp() {
  const [gender, setGender] = useState("MAN");
  const [nickname, setNickname] = useState("");
  const [birth, setBirth] = useState("2024");
  const [isOkay, setIsOkay] = useState(true);
  const data: number[] = [];
  const router = useRouter();

  const fetchLoginData = async () => {
    try {
      const response = await axios({
        method: "get",
        url: "https://zayoung21.store/api/alarm/login",
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
        },
      });

      // 요청이 성공적으로 완료되면 여기에서 응답을 처리합니다.
      console.log(response.data);
    } catch (error) {
      // 요청이 실패하면 오류를 처리합니다.
      console.error(error);
      // 오류에 따른 추가적인 처리를 할 수 있습니다.
    }
  };

  for (let i = 1900; i <= 2024; i++) {
    data.push(i);
  }
  data.reverse();
  
  const signup = async (request: RequestType): Promise<AxiosResponse<any>> => {
    const response = await axios({
      method: "put",
      url: `https://zayoung21.store/api/member/additional-info`,
      data: request,
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
      },
    });
    if (response.data.result) {
      document.cookie = `refreshToken=${response.data.result.refreshToken}; path=/`;
    }
    if (response.data.result) {
      sessionStorage.setItem("accessToken", response.data.result.accessToken);
    }
    return response.data;
  };

  const queryClient = useQueryClient();

  const mutation = useMutation<AxiosResponse<any>, Error, RequestType>(signup, {
    onSuccess: (response) => {
      queryClient.invalidateQueries("signups");
      // get 요청 한번 보내기
      window.location.href = "/multi";
      fetchLoginData();
    },
    onError: (error: any) => {
      console.error(
        "에러가 발생했습니다.",
        error.response?.data || error.message
      );
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const request = { gender: gender, nickname: nickname, birth: birth };
    if (!isOkay) {
      mutation.mutate(request);
    } else {
      Swal.fire({
        icon: "error",
        text: "입력하신 닉네임은 이미 사용 중입니다.",
      });
    }
  };

  const nickNameCheck = async (nickname: string) => {
    const response = await axios({
      method: "get",
      url: `https://zayoung21.store/api/member/nickname/check?nickname=${nickname}`,
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
      },
    });
    setIsOkay(response.data.result);
    return response;
  };

  useEffect(() => {
    if (nickname) {
      nickNameCheck(nickname);
    }
  }, [nickname]);

  return (
    <div className="flex justify-center items-center h-screen bg-background-1">
      <form className="shadow p-10 bg-white rounded-md" onSubmit={handleSubmit}>
        <div className="mb-5">
          <label
            htmlFor="nickname"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            닉네임
          </label>
          <input
            id="nickname"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
            onChange={(e) => {
              setNickname(e.target.value);
            }}
          />
        </div>
        {isOkay || nickname.length == 0 ? (
          <div className="text-small-3">불가능한 닉네임입니다.</div>
        ) : (
          <div className="text-small-1">가능한 닉네임입니다.</div>
        )}
        <div className="flex justify-between">
          <div className="flex items-center mb-4">
            <input
              id="boy"
              type="checkbox"
              value="MAN"
              checked={gender === "MAN"}
              onChange={(e) => {
                setGender(e.target.value);
              }}
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
            <label
              htmlFor="boy"
              className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              남
            </label>
          </div>

          <div className="flex items-center mb-4">
            <input
              id="girl"
              type="checkbox"
              value="WOMAN"
              checked={gender === "WOMAN"}
              onChange={(e) => {
                setGender(e.target.value);
              }}
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
            <label
              htmlFor="girl"
              className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              여
            </label>
          </div>
        </div>
        <select
          id="years"
          size={5}
          value={birth}
          onChange={(e) => {
            setBirth(e.target.value);
          }}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        >
          {data.map((item, i) => {
            return <option key={i}>{item}</option>;
          })}
        </select>
        <div className="flex justify-center">
          <button
            type="submit"
            className="m-4 min-w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            회원 가입
          </button>
        </div>
      </form>
    </div>
  );
}
