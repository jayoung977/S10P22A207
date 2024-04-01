import FundGameStore from "@/public/src/stores/fund/game/FundGameStore";
export default function TurnNow () {
    const { turn } = FundGameStore();
    const percentage = (turn / 50) * 100; // 턴 수에 따른 비율 계산
    return (
        <div>
            <div className="w-full h-4 bg-small-4 rounded-md">
                <div className="h-full bg-small-12 rounded-md" style={{ width: `${percentage}%` }}></div>
            </div>
        </div>

    )
}