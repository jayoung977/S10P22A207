'use client'
import { useRouter } from 'next/navigation'
import SingleGameStore from '@/public/src/stores/single/SingleGameStore';
export default function SingleGameEndModal ({ isOpen, onClose } :any) {
    const { singleGameEndInfoData } = SingleGameStore();
    const router = useRouter();
    
    const singleGameAgainHandler = () => {
        onClose();
        if (typeof window != undefined) {
            window.location.replace("http://localhost:3000/single/play");
        }
    }
    if (!isOpen) return null;
    
    
    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="text-center bg-white rounded shadow-lg grid grid-rows-12" style={{ width: '500px', height: '300px' }}>
                <div className="row-span-2">게임 종료</div>
                <div className="row-span-6 m-3">
                    <div className="flex justify-between mt-2 mb-1">
                        <div>시작 금액</div>
                        <div>{singleGameEndInfoData?.initialAsset}</div>
                    </div>
                    <div className="flex justify-between mt-1 mb-2">
                        <div>종료 금액</div>
                        <div>{singleGameEndInfoData?.finalAsset}</div>
                    </div>
                    <hr></hr>
                    <div className="flex justify-between mt-2 mb-1">
                        <div>순이익</div>
                        <div>{singleGameEndInfoData?.netProfit}원</div>
                    </div>
                    <div className="flex justify-between mt-1 mb-2">
                        <div>수익률</div>
                        <div>{parseFloat(singleGameEndInfoData?.profitMargin).toFixed(4)}%</div>
                    </div>
                </div>
                <div className="row-span-4 grid grid-rows-4">
                    <div className="row-span-1 text-center mb-2">현재 남은 기회 : {singleGameEndInfoData?.singleGameChance}</div>
                    <div className="row-span-3 grid grid-cols-6">
                        <button onClick={() => {
                            onClose();
                            router.push('/multi')
                            
                            }} className="col-span-3 rounded-full mx-16 my-8 text-white bg-gray-500"
                        >
                            나가기
                        </button>
                        <button 
                            onClick={() => {
                                singleGameAgainHandler();
                            }} 
                            disabled={singleGameEndInfoData?.singleGameChance == 0}
                            className="col-span-3 rounded-full mx-16 my-8 text-white bg-gray-500"
                        >
                            한번 더!
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}