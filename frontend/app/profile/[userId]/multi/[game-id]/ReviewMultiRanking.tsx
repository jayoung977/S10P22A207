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
      <div className="row-span-5 grid grid-rows-5 ">
        <div className="row-span-1 grid grid-cols-5 text-textColor-2">
          <div className="col-span-1">1위</div>
          <div className="col-span-1">프사</div>
          <div className="col-span-1">이제헌</div>
          <div className="col-span-1">+2424%</div>
          <div className="col-span-1">필터</div>
        </div>
        <div className="row-span-1 grid grid-cols-5 text-textColor-2">
          <div className="col-span-1">1위</div>
          <div className="col-span-1">프사</div>
          <div className="col-span-1">이제헌</div>
          <div className="col-span-1">+2424%</div>
          <div className="col-span-1">필터</div>
        </div>
        <div className="row-span-1 grid grid-cols-5 text-textColor-2">
          <div className="col-span-1">1위</div>
          <div className="col-span-1">프사</div>
          <div className="col-span-1">이제헌</div>
          <div className="col-span-1">+2424%</div>
          <div className="col-span-1">필터</div>
        </div>
        <div className="row-span-1 grid grid-cols-5 text-textColor-2">
          <div className="col-span-1">1위</div>
          <div className="col-span-1">프사</div>
          <div className="col-span-1">이제헌</div>
          <div className="col-span-1">+2424%</div>
          <div className="col-span-1">필터</div>
        </div>
        <div className="row-span-1 grid grid-cols-5 text-textColor-2">
          <div className="col-span-1">1위</div>
          <div className="col-span-1">프사</div>
          <div className="col-span-1">이제헌</div>
          <div className="col-span-1">+2424%</div>
          <div className="col-span-1">필터</div>
        </div>
      </div>
    </div>

   
  );
}
