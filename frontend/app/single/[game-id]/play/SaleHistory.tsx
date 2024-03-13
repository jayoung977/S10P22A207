// 매매 내역 컴포넌트
export default function SaleHistory ({ data } :any) {

    return (
        <tr className="row-span-1 bg-blue-100 grid grid-cols-6 text-center m-1">
            <td className="col-span-1">{data.stock}</td>
            <td className="col-span-1">{data.saleType}</td>
            <td className="col-span-2">{data.price}({data.quantity})</td>
        </tr>
    )
}
