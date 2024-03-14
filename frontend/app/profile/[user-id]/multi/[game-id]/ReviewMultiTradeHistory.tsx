export default function MultiTradeHistroy() {
  return (
    <div className="row-span-6 relative sm:rounded-lg bg-small-10 p-4 max-h-60 overflow-y-auto shadow-lg hover:-translate-y-1 transition ease-in-out duration-500" style={{maxHeight: '35vh'}} >
      <div className="rounded-md" >
        <div>
          <p className="text-white">매매내역</p>
        </div>
        <table className="bg-white w-full text-sm text-left rtl:text-right text-blue-100 dark:text-blue-100">
          <thead className="text-xs text-black uppercase  border-b border-blue-400 dark:text-white">
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
          <tbody>
            <tr className="bg-blue-500 border-b border-blue-300 hover:bg-blue-400">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-blue-50 whitespace-nowrap dark:text-blue-100"
              >
                매수
              </th>
              <td className="px-6 py-4">Silver</td>
              <td className="px-6 py-4">Laptop</td>
            </tr>
            
            <tr className="bg-red-500 border-b border-red-300 hover:bg-red-400">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-red-50 whitespace-nowrap dark:text-red-100"
              >
                매도
              </th>
              <td className="px-6 py-4">Silver</td>
              <td className="px-6 py-4">Laptop</td>
            </tr>
            <tr className="bg-red-500 border-b border-red-300 hover:bg-red-400">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-red-50 whitespace-nowrap dark:text-red-100"
              >
                매도
              </th>
              <td className="px-6 py-4">Silver</td>
              <td className="px-6 py-4">Laptop</td>
            </tr>
            <tr className="bg-red-500 border-b border-red-300 hover:bg-red-400">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-red-50 whitespace-nowrap dark:text-red-100"
              >
                매도
              </th>
              <td className="px-6 py-4">Silver</td>
              <td className="px-6 py-4">Laptop</td>
            </tr>
            <tr className="bg-red-500 border-b border-red-300 hover:bg-red-400">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-red-50 whitespace-nowrap dark:text-red-100"
              >
                매도
              </th>
              <td className="px-6 py-4">Silver</td>
              <td className="px-6 py-4">Laptop</td>
            </tr>
            <tr className="bg-red-500 border-b border-red-300 hover:bg-red-400">
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
