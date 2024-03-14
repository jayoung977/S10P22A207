'use client'
// 현재 턴에 대한 시장/트렌드 정보 (right side bar - 3)
import { useState } from 'react';

import MarketInfo from "./MarketInfo"
import Trends from "./Trends"

export default function MarketAndTrends() {
    const [isMarketOn, setIsMarketOn] = useState(true); // 시장정보 버튼 상태
    const [isTrendOn, setIsTrendOn] = useState(false); // 트렌드 버튼 상태
  
    const marketBgColor = isMarketOn ? 'small-9' : 'small-14'; // 시장정보 버튼 배경색
    const marketTextColor = isMarketOn ? 'textColor-2' : 'textColor-1'; // 시장정보 버튼 텍스트 색상
    const trendBgColor = isTrendOn ? 'small-9' : 'small-14'; // 트렌드 버튼 배경색
    const trendTextColor = isTrendOn ? 'textColor-2' : 'textColor-1'; // 트렌드 버튼 텍스트 색상
    
    return (
        <div className="row-start-5 row-end-7 grid grid-rows-6">
            <div className="row-start-1 row-end-2 grid grid-cols-9 justify-between center">
                <button className={`col-start-2 col-end-5 bg-${marketBgColor} text-${marketTextColor} rounded-t-lg`} onClick={() => { setIsMarketOn(true); setIsTrendOn(false); }}>시장정보</button>
                <button className={`col-start-6 col-end-9 bg-${trendBgColor} text-${trendTextColor} rounded-t-lg`} onClick={() => { setIsMarketOn(false); setIsTrendOn(true); }}>트렌드</button>
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