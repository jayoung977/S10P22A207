
import UserRecordInfo from "./ProfileRecordInfo";

export default function UserRecord() {
  return (
    <div className="col-start-4 col-end-11 border border-black grid grid-rows-12">
      <div className="row-start-1 row-end-4 border border-black grid grid-cols-12">
        <div className="col-start-1 col-end-5 border border-black">
          프로필사진
        </div>
        <div className="col-start-5 col-end-13 grid grid-rows-12">
          <div className="row-start-1 row-end-6 border border-black grid grid-cols-4">
            <div className="col-span-1">2,345,654,321원</div>
            <div className="col-span-1">1승 300패</div>
            <div className="col-span-1">0.3%</div>
            <div className="col-span-1">+10.1%</div>
          </div>
          <div className="row-start-6 row-end-13 border border-black grid grid-cols-4">
            <div className="col-span-1">시드머니</div>
            <div className="col-span-1">전적</div>
            <div className="col-span-1">승률</div>
            <div className="col-span-1">평균 수익률</div>
          </div>
        </div>
      </div>
      <UserRecordInfo></UserRecordInfo>
    </div>
  );
}
