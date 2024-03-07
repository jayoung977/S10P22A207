// 국내 / 해외 증시 컴포넌트

export default function StockMarket() {
    return (
        <div className="row-start-12 row-end-13 grid grid-cols-2 text-center">
            <div className="col-span-1 grid grid-cols-5 items-center border border-black">
                <div className="col-span-1">국내 증시</div>
                <div className="col-span-2">코스피 : ????</div>
                <div className="col-span-2">코스닥 : ????</div>
            </div>
            <div className="col-span-1 grid grid-cols-5 items-center border border-black">
                <div className="col-span-1">해외 증시</div>
                <div className="col-span-2">나스닥 : ????</div>
                <div className="col-span-2">상해 : ????</div>
            </div>
        </div>
    )
}