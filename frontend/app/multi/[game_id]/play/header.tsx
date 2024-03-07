

export default function Header(){
  return( 
    <header className="row-span-1 grid grid-cols-12 border items-center">
    <div className="col-span-3 grid grid-cols-3">
      <div className="col-span-1 flex items-center">로고</div>
      <div className="col-span-2 flex items-center">지금이니?!</div>
    </div>
    <div className="col-span-6 flex justify-center">
      <div>맞짱 까든가</div>
    </div>
    <div className="col-span-3 flex justify-around">
      <button>시작하기</button>
      <button>나가기</button>
    </div>
  </header>
  )
}