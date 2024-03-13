export default function TurnNow ({ turn } :{ turn : number}) {
    const percentage = (turn / 50) * 100; // 턴 수에 따른 비율 계산
    return (
        <div>
            <div className="w-full h-4 bg-small-4 mt-3 border border-small-4">
                <div className="h-full bg-small-12" style={{ width: `${percentage}%` }}></div>
            </div>
        </div>

    )
}