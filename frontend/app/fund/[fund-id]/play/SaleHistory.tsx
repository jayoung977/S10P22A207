// 매매 내역 컴포넌트
import FundGameStore from "@/public/src/stores/fund/game/FundGameStore";

export default function SaleHistory ({ data } :any) {
    const { stockListData } = FundGameStore(); 
    const idx = stockListData.findIndex((x :any) => x?.stockId == data?.stockId);
    return (
        <tr className="row-span-1 bg-small-5 grid grid-cols-6 text-center rounded-lg m-1">
            <td className="col-span-1 text-textColor-1 mr-3">{idx+1}</td>
            <td className="col-span-1 text-textColor-2">{data?.tradeType}</td>
            <td className="col-span-2 text-textColor-2">{data?.price.toLocaleString()}원({data?.amount})</td>
        </tr>
    )
}


