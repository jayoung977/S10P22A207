"use client";
import { useEffect, useState } from "react";
import quizStore from "@/public/src/stores/quiz/quizStore";
import Router from "next/router";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import axios from "axios";
import { useQuery, UseQueryResult } from "react-query";
import userStore from "@/public/src/stores/user/userStore";
import useClickSound from "@/public/src/components/clickSound/DefaultClick";

interface resultType {
  id: number;
  title: string;
  selections: string[];
  answer: number;
}

interface QuizInfo {
  result: resultType[];
}

export default function QuizProblem() {
  const router = useRouter();
  const playClickSound = useClickSound();

  const fetchShowMeTheMoney = async () => {
    const response = await axios({
      url: `https://j10a207.p.ssafy.io/api/quiz/update`,
      method: "put",
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
      },
    });
    console.log(response.data);
    return response;
  };

  const { page, setPage, setSuccess, success } = quizStore();
  useEffect(() => {
    setPage(0);
    setSuccess(0);
  }, []);
  const { asset } = userStore();
  const fetchQuizData = async () => {
    const response = await axios({
      method: "get",
      url: "https://j10a207.p.ssafy.io/api/quiz",
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
      },
    });
    console.log(response.data.result);
    return response.data;
  };

  const { data, isLoading, error }: UseQueryResult<QuizInfo, Error> = useQuery(
    "quizInfo",
    fetchQuizData
  );

  if (isLoading) {
    return <div className="rainbow"></div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const { result }: { result: resultType[] | null } = data
    ? data
    : { result: null };

  function handleClickProblem(num: number): any {
    playClickSound();
    if (page < 4) {
      if (result != null && num == result[page].answer) {
        Swal.fire({
          title: "정답입니다!",
          text: `${result[page].selections[num - 1]}(은/는) 정답입니다.`,
          icon: "success",
          confirmButtonText: "확인",
        }).then((result) => {
          if (result.isConfirmed) {
            setPage(page + 1);
            setSuccess(success + 1);
          }
        });
      } else {
        Swal.fire({
          title: "오답입니다!",
          text: `정답은 ${
            result != null && result[page]?.selections[result[page]?.answer - 1]
          } 입니다.`,
          icon: "error",
          confirmButtonText: "확인",
        }).then((result) => {
          if (result.isConfirmed) {
            setPage(page + 1);
          }
        });
      }
    } else {
      if (result != null && num == result[page].answer) {
        setSuccess(success + 1);
        if (success >= 2) {
          Swal.fire({
            title: "축하합니다!",
            text: `정답입니다! 3문제 이상 맞추셨습니다! ${
              asset != null && asset <= 5000000
                ? `100만원의 상금이 지급됩니다!`
                : ``
            }`,
            icon: "success",
            confirmButtonText: "확인",
          }).then((result) => {
            if (result.isConfirmed) {
              fetchShowMeTheMoney();
              router.push("/multi");
            }
          });
        } else {
          Swal.fire({
            title: "저런!",
            text: "정답입니다! 안타깝게도 3문제 이상 못 맞추셨습니다!",
            icon: "error",
            confirmButtonText: "확인",
          }).then((result) => {
            if (result.isConfirmed) {
              router.push("/multi");
            }
          });
        }
      } else {
        if (success >= 3) {
          Swal.fire({
            title: "축하합니다!",
            text: `3문제 이상 맞추셨습니다! ${
              asset != null && asset <= 5000000
                ? `100만원의 상금이 지급됩니다!`
                : ``
            }`,
            icon: "success",
            confirmButtonText: "확인",
          }).then((result) => {
            if (result.isConfirmed) {
              fetchShowMeTheMoney();
              router.push("/multi");
            }
          });
        } else {
          Swal.fire({
            title: "저런!",
            text: "3문제 이상 못 맞추셨습니다!",
            icon: "error",
            confirmButtonText: "확인",
          }).then((result) => {
            if (result.isConfirmed) {
              router.push("/multi");
            }
          });
        }
      }
    }
  }
  return (
    <div className="row-span-10 grid grid-rows-12">
      <div className="row-span-12 grid grid-cols-12 ">
        <div className="col-start-4 col-end-10 grid grid-rows-12 bg-white shadow">
          <div className="row-start-1 row-end-3 flex items-center justify-center text-4xl p-4 text-center">
            {page + 1}. {result && result[page].title}
          </div>
          <div className="row-start-3 row-end-11 grid grid-row-8 items-center ">
            <div
              className="row-span-2 hover:cursor-pointer flex justify-center hover:scale-105 ease-in-out duration-500 text-2xl "
              onClick={() => {
                handleClickProblem(1);
              }}
            >
              1. {result != null && result[page].selections[0]}
            </div>
            <div
              className="row-span-2 hover:cursor-pointer flex justify-center hover:scale-105 ease-in-out duration-500 text-2xl"
              onClick={() => {
                handleClickProblem(2);
              }}
            >
              2. {result != null && result[page].selections[1]}
            </div>
            <div
              className="row-span-2 hover:cursor-pointer flex justify-center hover:scale-105 ease-in-out duration-500 text-2xl"
              onClick={() => {
                handleClickProblem(3);
              }}
            >
              3. {result != null && result[page].selections[2]}
            </div>
            <div
              className="row-span-2 hover:cursor-pointer flex justify-center hover:scale-105 ease-in-out duration-500 text-2xl"
              onClick={() => {
                handleClickProblem(4);
              }}
            >
              4. {result != null && result[page].selections[3]}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
