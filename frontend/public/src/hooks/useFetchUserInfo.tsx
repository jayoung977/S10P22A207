import { useEffect } from "react";
import axios from "axios";
import userStore from "../stores/user/userStore";

export default function useFetchUserInfo() {
  const {
    setAsset,
    setBirthYear,
    setEmail,
    setGender,
    setLose,
    setMemberId,
    setMultiAvgRoi,
    setNickname,
    setRankPoint,
    setSingleAvgRoi,
    setWin,
  } = userStore();

  useEffect(() => {
    async function fetchUserInfo() {
      try {
        const response = await axios({
          method: "get",
          url: `https://zayoung21.store/api/member`,
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
          },
        });
        setAsset(response.data.result.asset);
        setBirthYear(response.data.result.birthYear);
        setEmail(response.data.result.email);
        setGender(response.data.result.gender);
        setLose(response.data.result.lose);
        setMemberId(response.data.result.memberId);
        setMultiAvgRoi(response.data.result.multiAvgRoi);
        setNickname(response.data.result.nickname);
        setRankPoint(response.data.result.rankPoint);
        setSingleAvgRoi(response.data.result.singleAvgRoi);
        setWin(response.data.result.win);
      } catch (error) {
        console.log("에러발생", error);
        throw error;
      }
    }

    fetchUserInfo();
  }, []);
}
