import BoardReceive from "./BoardRecieve";
import BoardSend from "./BoardSend";
export default function BoardList() {
  return (
    <div className="row-span-11 grid grid-rows-11 bg-background-1">
      <div className="row-span-11 grid grid-cols-12 ">
        <div className="col-start-1 col-end-13 grid grid-rows-12 bg-white p-4 rounded-lg m-5">
          <BoardSend></BoardSend>
          <div className="row-span-7">
            <BoardReceive></BoardReceive>
          </div>
        </div>
      </div>
    </div>
  );
}
