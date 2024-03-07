// 선택된 10개의 주식 종목 버튼 목록 컴포넌트
import Stock from "./Stock"

export default function StockList () {

    return (
        <div className="row-start-2 row-end-5 grid grid-rows-6 border border-black">
            <div className="row-start-1 row-end-2 flex items-center justify-center border border-black">종목</div>
            <div className="row-start-2 row-end-7">
                <Stock />
                <Stock />
                <Stock />
                <Stock />
            </div>
        </div>
    )
}