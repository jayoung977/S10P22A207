// 퀴즈 페이지
import Navbar from '@/app/Navbar';
import QuizGiven from './QuizGiven';
export default function Quiz () {
    return (
        <div className="grid grid-rows-12 h-screen">
            <Navbar />
            <QuizGiven />
        </div>
    )
}