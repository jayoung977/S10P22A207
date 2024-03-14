export default function TurnNow ({ turn } :{ turn : number}) {
    const percentage = (turn / 50) * 100; // 턴 수에 따른 비율 계산
    return (
        <div>
            <div className="w-full h-4 bg-small-4 rounded-r-md">
                <div className="h-full bg-small-12 rounded-r-md" style={{ width: `${percentage}%` }}></div>
            </div>
        </div>

    )
}