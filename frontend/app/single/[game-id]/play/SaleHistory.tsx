// 매매 내역 컴포넌트
export default function SaleHistory({ data }: any) {
  return (
    <tr className="row-span-1 bg-blue-100 grid grid-cols-5 text-center m-1">
      <td className="col-span-1">{data.유형}</td>
      <td className="col-span-2">
        {data.가격}({data.수량})
      </td>
      <td className="col-span-2">{data.체결금액}</td>
    </tr>
  );
}
