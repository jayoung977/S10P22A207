

export default function Header(){
  return( 
  <header className="row-span-1 grid grid-cols-12 border items-center">
    <div className="col-span-2 grid grid-cols-3 justify-items-center">
      <div className="col-span-1 flex items-center">로고</div>
      <div className="col-span-2 flex items-center">지금이니?!</div>
    </div>
    <div className="col-span-8 flex justify-center">
      <div>맞짱 까든가</div>
    </div>
    <div className="col-span-2 grid grid-rows-2 border" >
      <div className="row-span-1">라운드 및 턴수 체크</div>
      <div>총 턴수</div>
    </div>
  </header>
  )
}