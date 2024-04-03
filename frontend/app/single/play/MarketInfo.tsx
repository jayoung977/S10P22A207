import SingleGameStore from '@/public/src/stores/single/SingleGameStore';

// 시장 정보 컴포넌트
export default function MarketInfo () {
    const { turn, rawMaterialListData } = SingleGameStore();

    return (
        <div className="row-start-2 row-end-7">
            <div className="grid grid-cols-6 bg-small-9 rounded-xl m-1 items-center justify-center">
                <div className="col-span-2 text-center text-textColor-2 ml-4">WTI</div>
                <div className="col-span-4 text-end text-textColor-2 mr-2">{rawMaterialListData[turn+299]?.wti != null ? `${rawMaterialListData[turn+299].wti}$` : "값 X"}</div>
            </div>
            <div className="grid grid-cols-6 bg-small-9 rounded-xl m-1">
                <div className="col-span-2 text-center text-textColor-2 ml-4">구리</div>
                <div className="col-span-4 text-end text-textColor-2 mr-2">{rawMaterialListData[turn+299]?.copper != null ? `${rawMaterialListData[turn+299].copper}$` : "값 X"}</div>
            </div>
            <div className="grid grid-cols-6 bg-small-9 rounded-xl m-1">
                <div className="col-span-2  text-center  text-textColor-2 ml-4">금</div>
                <div className="col-span-4 text-end text-textColor-2 mr-2">{rawMaterialListData[turn+299]?.gold != null ? `${rawMaterialListData[turn+299].gold}$` : "값 X"}</div>
            </div>
            <div className="grid grid-cols-6 bg-small-9 rounded-xl m-1">
                <div className="col-span-2  text-center  text-textColor-2 ml-4">밀</div>
                <div className="col-span-4 text-end text-textColor-2 mr-2">{rawMaterialListData[turn+299]?.wheat != null ? `${rawMaterialListData[turn+299].wheat}$` : "값 X"}</div>
            </div>
            <div className="grid grid-cols-6 bg-small-9 rounded-xl m-1">
                <div className="col-span-2  text-center  text-textColor-2 ml-4">은</div>
                <div className="col-span-4 text-end text-textColor-2 mr-2">{rawMaterialListData[turn+299].silver ? `${rawMaterialListData[turn+299].silver}$` : "값 X"}</div>
            </div>
            <div className="grid grid-cols-6 bg-small-9 rounded-xl m-1">
                <div className="col-span-2  text-center  text-textColor-2 ml-4">가스</div>
                <div className="col-span-4 text-end text-textColor-2 mr-2">{rawMaterialListData[turn+299].gas ? `${rawMaterialListData[turn+299].gas}$` : "값 X"}</div>
            </div>
        </div>
    )
}
