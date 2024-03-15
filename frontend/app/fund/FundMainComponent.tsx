

export default function FundMainComponent(){
  return(
    <div className="row-span-3 grid grid-cols-12 border">
      <div className="col-span-8 border">
        큰 차트 이미지
      </div>
      <div className="col-span-4 border text-center p-2">
        <div>"안정적인 미래를 위해 펀드를 개설하세요"</div>
        <button className="bg-button-1 text-textColor-2 m-2 p-2 rounded-md font-bold text-lg">펀드 개설</button>
      </div>
    </div>
  )
}