export default function GameRule(){
  return (
    <div className="border row-span-2">
      <div className='border text-white bg-small-9'>룰 설명</div>
      <div className='flex-col text-md text-start m-2'>
        <div>1. 라운드당 50턴으로 진행된다.</div>
        <div>2. 100초의 시간이 주어진다.</div>
        <div>3. 각자 10,000,000원의 시드머니를 지급받는다.</div>
        <div>4. 1턴 당 자기가 원하는 만큼 매수/매도/공매도를 할 수 있다.</div>
        <div>5. 모든 라운드가 끝난 후, 자산을 가장 많이 번 플레이어가 우승한다.</div>
      </div>
    </div>
  )
}