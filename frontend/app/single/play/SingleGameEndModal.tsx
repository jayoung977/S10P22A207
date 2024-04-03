'use client'
import { useRouter } from 'next/navigation'
import SingleGameStore from '@/public/src/stores/single/SingleGameStore';
export default function SingleGameEndModal ({ isOpen, onClose } :any) {
    const { singleGameEndInfoData, setSelectedStockIndex } = SingleGameStore();
    const router = useRouter();
    
    const singleGameAgainHandler = () => {
        onClose();
        if (typeof window != undefined) {
            // window.location.replace("https://j10a207.p.ssafy.io/api/single/play");
            window.location.href = window.location.href;
        }
    }
    const bgColor = singleGameEndInfoData?.profitMargin > 0 ? "red-700" : (singleGameEndInfoData?.profitMargin < 0 ? "blue-700" : "black") 
    const borderColor = singleGameEndInfoData?.profitMargin > 0 ? "red-300" : (singleGameEndInfoData?.profitMargin < 0 ? "blue-300" : "black") 
    if (!isOpen) return null;
    
    
    return (
        <div className={`fixed inset-0 flex items-center justify-center z-50`}>
            <div className={`text-center bg-white rounded grid grid-rows-12  border-2 border-${bgColor} shadow-lg shadow-${borderColor}`} style={{ width: '700px', height: '500px' }}>
                <div className="row-span-1 flex items-center justify-center">싱글 게임 종료</div>
                <div className="row-span-1 flex items-center justify-center">{singleGameEndInfoData?.startDate.split('T')[0]} ~ {singleGameEndInfoData?.endDate.split('T')[0]} (남은 기회 : {singleGameEndInfoData.singleGameChance})</div>
                
                <div className="row-span-8 grid grid-cols-12">
                    <div className="col-span-5">
                        <div className="text-center">선택 종목 명</div>
                        <hr></hr>
                        <div className="">
                            {
                                singleGameEndInfoData?.stockInfoDtoList.map((item :any, index :number) => (
                                    <div className="grid grid-cols-10 text-center">
                                        <div className="col-span-1">{index+1}.</div>
                                        <div className="col-span-8">{item.stockName}</div>
                                    </div>
                                ))
                            }
                        </div>
                    </div>

                    <div className="col-span-7">
                        <div className="text-center">게임 결과</div>
                        <hr></hr>
                        <div className="">
                            <div className="flex items-center justify-between m-3">
                                <div className="flex items-center justify-start">시작 금액</div>
                                <div className="flex items-center justify-end">{singleGameEndInfoData?.initialAsset.toLocaleString()}</div>
                            </div>
                            <hr></hr>
                            <div className="flex items-center justify-between m-3">
                                <div className="flex items-center justify-start">종료 금액</div>
                                <div className="flex items-center justify-end">{singleGameEndInfoData?.finalAsset.toLocaleString()}</div>
                            </div>
                            <hr></hr>
                            <div className="flex items-center justify-between m-3">
                                <div className="flex items-center justify-start">순이익</div>
                                {
                                    singleGameEndInfoData?.netProfit < 0 ? (
                                        <div className="flex items-center justify-end text-blue-700">{singleGameEndInfoData?.netProfit.toLocaleString()}</div>
                                    ) : (singleGameEndInfoData?.netProfit > 0 ? (
                                        <div className="flex items-center justify-end text-red-700">+{singleGameEndInfoData?.netProfit.toLocaleString()}</div>
                                    ) : (
                                        <div className="flex items-center justify-end">+{singleGameEndInfoData?.netProfit}</div>
                                    ))
                                }
                            </div>
                            <hr></hr>

                            <div className="flex items-center justify-between m-3">
                                <div className="flex items-center justify-start">수익률</div>
                                {
                                    singleGameEndInfoData?.netProfit < 0 ? (
                                        <div className="flex items-center justify-end text-blue-700">{parseFloat(singleGameEndInfoData?.profitMargin).toFixed(4)}%</div>
                                    ) : (singleGameEndInfoData?.netProfit > 0 ? (
                                        <div className="flex items-center justify-end text-red-700">+{parseFloat(singleGameEndInfoData?.profitMargin).toFixed(4)}%</div>
                                    ) : (
                                        <div className="flex items-center justify-end">{parseFloat(singleGameEndInfoData?.profitMargin).toFixed(4)}%</div>
                                    ))
                                }
                            </div>
                            <hr></hr>
                        </div>
                    </div>
                </div>
                {
                    singleGameEndInfoData.singleGameChance > 0 ? (
                        <div className="row-span-2 grid grid-cols-6">
                            <button onClick={() => {
                                setSelectedStockIndex(0);
                                onClose();
                                router.push('/multi')
                                }} className="col-span-3 rounded-full ml-40 mr-16  my-10 text-white bg-gray-500"
                            >
                                나가기
                            </button>
                            <button 
                                onClick={() => {
                                    setSelectedStockIndex(0);
                                    singleGameAgainHandler();
                                }} 
                                disabled={singleGameEndInfoData?.singleGameChance == 0}
                                className={`col-span-3 rounded-full mr-40 ml-16  my-10 text-white bg-${bgColor}`}
                            >
                                한번 더!
                            </button>
                        </div>
                    ) : (
                        <div className="row-span-2 grid grid-cols-6">
                            <button onClick={() => {
                                setSelectedStockIndex(0);
                                onClose();
                                router.push('/multi')
                                }} className="col-start-2 col-end-5 rounded-full ml-40 mr-16  my-10 text-white bg-gray-500"
                            >
                                나가기
                            </button>
                        </div>
                    )
                }
                
            </div>
        </div>
    )
}