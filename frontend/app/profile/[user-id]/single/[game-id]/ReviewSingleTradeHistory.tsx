export default function SingleTradeHistory() {
  return (
    <div className="col-span-3 grid grid-rows-12 p-4">
      <div className="row-span-1">매매내역</div>
      <div className="bg-green-900 row-span-11 relative overflow-auto max-h-96 shadow-md sm:rounded-lg ">
        <table className="w-full text-sm text-left rtl:text-right text-blue-100 dark:text-blue-100">
          <thead className="text-xs text-white uppercase border-b border-blue-400 dark:text-white">
            <tr>
              <th scope="col" className="px-6 py-3">
                유형
              </th>
              <th scope="col" className="px-6 py-3">
                <p>가격(수량)</p>
                <p>수수료 및 세금</p>
              </th>
              <th scope="col" className="px-6 py-3">
                체결금액
              </th>
            </tr>
          </thead>
          <tbody className="">
            <tr className="bg-blue-600 border-b border-blue-400 hover:bg-blue-500">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-blue-50 whitespace-nowrap dark:text-blue-100"
              >
                매수
              </th>
              <td className="px-6 py-4">Silver</td>
              <td className="px-6 py-4">Laptop</td>
            </tr>
            <tr className="bg-red-600 border-b border-red-400 hover:bg-red-500">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-red-50 whitespace-nowrap dark:text-red-100"
              >
                매도
              </th>
              <td className="px-6 py-4">Silver</td>
              <td className="px-6 py-4">Laptop</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
