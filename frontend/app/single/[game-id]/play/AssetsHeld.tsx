// 보유 자산 목록
function AssetHeld() {

    return (
        <div className="row-span-3 bg-blue-100 border-black m-1 grid grid-rows-3 rounded-lg">
            <div className="row-span-1">삼성전자</div>
            <div className="row-span-2 grid grid-rows-2">
                <div className="row-span-1 grid grid-cols-4 justify-center">
                    <div className="col-span-1 m-auto">평가 손익</div>
                    <div className="col-span-1 m-auto text-pink-300">6,574</div>
                    <div className="col-span-1 m-auto">매도 가능</div>
                    <div className="col-span-1 m-auto">10</div>
                </div>
                <div className="row-span-1 grid grid-cols-4">
                    <div className="col-span-1 m-auto">손익률</div>
                    <div className="col-span-1 m-auto text-pink-300">18.25 %</div>
                    <div className="col-span-1 m-auto">평균 단가</div>
                    <div className="col-span-1 m-auto">3,605</div>
                </div>
            </div>
        </div>
    )
}

export default function AssetsHeld () {
    return (
        <div className="row-start-2 row-end-3 grid grid-rows-6 border border-black">
            <div className="row-span-1 flex items-center border border-black pl-2">보유 자산</div>
            <div className="row-span-5 overflow-y-auto block mt-3" style={{height: 'calc(22vh)'}}>
                <AssetHeld />
                <AssetHeld />
                <AssetHeld />
                <AssetHeld />
                <AssetHeld />
                <AssetHeld />
                <AssetHeld />
                <AssetHeld />
                <AssetHeld />
                <AssetHeld />
            </div>
        </div>
    )
}