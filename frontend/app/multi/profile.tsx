import TierImage from "@/public/src/assets/images/Tier/diamond.png";
import Image from "next/image";
import userStore from "@/public/src/stores/user/userStore";
import useGetProfileImage from "@/public/src/hooks/useGetProfileImage";
import useGetProfileRank from "@/public/src/hooks/useGetProfileRank";

export default function Profile() {
  const { nickname, rankPoint, win, lose, asset, singleAvgRoi } = userStore();
  return (
    <div className="col-span-4 bg-background-1 rounded-md grid grid-rows-5 gap-2 shadow-md m-2">
      {/* 프로필 상단 */}
      <div className="row-span-3 bg-big-1 m-1 grid grid-cols-6">
        <div className="col-span-3 border grid grid-rows-4 justify-center items-center">
          <div className="row-span-3 m-2 w-full">
            <Image
              src={useGetProfileImage(asset)}
              alt="Profile-image"
              width={70}
            />
          </div>
          <div className="row-span-1 flex justify-center items-center">
            {nickname}
          </div>
        </div>
        <div className="col-span-3 border grid grid-rows-4 justify-center items-center">
          <div className="row-span-3 m-2">
            <Image
              src={useGetProfileRank(rankPoint)}
              alt="Tier-image"
              width={70}
            />
          </div>
          <div className="flex row-span-1 justify-center items-center">
            {rankPoint != null ? rankPoint : ``}
          </div>
        </div>
      </div>
      {/* 프로필 하단 */}
      <div className="row-span-2 bg-small-1 rounded-md p-1 text-textColor-2 text-center grid grid-cols-8">
        <div className="col-span-8">
          {win != null ? win : 0}승 {lose != null ? lose : 0} 패 (
          {win != null && lose != null
            ? win + lose > 0
              ? ((win / (win + lose)) * 100).toFixed(1)
              : 0
            : 0}
          %)
        </div>
        <div className="col-span-4">
          <div>시드머니</div>
          <div>평균수익률</div>
        </div>
        <div className="col-span-4">
          <div>{asset?.toLocaleString()}원</div>
          <div>{singleAvgRoi != null ? singleAvgRoi.toFixed(1) : 0}%</div>
        </div>
      </div>
    </div>
  );
}
