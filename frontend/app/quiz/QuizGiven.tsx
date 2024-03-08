import QuizProblem from "./QuizProblem"
import QuizNow from './QuizNow';
export default function QuizGiven () {

    return (
        <div className="row-start-2 row-end-13 grid grid-rows-11">
            <div className="row-span-2 flex items-center justify-center text-5xl">
                오늘의 Quiz
            </div>
            <QuizProblem />
            <QuizNow />
        </div>
    )
}