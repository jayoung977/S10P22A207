// 매매 내역 컴포넌트
export default function SaleHistory ({ data } :any) {

    return (
        <tr className="row-span-1 bg-small-5 grid grid-cols-6 text-center rounded-lg m-1">
            <td className="col-span-1 text-textColor-1">{data.stock}</td>
            <td className="col-span-1 text-textColor-2">{data.saleType}</td>
            <td className="col-span-2 text-textColor-2">{data.price}({data.quantity})</td>
        </tr>
    )
}
