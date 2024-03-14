export default function UserRecordInfoBoard() {
  return (
    <div className="shadow row-span-5 relative overflow-auto max-h-96 p-4">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs bg-small-component-3 text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              날짜
            </th>
            <th scope="col" className="px-6 py-3">
              내용
            </th>
          </tr>
        </thead>
        <tbody>
          <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
            <th
              scope="row"
              className="cursor-pointer px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >
              2024.03.14
            </th>
            <td className="px-6 py-4">내용</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
