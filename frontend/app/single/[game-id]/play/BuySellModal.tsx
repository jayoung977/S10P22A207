// 매수, 매도 클릭 시 활성화되는 모달창
export default function BuySellModal({ isBuy, isOpen, onClose } :any) {
    if (!isOpen) return null;
    
    return (
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="text-center bg-white rounded shadow-lg grid grid-rows-12" style={{ width: '500px', height: '300px' }}>

            <div className="row-start-1 row-end-3">
                {
                   isBuy ? (
                       <span className="text-red-500">매수</span> 
                       ) : (
                       <span className="text-blue-500">매도</span> 
                   ) 
                }
                주문
            </div>
            <hr></hr>
            <div className="row-start-3 row-end-7 m-3">
                <div className="flex justify-between m-1">
                    <div>
                        {
                            isBuy ? (
                                <span className="text-red-500">매수</span> 
                            ) : (
                                <span className="text-blue-500">매도</span>
                            )
                        }  
                        종목
                    </div>
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
            <div className="row-start-7 row-end-10 flex justify-center items-center gap-4 m-3">
                <div>
                <label htmlFor="number-input" className="mb-2 font-medium text-gray-900 dark:text-white">매수 수량:</label>
                </div>
                <div>
                <input type="number" id="number-input" aria-describedby="helper-text-explanation" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="수량 입력" required />
                </div>
            </div>
            <div className="row-start-10 row-end-13 grid grid-rows-3">
                <div className="row-start-1 row-end-3 grid grid-cols-4">
                    <button onClick={() => {onClose()}} className="col-start-1 col-end-2 rounded-full text-white bg-gray-500">취소</button>
                    {
                        isBuy ? (
                            <button onClick={() => {onClose()}} className="col-start-4 col-end-5 rounded-full text-white bg-red-500">매수</button>
                        ) : (
                            <button onClick={() => {onClose()}} className="col-start-4 col-end-5 rounded-full text-white bg-blue-500">매도</button>

                        )
                    }
                </div>
            </div>
            

        </div>
      </div>
    );
  }