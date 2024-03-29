import SingleReviewStore from "@/public/src/stores/profile/SingleReviewStore";
export default function SingleRanking() {
  const { selectedIndex, rankMemberList } = SingleReviewStore();
  return (
    <div className="row-span-4 grid grid-rows-12 bg-slate-500 rounded-md m-1">
      <div className="text-textColor-2">랭킹 유저들</div>
    </div>

  );
}

// {memberId: 3, nickname: 'hide on bush', singleGameStockId: 993, roi: 25.36378334680679}