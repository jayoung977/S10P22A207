// 매수, 매도 클릭 시 활성화되는 모달창
export default function BuySellModal({ isOpen, onClose } :any) {
    if (!isOpen) return null;
    
    return (
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="text-center bg-white rounded shadow-lg grid grid-rows-12" style={{ width: '500px', height: '300px' }}>

            <div className="row-start-1 row-end-3"><span className="text-red-500">매수</span> 주문</div>
            <hr></hr>
            <div className="row-start-3 row-end-10 m-3">
                <div className="flex justify-between m-1">
                    <div><span className="text-red-500">매수</span> 종목</div>
                    <div>C 화학</div>
                </div>
                <div className="flex justify-between m-1">
                    <div>주문 단가</div>
                    <div>80,700</div>
                </div>
                <div className="flex justify-between m-1">
                    <div>주문 수량</div>
                    <div>주문 가능 123주</div>
                </div>
            </div>
            <div className="row-start-10 row-end-13 grid grid-rows-3">
                <div className="row-start-1 row-end-3 grid grid-cols-4">
                    <button onClick={() => {onClose()}} className="col-start-1 col-end-2 rounded-full text-white bg-gray-500">취소</button>
                    <button onClick={() => {onClose()}} className="col-start-4 col-end-5 rounded-full text-white bg-red-500">매수</button>
                </div>
            </div>
        </div>
      </div>
    );
  }