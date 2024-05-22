'use client'
import { useRouter, useParams } from 'next/navigation'
import FundGameStore from '@/public/src/stores/fund/game/FundGameStore';
import axios from 'axios';
export default function FundGameEndModal ({ isOpen, onClose } :any) {
    const { fundGameEndInfoData, setSelectedStockIndex } = FundGameStore();
    const params = useParams();
    const router = useRouter();
    
    const handleCloseFund = async () => {
        try {
            const response = axios({
                method: "put",
                url : 'https://zayoung21.store/api/fund/close', 
                data: {
                    fundId: params['fund-id'],
                },
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`
                }
            })
            console.log(response);
            onClose();
            router.push('/multi');
        } catch (error) {
            console.log(error);
        }
    }
    if (!isOpen) return null;
    
    
    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="text-center bg-white rounded shadow-lg grid grid-rows-12" style={{ width: '500px', height: '300px' }}>
                <div className="row-span-2">펀드 게임 종료</div>
                <div className="row-span-6 m-3">
                    <div className="flex justify-between mt-2 mb-1">
                        <div>시작 금액</div>
                        <div>{fundGameEndInfoData?.initialAsset}</div>
                    </div>
                    <div className="flex justify-between mt-1 mb-2">
                        <div>종료 금액</div>
                        <div>{fundGameEndInfoData?.finalAsset}</div>
                    </div>
                    <hr></hr>
                    <div className="flex justify-between mt-2 mb-1">
                        <div>순이익</div>
                        <div>{fundGameEndInfoData?.netProfit}원</div>
                    </div>
                    <div className="flex justify-between mt-1 mb-2">
                        <div>수익률</div>
                        <div>{parseFloat(fundGameEndInfoData?.profitMargin).toFixed(4)}%</div>
                    </div>
                </div>
                <div className="row-span-4 grid grid-rows-4">
                    <div className="row-span-1 text-center mb-2">현재 남은 기회 : {fundGameEndInfoData?.fundGameChance}</div>
                    <div className="row-span-3 grid grid-cols-6">
                        <button onClick={() => {
                            setSelectedStockIndex(0);
                            handleCloseFund();
                            }} className="col-start-3 col-end-6 rounded-full mx-16 my-8 text-white bg-gray-500"
                        >
                            펀드 종료
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}