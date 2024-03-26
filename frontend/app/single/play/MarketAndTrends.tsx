'use client'
// 현재 턴에 대한 시장/트렌드 정보 (right side bar - 3)
import { useState } from 'react';

import MarketInfo from "./MarketInfo"
import Trends from "./Trends"

export default function MarketAndTrends() {
    const [isMarketOn, setIsMarketOn] = useState(true); // 시장정보 버튼 상태
    const [isTrendOn, setIsTrendOn] = useState(false); // 트렌드 버튼 상태

    return (
        <div className="row-start-5 row-end-7 grid grid-rows-6">
            <div className="row-start-1 row-end-2 grid grid-cols-9 justify-between center">
                <button className={`col-start-2 col-end-5 ${isMarketOn ? 'bg-small-9 text-textColor-2' : 'bg-textColor-2 text-small-9 border border-small-9'} rounded-t-lg`} onClick={() => { setIsMarketOn(true); setIsTrendOn(false); }}>시장정보</button>
                <button className={`col-start-6 col-end-9 ${isTrendOn ? 'bg-small-9 text-textColor-2' : 'bg-textColor-2 text-small-9 border border-small-9'} rounded-t-lg`} onClick={() => { setIsMarketOn(false); setIsTrendOn(true); }}>트렌드</button>
            </div>
            {
            isMarketOn ? (
                <MarketInfo />
            ) : (
                <Trends />
            )
            }
        </div>
    );
  }