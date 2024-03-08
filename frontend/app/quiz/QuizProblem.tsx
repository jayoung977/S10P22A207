'use client'
import { useState } from 'react';

function IsCorrectModal({ isOpen, onClose, result } :any) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 ">
            <div className="text-center bg-blue-400 rounded-lg shadow-lg grid grid-rows-6" style={{ width: '500px', height: '300px' }}>
                {
                    result ? (
                        <div className="row-start-1 row-end-5 grid grid-rows-4">
                            <div className="row-span-2 flex items-center justify-center">정답입니다!</div>
                            <div className="row-span-2 grid grid-rows-2">
                                <div>누적 시드머니</div>
                                <div>XXXXX  OOOO</div>
                            </div>
                        </div>
                    ) : (
                        <div className="row-start-1 row-end-5">틀렸습니다....</div>
                    )
                }
                
                <div className="row-start-5 row-end-7">
                    <button onClick={() => {onClose()}} className="rounded-full text-white bg-gray-500">나가기</button>
                </div>
            </div>
        </div>
    )
}

export default function QuizProblem () {
    const [isOpen, setIsOpen] = useState(false);
    const [result, setResult] = useState(false);

    function handleClickProblem (num :number) :any {
        if (num == 1) {
            setResult(true);
            setIsOpen(true);
        } else {
            setResult(false);
            setIsOpen(true);
        }
    }
    return (
        <div className="row-span-9 grid grid-rows-12 border border-black">
            <div className="row-span-10 grid grid-cols-12 border border-black">
                <div className="col-start-4 col-end-10 grid grid-rows-12 border border-black ">
                    <div className="row-start-1 row-end-3 flex items-center m-2 border border-black">Q. 문제</div>
                    <div className="row-start-3 row-end-13 grid grid-row-12 items-center m-2 border border-black">
                        <div className="row-span-3 border border-black" onClick={() => {handleClickProblem(1)}}>1. ~~~~~~~~~~~</div>
                        <div className="row-span-3 border border-black" onClick={() => {handleClickProblem(2)}}>2. ~~~~~~~~~~~</div>
                        <div className="row-span-3 border border-black" onClick={() => {handleClickProblem(3)}}>3. ~~~~~~~~~~~</div>
                        <div className="row-span-3 border border-black" onClick={() => {handleClickProblem(4)}}>4. ~~~~~~~~~~~</div>
                    </div>
                </div>
            </div>
            <IsCorrectModal isOpen={isOpen} onClose={() => {setIsOpen(false)}} result={result}/>
        </div>
    )
}