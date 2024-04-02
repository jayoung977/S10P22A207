"use client";
import axios from "axios";
import { useQuery, UseQueryResult } from "react-query";
import { useRouter } from "next/navigation";
import userStore from "@/public/src/stores/user/userStore";
import socketStore from "@/public/src/stores/websocket/socketStore";
interface IsSignUpInfo {
  result: [string];
}
export default function IsSignUpInfo() {
  const fetchIsSignUp = async () => {
    const currentUrl = window.location.href;
    const urlParams = new URLSearchParams(currentUrl.split("?")[1]);
    const accessToken = urlParams.get("access-token");
    const refreshToken = urlParams.get("refresh-token");
    if (refreshToken) {
      document.cookie = `refreshToken=${refreshToken}; path=/`;
    }
    if (accessToken) {
      sessionStorage.setItem("accessToken", accessToken);
    }
    const response = await axios({
      method: "get",
      url: `https://j10a207.p.ssafy.io/api/member/privilege/check`,
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
      },
    });
    return response.data;
  };

  const { data, isLoading, error }: UseQueryResult<IsSignUpInfo, Error> =
    useQuery("signUpInfo", fetchIsSignUp);
  if (isLoading) {
    return <div className="rainbow"></div>;
  }
  if (error) {
    return <div>Error: {error.message}</div>;
  }
  const { result }: { result: [string] | null } = data
    ? data
    : { result: null };

  const router = useRouter();

  const fetchLoginData = async () => {
    try {
      const response = await axios({
        method: "get",
        url: "https://j10a207.p.ssafy.io/api/alarm/login",
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

  if (result && result[0] === "USER") {
    window.location.href = "/multi";
    // 여기서 get 요청 한번 보내기
    fetchLoginData();
  } else {
    router.push("login/signup");
  }
  return <div className="rainbow"></div>;
}
