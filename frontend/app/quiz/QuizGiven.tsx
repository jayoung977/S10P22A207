"use client";
import QuizProblem from "./QuizProblem";
import QuizNow from "./QuizNow";
import { useState } from "react";
export default function QuizGiven() {
  return (
    <div className="row-start-2 row-end-13 grid grid-rows-12">
      <div className="row-span-1 text-4xl grid grid-cols-12">
        <div className="col-start-4 col-end-10  bg-small-6 border-4 border-small-6 text-textColor-2 flex justify-center items-center rounded-t-md">
          오늘의 Quiz
        </div>
      </div>
      <QuizProblem></QuizProblem>
      <QuizNow />
    </div>
  );
}
