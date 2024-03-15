import Navbar from "@/app/Navbar";
import BoardList from "./BoardList";
import PeacefulBgm from "@/public/src/components/PeacefulBgm";
export default function Board() {
  return (
    <div className="grid grid-rows-12 h-screen">
      <PeacefulBgm></PeacefulBgm>
      <Navbar />
      <BoardList />
    </div>
  );
}
