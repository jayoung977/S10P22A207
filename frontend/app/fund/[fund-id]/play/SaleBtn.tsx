'use client'
// 매수/매도 버튼 목록
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
                className="col-span-1 rounded-md 
                        text-small-3 bg-textColor-2 border border-small-3 m-5 scale-95 ease-in-out duration-500 shadow-md shadow-small-3
                        hover:text-textColor-2 hover:bg-small-3 hover:scale-105"
                >
                매수    
            </button>
            <button 
                onClick={() => {
                    setIsBuy(false);
                    setIsOpenSaleModal(true);
                }} 
                className="col-span-1 rounded-md text-small-1 bg-textColor-2 border border-small-1 m-5 scale-95 ease-in-out duration-500 shadow-md shadow-small-1
                        hover:text-textColor-2 hover:bg-small-1 hover:scale-105"
                >
                매도   
            </button>
            <SaleModal isBuy={isBuy} isOpen={isOpenSaleModal} onClose={() =>setIsOpenSaleModal(false) }/>
        </div>
    )
}