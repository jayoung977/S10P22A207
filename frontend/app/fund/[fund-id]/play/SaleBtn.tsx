'use client'
// 턴 정보, 매수 + 매도 버튼 컴포넌트
import { useState } from 'react';
import SaleModal from './SaleModal';

export default function SaleBtn () {
    // 매수 / 매도 모달창 open 여부
    const [isOpenSaleModal, setIsOpenSaleModal] = useState<boolean>(false);
    // 매수 or 매도(true시 매수)
    const [isBuy, setIsBuy] = useState<boolean>(true);

    return (
        <div className="row-span-1 grid grid-cols-2">
            <button 
                onClick={() => {
                    setIsBuy(true);
                    setIsOpenSaleModal(true);
                }} 
                className="col-span-1 rounded-lg text-textColor-2 bg-small-3 m-4"
            >
                매수    
            </button>
            <button 
                onClick={() => {
                    setIsBuy(false);
                    setIsOpenSaleModal(true);
                }} 
                className="col-span-1 rounded-lg text-textColor-2 bg-small-1 m-4"
            >
                매도   
            </button>
            <SaleModal isBuy={isBuy} isOpen={isOpenSaleModal} onClose={() =>setIsOpenSaleModal(false) }/>
        </div>
    )
}