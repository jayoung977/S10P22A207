import ProfileImage from "@/public/src/assets/images/penguin.png";
import TierImage from "@/public/src/assets/images/bronze.png";
import Image from "next/image";
import userStore from "@/public/src/stores/user/userStore";

export default function Profile() {
  const { nickname, rankPoint, win, lose, asset, multiAvgRoi } = userStore();
  return (
    <div className="col-span-4 bg-background-1 rounded-md grid grid-rows-5 gap-2 shadow-md m-2">
      {/* 프로필 상단 */}
      <div className="row-span-3 bg-big-1 m-1 grid grid-cols-6">
        <div className="col-span-3 border grid grid-rows-4 justify-items-center">
          <div className="row-span-3 m-2">
            <Image
              src={ProfileImage}
              alt="Profile-image"
              width={60}
              height={60}
            />
          </div>
          <div className="row-span-1">{nickname}</div>
        </div>
        <div className="col-span-3 border grid grid-rows-4 justify-items-center">
          <div className="row-span-3 m-2">
            <Image src={TierImage} alt="Tier-image" width={60} height={60} />
          </div>
          <div className="row-span-1">{rankPoint != null ? rankPoint : `브론즈`}</div>
        </div>
      </div>
      {/* 프로필 하단 */}
      <div className="row-span-2 bg-small-1 rounded-md p-1 text-textColor-2 text-center grid grid-cols-8">
        <div className="col-span-8">
          {win != null ? win : 0}승 {lose != null ? lose : 0} 패 (
          {win != null && lose != null
            ? win + lose > 0
              ? (win / (win + lose)) * 100
              : 0
            : 0}
          %)
        </div>
        <div className="col-span-4">
          <div>시드머니</div>
          <div>평균수익률</div>
        </div>
        <div className="col-span-4">
          <div>{asset}원</div>
          <div>+{multiAvgRoi != null ? multiAvgRoi : 0}%</div>
        </div>
      </div>
    </div>
  );
}
