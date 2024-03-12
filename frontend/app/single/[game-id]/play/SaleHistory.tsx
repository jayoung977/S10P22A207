// 매매 내역 컴포넌트
export default function SaleHistory ({ data } :any) {

    return (
<<<<<<< Updated upstream
        <div className="row-span-1 bg-blue-100 grid grid-cols-5 text-center m-1">
            <div className="col-span-1">매도</div>
            <div className="col-span-2">5,654(1000)</div>
            <div className="col-span-2">5,654,1000</div>
        </div>
=======
        <tr className="row-span-1 bg-blue-100 grid grid-cols-5 text-center m-1">
            <td className="col-span-1">{data.유형}</td>
            <td className="col-span-2">{data.가격}({data.수량})</td>
            <td className="col-span-2">{data.체결금액}</td>
        </tr>
>>>>>>> Stashed changes
    )
}