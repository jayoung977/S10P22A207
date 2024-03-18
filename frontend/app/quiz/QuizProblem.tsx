"use client";
import { useEffect, useState } from "react";
import quizStore from "@/public/src/stores/quiz/quizStore";
import Router from "next/router";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

export default function QuizProblem() {
  const router = useRouter();
  const { page, setPage, data, setSuccess, success } = quizStore();
  useEffect(() => {
    setPage(0);
    setSuccess(0);
  }, []);

  function handleClickProblem(num: number): any {
    if (page < 4) {
      if (num == data[page].answer) {
        Swal.fire({
          title: "정답입니다!",
          text: `${data[page].selections[num]}(은/는) 정답입니다.`,
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
          text: `${data[page].selections[num]}(은/는) 정답이 아닙니다.`,
          icon: "error",
          confirmButtonText: "확인",
        }).then((result) => {
          if (result.isConfirmed) {
            setPage(page + 1);
          }
        });
      }
    } else {
      if (num == data[page].answer) {
        setSuccess(success + 1);
        if (success >= 2) {
          Swal.fire({
            title: "축하합니다!",
            text: "3문제 이상 맞추셨습니다! 상금이 지급됩니다!",
            icon: "success",
            confirmButtonText: "확인",
          }).then((result) => {
            if (result.isConfirmed) {
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
      } else {
        if (success >= 3) {
          Swal.fire({
            title: "축하합니다!",
            text: "3문제 이상 맞추셨습니다! 상금이 지급됩니다!",
            icon: "success",
            confirmButtonText: "확인",
          }).then((result) => {
            if (result.isConfirmed) {
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
          <div className="row-start-1 row-end-3 flex items-center m-2 justify-center text-xl p-4 text-center">
            Q. {data[page].title}
          </div>
          <div className="row-start-3 row-end-12 grid grid-row-12 items-center m-2 ">
            <div
              className="row-span-3 hover:cursor-pointer flex justify-center hover:scale-105 ease-in-out duration-500 text-xl"
              onClick={() => {
                handleClickProblem(0);
              }}
            >
              1. {data[page].selections[0]}
            </div>
            <div
              className="row-span-3 hover:cursor-pointer flex justify-center hover:scale-105 ease-in-out duration-500 text-xl"
              onClick={() => {
                handleClickProblem(1);
              }}
            >
              2. {data[page].selections[1]}
            </div>
            <div
              className="row-span-3 hover:cursor-pointer flex justify-center hover:scale-105 ease-in-out duration-500 text-xl"
              onClick={() => {
                handleClickProblem(2);
              }}
            >
              3. {data[page].selections[2]}
            </div>
            <div
              className="row-span-3 hover:cursor-pointer flex justify-center hover:scale-105 ease-in-out duration-500 text-xl"
              onClick={() => {
                handleClickProblem(3);
              }}
            >
              4. {data[page].selections[3]}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
