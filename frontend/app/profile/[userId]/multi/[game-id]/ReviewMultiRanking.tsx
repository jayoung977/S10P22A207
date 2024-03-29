import Image from "next/image";
import MultiReviewStore from "@/public/src/stores/profile/MultiReviewStore";
import bronze from '@/public/src/assets/images/Tier/bronze.png';



export default function MultiRanking() {
  const { multiLogMemberDtoList, selectedTradeList, setSelectedTradeList } = MultiReviewStore();
 
  function handleCheckMember(memberId :number) {
    
    const index = selectedTradeList.findIndex((item :any) => item.memberId == memberId);
    if (index == -1) {
      const foundMemberInfo = multiLogMemberDtoList.find((item: any) => item.memberId === memberId);
      console.log(foundMemberInfo);
      if (foundMemberInfo && foundMemberInfo.multiLogTradeDtoList.length > 0) {
        const newTradeData = foundMemberInfo.multiLogTradeDtoList.map((item: any) => [
          {
            memberId: foundMemberInfo.memberId,
            nickname: foundMemberInfo.nickname,
            date: item.date,
            price: item.price,
            amount: item.amount,
          }
        ]
      );
      const newSelectedTradeList = [...selectedTradeList];
      console.log(newSelectedTradeList);
      newTradeData.map((item :any) => {
        newSelectedTradeList.push(item);
      })
      console.log(newSelectedTradeList);
      setSelectedTradeList(newSelectedTradeList);
      
    } else {
        const newTradeData = selectedTradeList.filter((item :any) => item.memberId != memberId)
        setSelectedTradeList(newTradeData);
      }
    }
  }
  return (
 
    <div className="grid grid-rows-12 bg-slate-500 rounded-md m-1">
      <div className="row-span-1 flex items-center justify-center">
        <div className="text-textColor-2">랭킹 유저들</div>
      </div>
      <table className="row-span-11 grid grid-rows-11 table-fixed rounded-md">
        <thead className="row-span-1 grid grid-cols-2 items-center m-1">
          <tr className="col-span-2 grid grid-cols-4 items-center">
            <th className="col-span-1 text-center">순위</th>
            <th className="col-span-1 text-center">티어</th>
            <th className="col-span-1 text-center">이름</th>
            <th className="col-span-1 text-center">수익률</th>
          </tr>
        </thead>
        <tbody className="row-span-10 grid grid-rows-10 items-center">
          {
            multiLogMemberDtoList && multiLogMemberDtoList.length > 0 ? (
              multiLogMemberDtoList.map((item :any, index :number) => (
                <tr 
                  key={item.memberId} 
                  className="row-span-2 grid grid-cols-4 items-center text-center bg-white rounded-lg m-1"
                  onClick={() => {handleCheckMember(item.memberId)}}
                  style={{ cursor : "pointer" }}
                >
                  <td className="col-span-1">{index+1}</td>
                  <td className="col-span-1">
                    <Image
                      className="rounded-full w-40 h-50"
                      src={bronze}
                      alt="Extra large avatar"
                      width={50}
                      height={50}
                    />
                  </td>
                  <td className="col-span-1">{item.nickname}</td>
                  <td className="col-span-1">{parseFloat(item.roi.toFixed(2))}</td>                      
                </tr>
              ))

            ) : (
              <div>ㅋㅋ</div>
            )
          }
        </tbody>
      </table>
    </div>

   
  );
}
