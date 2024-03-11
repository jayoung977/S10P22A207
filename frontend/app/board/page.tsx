import Navbar from "@/app/Navbar";
import BoardList from "./BoardList";
export default function Board () {
    return (
        <div className="grid grid-rows-12 h-screen">
            <Navbar />
            <BoardList />
        </div>
    )
}
