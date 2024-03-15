export default function AssetHeld({ data } :any) {

    return (
        <div className="row-span-3 bg-small-6 border-black m-3 grid grid-rows-3 rounded-lg shadow-lg ease-in-out duration-500
                        hover:scale-105">
            <div className="row-span-1 text-textColor-1 ml-1">{data.name}</div>
            <div className="row-span-2 grid grid-rows-2">
                <div className="row-span-1 grid grid-cols-4 justify-center">
                    <div className="col-span-1 m-auto text-textColor-2">평가 손익</div>
                    <div className="col-span-1 m-auto ">{data.valuationPL}</div>
                    <div className="col-span-1 m-auto text-textColor-2">매도 가능</div>
                    <div className="col-span-1 m-auto text-textColor-1">{data.availableForSale}</div>
                </div>
                <div className="row-span-1 grid grid-cols-4">
                    <div className="col-span-1 m-auto text-textColor-2">손익률</div>
                    <div className="col-span-1 m-auto text-textColor-1">{data.profitMargin} %</div>
                    <div className="col-span-1 m-auto text-textColor-2">평균 단가</div>
                    <div className="col-span-1 m-auto text-textColor-1">{data.averagePrice}</div>
                </div>
            </div>
        </div>
    )
}

